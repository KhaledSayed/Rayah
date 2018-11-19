import { Test, TestingModule } from '@nestjs/testing';
import { SliderController } from './slider.controller';

describe('Slider Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [SliderController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: SliderController = module.get<SliderController>(SliderController);
    expect(controller).toBeDefined();
  });
});
