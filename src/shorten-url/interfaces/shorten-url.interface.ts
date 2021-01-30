import { Document } from 'mongoose';

export interface ShortenUrl extends Document {
    url: string,
    urlHash: string,
    shortUrl: string
}