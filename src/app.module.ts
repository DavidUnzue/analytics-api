import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PageViewsModule } from './page-views/page-views.module';

// defined in .env file
const { DB_HOST, DB_PORT, DB_NAME } = process.env;

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`),
    PageViewsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
