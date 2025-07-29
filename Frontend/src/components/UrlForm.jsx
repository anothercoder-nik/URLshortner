import React, { useState } from 'react'
import { createShortUrl } from '../api/shortUrl.api'
import { useSelector } from 'react-redux'
import { queryClient } from '../main'
import { QRCodeCanvas } from 'qrcode.react'

const UrlForm = () => {
  const [url, setUrl] = useState("https://www.google.com")
  const [shortUrl, setShortUrl] = useState("")
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState(null)
  const [customSlug, setCustomSlug] = useState("")
  const [showQR, setShowQR] = useState(false)

  const { isAuthenticated } = useSelector((state) => state.auth)

  const handleSubmit = async () => {
    try{
      const shortUrl = await createShortUrl(url,customSlug)
      setShortUrl(shortUrl)
      queryClient.invalidateQueries({ queryKey: ['userUrls'] })
      setError(null)
      setShowQR(false)  // reset QR on new URL generation
    } catch (err) {
      setError(err.message)
    }

  }

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const downloadQR = () => {
    const canvas = document.getElementById("qr-gen")
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream")
    const link = document.createElement("a")
    link.href = pngUrl
    link.download = "qr-code.png"
    link.click()
  }

  return (
    <div className="space-y-4">
      {/* URL input */}
      <div>
        <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">Enter your URL</label>
        <input
          type="url"
          id="url"
          value={url}
          onInput={(event) => setUrl(event.target.value)}
          placeholder="https://example.com"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Submit button */}
      <button
        onClick={handleSubmit}
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
      >
        Shorten URL
      </button>

      {/* Error */}
      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      {/* Custom slug */}
      {isAuthenticated && (
        <div className="mt-4">
          <label htmlFor="customSlug" className="block text-sm font-medium text-gray-700 mb-1">
            Custom URL (optional)
          </label>
          <input
            type="text"
            id="customSlug"
            value={customSlug}
            onChange={(event) => setCustomSlug(event.target.value)}
            placeholder="Enter custom slug"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}

      {/* Short URL + Copy + QR */}
      {shortUrl && (
        <div className="mt-6 space-y-4">
          <h2 className="text-lg font-semibold mb-2">Your shortened URL:</h2>
          <div className="flex items-center">
            <input
              type="text"
              readOnly
              value={shortUrl}
              className="flex-1 p-2 border border-gray-300 rounded-l-md bg-gray-50"
            />
            <button
              onClick={handleCopy}
              className={`px-4 py-2 rounded-r-md transition-colors duration-200 ${copied ? 'bg-green-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
                }`}
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>

          <button
            onClick={() => setShowQR(!showQR)}
            className="mt-2 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
          >
            {showQR ? 'Hide QR Code' : 'Generate QR Code'}
          </button>

          {showQR && (
            <div className="mt-4 text-center items-center flex flex-col  space-y-2">
              <QRCodeCanvas id="qr-gen" value={shortUrl} size={180} />
              <br />
              <button
                onClick={downloadQR}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Download QR
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default UrlForm
