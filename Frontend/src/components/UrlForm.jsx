import axios from 'axios';
import React, { useState } from 'react';

// Changed from lowercase to uppercase for component name (React convention)
const UrlForm = () => {
  const [value, setValue] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const { data } = await axios.post('http://localhost:3000/api/create', { url: value });
      setShortUrl(data.shortUrl);
    } catch (error) {
      console.error("Error shortening URL:", error);
      setError("Failed to shorten URL. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  function handleCopy() {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    
    // Reset copied state after 4 seconds
    setTimeout(() => {
      setCopied(false);
    }, 4000);
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">URL Shortener</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="url" className="block text-sm font-medium text-gray-700">
            Enter your URL
          </label>
          <input
            type="url"
            id="url"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="https://example.com"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {isLoading ? 'Shortening...' : 'Shorten URL'}
        </button>
      </form>
      
      {error && (
        <div className="mt-4 p-2 bg-red-100 text-red-700 rounded-md text-sm">
          {error}
        </div>
      )}
      
      {shortUrl && (
        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <p className="text-sm font-medium text-gray-700">Your shortened URL:</p>
          <div className="mt-2 flex items-center">
            <input
              type="text"
              readOnly
              value={shortUrl}
              className="flex-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50"
            />
            <button
              onClick={handleCopy}
              className={`ml-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white transition-colors duration-300 ${
                copied ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Changed export to match the capitalized component name
export default UrlForm;