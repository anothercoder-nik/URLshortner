import { generateShortUrl } from "../utils/helper.js"
// import urlSchema from "../models/short_url.model.js"
import { saveShortUrl } from "../dao/short_url.js"

export const createShortUrlWithoutUser = async (url) => {
    const shortUrl = generateShortUrl(7)
    if(!shortUrl) {
        throw new Error("Failed to generate short URL")
    }
    await saveShortUrl(shortUrl, url)
    return shortUrl
}

export const createShortUrlWithUser = async (url,userId) => {
    const shortUrl = generateNanoId(7)
    await saveShortUrl(shortUrl,url,userId)
    return shortUrl
}