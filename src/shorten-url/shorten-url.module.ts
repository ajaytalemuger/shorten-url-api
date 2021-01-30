import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { ShortenUrlController } from './shorten-url.controller';
import { ShortenUrlService } from './shorten-url.service';
import { validatePostbody } from './middlewares/validation.middleware';
import { MongooseModule } from '@nestjs/mongoose';
import {ShortenUrlSchema} from './schemas/shorten-url.schema';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'shortenUrls', schema: ShortenUrlSchema }])
    ],
    controllers: [ShortenUrlController],
    providers: [ShortenUrlService],
})
export class ShortenUrlModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(validatePostbody)
            .forRoutes({ path: 'links', method: RequestMethod.POST });
    }
}