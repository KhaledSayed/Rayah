import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Brand } from './models/brand.model';
import { ModelType } from 'typegoose';
import { MapperService } from '../shared/mapper/mapper.service';
import { BaseService } from '../shared/base.service';
import { BrandVm } from './models/view-models/brand-vm.model';
import { BrandParam } from './models/view-models/brand-param.model';

@Injectable()
export class BrandService extends BaseService<Brand> {
  constructor(
    @InjectModel(Brand.modelName)
    private readonly _brandModel: ModelType<Brand>,
    private readonly _mapperService: MapperService,
  ) {
    super();
    this._model = _brandModel;
    this._mapper = _mapperService.mapper;
  }

  async onCreateBrand(brandParam: BrandParam): Promise<BrandVm> {
    const newBrand = new this._model();

    newBrand.name = brandParam.name;
    newBrand.logo = brandParam.logo;

    try {
      const result = await this.create(newBrand);
      const brandVm = await this.map<BrandVm>(result.toJSON());

      return brandVm;
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
