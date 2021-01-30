import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ShortenUrlDto } from './dto/shorten-url.dto';
import { ShortenUrl } from './interfaces/shorten-url.interface';

const displayFields = ["url", "urlHash", "shortUrl"];

@Injectable()
export class ShortenUrlService {

  constructor(@InjectModel('shortenUrls') private readonly shortenUrlModel: Model<ShortenUrl>) { }

  async getUrl(hash: string): Promise<ShortenUrl> {
    const shortenUrl = this.shortenUrlModel.findOne({ urlHash: hash });
    return shortenUrl;
  }

  async createShortenedUrl(requestBody: ShortenUrlDto): Promise<ShortenUrl> {
    const docByUrl = await this.getDocByUrl(requestBody.url);
    if (docByUrl) {
      return docByUrl;
    } else {
      const short = require('short-uuid')();
      const urlHash = short.new();
      requestBody.urlHash = urlHash;
      requestBody.shortUrl = process.env.SHORTENED_URL_DOMAIN + urlHash;
      const newShortenedUrl = new this.shortenUrlModel(requestBody);
      return newShortenedUrl.save();
    }
  }

  async getDocByUrl(url: string): Promise<ShortenUrl> {
    return this.shortenUrlModel.findOne({ url });
  }

  transformResult(shortenUrlResult: ShortenUrl): ShortenUrlDto {
    const transformedResult: ShortenUrlDto = { url: shortenUrlResult.url, urlHash: shortenUrlResult.urlHash, shortUrl: shortenUrlResult.shortUrl };
    return transformedResult;
  }
}
