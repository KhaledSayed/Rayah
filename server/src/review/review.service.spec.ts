import { Test, TestingModule } from '@nestjs/testing';
import { ReviewService } from './review.service';

describe('ReviewService', () => {
  let service: ReviewService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReviewService],
    }).compile();
    service = module.get<ReviewService>(ReviewService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
