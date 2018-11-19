import { Test, TestingModule } from '@nestjs/testing';
import { ReviewController } from './review.controller';

describe('Review Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [ReviewController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: ReviewController = module.get<ReviewController>(ReviewController);
    expect(controller).toBeDefined();
  });
});
