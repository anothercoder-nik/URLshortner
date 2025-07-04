import { getShortUrl } from "../dao/short_url.js";
import { createShortUrlWithoutUser } from "../services/short_url.service.js";
import shortUrlSchema from "../models/shorturl.model.js";


export const createShortUrlnow = async (req, res) => {
    const { url } = req.body

    const shortUrl = await createShortUrlWithoutUser(url)

    // shortUrl = await createShortUrlWithoutUser(data.url)

    res.status(200).json({ shortUrl: process.env.BASE_URL + shortUrl })
}

export const redirectFromShortUrl = async (req,res)=>{
    const { id } = req.params;
  console.log("Requested ID:", id);

  try {
    const url = await shortUrlSchema.findOne({ shortUrl: id });

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
}