// setup support for .env file
require('dotenv').config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthGuard } from './auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // allow clients to make request from other hosts
  app.enableCors({
    origin: ['http://localhost:4200'],
  });
  app.useGlobalGuards(new AuthGuard());
  await app.listen(process.env.PORT);
}
bootstrap();
