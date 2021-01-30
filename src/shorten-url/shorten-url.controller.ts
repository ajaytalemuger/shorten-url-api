import { Controller, Get, Post, Res, HttpStatus, Body, Param } from '@nestjs/common';
import { ShortenUrlService } from './shorten-url.service';
import { ShortenUrlDto } from './dto/shorten-url.dto';
import { Response } from 'express';

@Controller()
export class ShortenUrlController {
  constructor(private readonly shortenUrlService: ShortenUrlService) { }

  @Get(':hash')
  async redirectToUrl(@Param('hash') hash: string, @Res() res: Response) {
    const shortenUrl = await this.shortenUrlService.getUrl(hash);
    if (shortenUrl) {
      res.status(HttpStatus.FOUND).location(shortenUrl.url).send();
    } else {
      res.status(HttpStatus.NOT_FOUND).send({ message: "url not found" });
    }
  }

  @Post('/links')
  async createHash(@Body() body: ShortenUrlDto, @Res() res: Response) {
    const shortenUrlResult = await this.shortenUrlService.createShortenedUrl(body);
    res.status(HttpStatus.OK).send(this.shortenUrlService.transformResult(shortenUrlResult));
  }
}
