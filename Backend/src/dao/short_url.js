import ShortUrl from "../models/shorturl.model.js";
import { ConflictError } from "../utils/errorHandler.js";

export const saveShortUrl = async (shortUrl, longUrl, userId) => {
    try{
        const newUrl = new ShortUrl({
            fullUrl:longUrl,
            shortUrl:shortUrl
        })
        if(userId){
            newUrl.user = userId
        }
        const savedUrl = await newUrl.save()
        return savedUrl
    }catch(err){
        if(err.code == 11000){
            throw new ConflictError("Short URL already exists")
        }
        throw new Error(err)
    }
};

export const getShortUrl = async (shortUrl) => {
    return await ShortUrl.findOneAndUpdate({shortUrl:shortUrl},{$inc:{clicks:1}});
}

export const getCustomShortUrl = async (slug) => {
    return await ShortUrl.findOne({shortUrl:slug});
}