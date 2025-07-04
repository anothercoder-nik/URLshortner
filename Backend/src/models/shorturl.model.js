// src/models/shorturl.model.js

import mongoose from 'mongoose';

const shortUrlSchema = new mongoose.Schema({
  fullUrl: {
    type: String,
    required: true,
  },
  shortUrl: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },
  clicks: {
    type: Number,
    default: 0,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

const ShortUrl = mongoose.model('ShortUrl', shortUrlSchema);
export default ShortUrl;
