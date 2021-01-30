import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ShortenUrlModule } from './shorten-url/shorten-url.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ShortenUrlModule,
    MongooseModule.forRoot(process.env.DATABASE_URL, { useNewUrlParser: true })
  ],
})
export class AppModule { }
