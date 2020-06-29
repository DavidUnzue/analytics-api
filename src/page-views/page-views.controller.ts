import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Query,
  Ip,
  Headers,
} from '@nestjs/common';
import { CreatePageViewDto } from './dto/create-page-view.dto';
import { PageViewsService } from './page-views.service';
import { PageView } from './interfaces/page-view.interface';

@Controller('page-views')
export class PageViewsController {
  constructor(private readonly pageViewsService: PageViewsService) {}

  @Get()
  findAll(@Query() query): Promise<PageView[]> {
    if (query) {
      return this.pageViewsService.findByFilter(query);
    }
    return this.pageViewsService.findAll();
  }

  @Get('rate')
  getRate(@Query() query): Promise<any> {
    return this.pageViewsService.getRate(query);
  }

  @Post()
  async create(
    @Body() createPageViewDto: CreatePageViewDto,
    @Ip() reqIp: string,
    @Headers('user-agent') userAgent: string,
  ): Promise<PageView> {
    return this.pageViewsService.create(createPageViewDto, reqIp, userAgent);
  }

  @Delete(':pageViewId')
  delete(@Param('pageViewId') pageViewId: string): Promise<PageView> {
    return this.pageViewsService.delete(pageViewId);
  }
}
