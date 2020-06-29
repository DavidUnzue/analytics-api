import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PageViewsController } from './page-views.controller';
import { PageViewsService } from './page-views.service';
import { PageView, PageViewSchema } from './schemas/page-view.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PageView.name, schema: PageViewSchema },
    ]),
  ],
  controllers: [PageViewsController],
  providers: [PageViewsService],
})
export class PageViewsModule {}
