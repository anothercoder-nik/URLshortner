import urlSchema from "../models/shorturl.model.js";
// import { ConflictError } from "../utils/errorHandler.js";

export const saveShortUrl = async (shortUrl, longUrl, userId) => {

        const newUrl = new urlSchema({
            fullUrl:longUrl,
            shortUrl:shortUrl
        })
        if(userId){
            newUrl.user = userId
        }
        await newUrl.save()
};

export const getShortUrl = async (shortUrl) => {
    return await urlSchema.findOneAndUpdate({short_url:shortUrl},{$inc:{clicks:1}});
}