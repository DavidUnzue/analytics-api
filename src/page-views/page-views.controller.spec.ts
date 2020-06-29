import { Test, TestingModule } from '@nestjs/testing';
import { PageViewsController } from './page-views.controller';

describe('PageViews Controller', () => {
  let controller: PageViewsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PageViewsController],
    }).compile();

    controller = module.get<PageViewsController>(PageViewsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
