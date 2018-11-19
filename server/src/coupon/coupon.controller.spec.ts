import { Test, TestingModule } from '@nestjs/testing';
import { CouponController } from './coupon.controller';

describe('Coupon Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [CouponController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: CouponController = module.get<CouponController>(CouponController);
    expect(controller).toBeDefined();
  });
});
