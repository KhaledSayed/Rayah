import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { BaseService } from '../shared/base.service';
import { Product } from './models/product.model';
import { InjectModel } from '@nestjs/mongoose';
import { ModelType } from 'typegoose';
import { MapperService } from '../shared/mapper/mapper.service';
import { ProductParams } from './models/view-models/product-params.model';
import { ProductVm } from './models/view-models/product-vm.model';
import { Types } from 'mongoose';
import { ProductParamsPut } from './models/view-models/product-params-put.model';
import { Category } from '../category/models/category.model';

@Injectable()
export class ProductService extends BaseService<Product> {
  constructor(
    @InjectModel(Product.modelName) _productModel: ModelType<Product>,
    private readonly _mapperService: MapperService,
  ) {
    super();
    this._mapper = this._mapperService.mapper;
    this._model = _productModel;
  }

  async onCreateProduct(productParams: ProductParams): Promise<ProductVm> {
    let newProduct = new this._model();

    newProduct.name = productParams.name;
    newProduct.price = productParams.price;
    newProduct.quantity = productParams.quantity;
    newProduct.code = productParams.code;
    newProduct.featured = productParams.featured;
    newProduct.category = Types.ObjectId(productParams.category);

    try {
      const result = await this.create(newProduct);
      const productVm = await this.map<ProductVm>(result.toJSON());

      return productVm;
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  async onUpdateProduct(
    product,
    productParams: ProductParamsPut,
  ): Promise<ProductVm> {
    product.name = productParams.name;
    product.price = productParams.price;
    product.quantity = productParams.quantity;
    product.code = productParams.code;
    product.featured = productParams.featured;
    product.category = Types.ObjectId(productParams.category);

    try {
      const updatedProduct = await this.update(product.id, product);

      return await this.map<ProductVm>(updatedProduct.toJSON());
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
