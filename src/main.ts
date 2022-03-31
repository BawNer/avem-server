require('dotenv').config()

if (!process.env.IS_TS_NODE) {
  require('module-alias/register')
}

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path'
import { NestExpressApplication } from '@nestjs/platform-express';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true });
  app.useStaticAssets(join(__dirname, '../uploads/', 'news'), {
    prefix: '/uploads/news/'
  })
  await app.listen(3000);
}
bootstrap();
