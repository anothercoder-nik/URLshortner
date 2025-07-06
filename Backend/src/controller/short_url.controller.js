import { getShortUrl } from "../dao/short_url.js";
import { createShortUrlWithoutUser, createShortUrlWithUser } from "../services/short_url.service.js";
import shortUrl from "../models/shorturl.model.js";
import wrapAsync from "../utils/tryCatchWrapper.js";


export const createShortUrl = wrapAsync(async (req, res) => {
    const data = req.body
    console.log("Create short URL request received:", data); 
    let shortUrl
    
    if(req.user) {
        shortUrl = await createShortUrlWithUser(data.url, req.user._id, data.slug || null)
        console.log(shortUrl, "this is short url with user")
    } else { 
        shortUrl = await createShortUrlWithoutUser(data.url)
         console.log(shortUrl, "this is short url without user")
      }
    
    res.status(200).json({
        success: true,
        shortUrl: process.env.BASE_URL + shortUrl
    })
})


export const redirectFromShortUrl = wrapAsync(async (req,res)=>{
    const { id } = req.params;
  console.log("Requested ID:", id);

  try {
    const url = await shortUrl.findOne({ shortUrl: id });

    if (url) {
      url.clicks++;
      await url.save();

      const redirectTo = /^https?:\/\//.test(url.fullUrl)
        ? url.fullUrl
        : `https://${url.fullUrl}`;

      return res.redirect(redirectTo);
    } else {
      return res.status(404).json({ message: "URL not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
})
