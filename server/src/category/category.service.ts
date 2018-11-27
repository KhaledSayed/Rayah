import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { BaseService } from 'shared/base.service';
import { Category } from './models/category.model';
import { InjectModel } from '@nestjs/mongoose';
import { ModelType } from 'typegoose';
import { MapperService } from 'shared/mapper/mapper.service';
import { CategoryParams } from './models/view-models/category-params.model';
import { CategoryVm } from './models/view-models/category-vm.model';
import { Types } from 'mongoose';

@Injectable()
export class CategoryService extends BaseService<Category> {
  constructor(
    @InjectModel(Category.modelName)
    private readonly _categoryModel: ModelType<Category>,
    private readonly _mapperService: MapperService,
  ) {
    super();
    this._model = _categoryModel;
    this._mapper = _mapperService.mapper;
  }

  async onCreateCategory(categoryParams: CategoryParams): Promise<CategoryVm> {
    const newCategory = new this._model();

    newCategory.name = categoryParams.name;
    newCategory.thumbnail = categoryParams.thumbnail;
    newCategory.parent =
      categoryParams.parent && categoryParams.parent != null
        ? Types.ObjectId(categoryParams.parent)
        : null;

    try {
      const result = await this.create(newCategory);
      const categoryVm = await this.map<CategoryVm>(result.toJSON());

      return categoryVm;
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
