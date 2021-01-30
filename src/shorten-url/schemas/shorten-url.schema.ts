import * as mongoose from 'mongoose';

export const ShortenUrlSchema = new mongoose.Schema({
    url: String,
    urlHash: String,
    shortUrl: String
});