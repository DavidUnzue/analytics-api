import { Test, TestingModule } from '@nestjs/testing';
import { PageViewsService } from './page-views.service';

describe('PageViewsService', () => {
  let service: PageViewsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PageViewsService],
    }).compile();

    service = module.get<PageViewsService>(PageViewsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
