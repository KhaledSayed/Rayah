import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { BaseService } from 'shared/base.service';
import { Slider } from './models/slider.model';
import { InjectModel } from '@nestjs/mongoose';
import { ModelType } from 'typegoose';
import { MapperService } from 'shared/mapper/mapper.service';
import { SliderParams } from './models/view-models/slider-param.model';
import { Types } from 'mongoose';
import { SliderVm } from './models/view-models/slider-vm.model';
import { BrandVm } from 'brand/models/view-models/brand-vm.model';

@Injectable()
export class SliderService extends BaseService<Slider> {
  constructor(
    @InjectModel(Slider.modelName)
    private readonly _sliderModel: ModelType<Slider>,
    private readonly _mapperService: MapperService,
  ) {
    super();
    this._model = this._sliderModel;
    this._mapper = this._mapperService.mapper;
  }

  async onCreateSlider(sliderParams: SliderParams): Promise<SliderVm> {
    const slider = new this._model();

    slider.banner = sliderParams.banner;
    slider.type = sliderParams.type;
    slider.item = Types.ObjectId(sliderParams.item);

    try {
      const newSlider = await this.create(slider);

      return await this.map<SliderVm>(newSlider.toJSON());
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async onUpdateSlider(slider, sliderParams: SliderParams): Promise<SliderVm> {
    const { type, item } = sliderParams;

    slider.type = type;
    slider.item = Types.ObjectId(item);

    try {
      const updatedSlider = await this.update(slider._id, slider);

      return await this.map<SliderVm>(updatedSlider.toJSON());
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
