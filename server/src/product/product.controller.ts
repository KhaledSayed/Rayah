import {
  Controller,
  Post,
  UseInterceptors,
  FileInterceptor,
  FileFieldsInterceptor,
  Body,
  UploadedFiles,
  HttpException,
  HttpStatus,
  FilesInterceptor,
  Param,
  UploadedFile,
  Put,
  Delete,
  Res,
  Get,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductParams } from './models/view-models/product-params.model';
import { ProductVm } from './models/view-models/product-vm.model';
import { arrayProp } from 'typegoose';
import { identity } from 'rxjs';
import { map } from 'lodash';
import { ProductParamsPut } from './models/view-models/product-params-put.model';
import {
  ApiResponse,
  ApiOperation,
  ApiImplicitQuery,
  ApiUseTags,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ApiException } from 'shared/api-exception.model';
import { GetOperationId } from 'shared/utilities/get-operation-id';
import { Product } from './models/product.model';
import { Roles } from 'shared/decorators/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'shared/guards/roles.guard';
import { Types } from 'mongoose';
import { ToInt } from 'shared/pipes/to-int.pipe';
import { ToBooleanPipe } from 'shared/pipes/to-boolean.pipe';
import { UserRole } from 'user/models/user-role.enum';

@Controller('products')
@ApiUseTags(Product.modelName)
@ApiBearerAuth()
export class ProductController {
  constructor(private readonly _prodcutService: ProductService) {}

  @Get()
  @ApiResponse({ status: HttpStatus.OK, type: ProductVm, isArray: true })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ApiException })
  @ApiOperation(GetOperationId(Product.modelName, 'Get'))
  @ApiImplicitQuery({
    name: 'page',
    required: true,
    type: Number,
  })
  @ApiImplicitQuery({ name: 'perPage', required: true, type: Number })
  @ApiImplicitQuery({
    name: 'category',
    isArray: true,
    required: false,
  })
  @ApiImplicitQuery({ name: 'minPrice', isArray: false, required: false })
  @ApiImplicitQuery({ name: 'maxPrice', isArray: false, required: false })
  @ApiImplicitQuery({ name: 'featured', isArray: false, required: false })
  @ApiImplicitQuery({ name: 'searchQuery', isArray: false, required: false })
  async get(
    @Query('category') categories: string,
    @Query('page', new ToInt()) page: number,
    @Query('perPage', new ToInt()) perPage: number,
    @Query('minPrice', new ToInt()) minPrice: number,
    @Query('maxPrice', new ToInt()) maxPrice: number,
    @Query('featured', new ToBooleanPipe()) featured: boolean,
    @Query('searchQuery') search: string,
  ): Promise<ProductVm> {
    console.log(categories);

    let priceQuery = [];
    let featuredQuery = [];
    let categoriesQuery = [];
    let categoriesArray = null;
    let searchQuery = {};

    console.log('Search query', search);
    if (search !== undefined) {
      searchQuery = { firstName: { $regex: `^${search}.*`, $options: 'i' } };
    }

    if (categories !== undefined) {
      categoriesArray = categories.split(',');
      console.log(categoriesArray);

      categoriesArray.forEach(item => {
        categoriesQuery.push({
          category: Types.ObjectId(item),
        });
      });
    }

    if (minPrice) {
    }

    if (maxPrice) {
      priceQuery.push({
        price: { $gte: maxPrice },
      });
    }

    if (featured) {
      featuredQuery.push({ featured: featured });
    }

    let productQuery = {};

    if (categoriesQuery.length != 0) {
      productQuery = {
        $and: [
          { $or: [...categoriesQuery] },
          ...priceQuery,
          ...featuredQuery,
          searchQuery,
        ],
      };
    }

    if (productQuery['$and'] && productQuery['$and'].length == 0) {
      productQuery = {};
    }

    const products = await this._prodcutService.findAll(
      productQuery,
      ['coupon', 'category'],
      page,
      perPage,
    );

    return this._prodcutService.map<ProductVm>(
      map(products, product => product.toJSON()),
      true,
    );
  }

  @Get(':id')
  @ApiOperation(GetOperationId(Product.modelName, 'GetOne'))
  async findOne(@Param('id') id): Promise<ProductVm> {
    const product = await this._prodcutService.findById(id, ['category']);

    if (!product) {
      throw new HttpException('Resource Not Found', HttpStatus.NOT_FOUND);
    }

    return this._prodcutService.map<ProductVm>(product.toJSON());
  }

  @Post()
  @Roles(UserRole.Admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async post(@Body() productParams: ProductParams) {
    try {
      const product = await this._prodcutService.onCreateProduct(productParams);

      return product;
    } catch (e) {
      console.log(e);
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':id')
  @ApiOperation(GetOperationId(Product.modelName, 'Put'))
  @Roles(UserRole.Admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async put(
    @Param('id') id,
    @Body() productParams: ProductParamsPut,
  ): Promise<ProductVm> {
    const product = await this._prodcutService.findById(id);

    if (!product) {
      throw new HttpException('Resource Not Found', HttpStatus.NOT_FOUND);
    }

    try {
      const updatedProduct = await this._prodcutService.onUpdateProduct(
        product,
        productParams,
      );

      return updatedProduct;
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':id/thumbnail')
  @ApiOperation(GetOperationId(Product.modelName, 'CreateThumbnail'))
  @UseInterceptors(FileInterceptor('banner'))
  @Roles(UserRole.Admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async postThumbnail(@Param('id') id, @UploadedFile() banner) {
    console.log(id);
    if (!banner || !banner.path) {
      throw new HttpException('Thumbnail is Required', HttpStatus.BAD_REQUEST);
    }

    const product = await this._prodcutService.findById(id);

    if (!product) {
      throw new HttpException('Resource Not Found', HttpStatus.NOT_FOUND);
    }

    try {
      product.thumbnail = banner.path;
      const newProduct = await this._prodcutService.update(id, product);

      return this._prodcutService.map<ProductVm>(newProduct.toJSON());
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':id/gallery')
  @ApiOperation(GetOperationId(Product.modelName, 'Create Gallery'))
  @UseInterceptors(FilesInterceptor('gallery[]'))
  @Roles(UserRole.Admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async postGallery(@Param('id') id, @UploadedFiles() gallery) {
    console.log(id);
    console.log('Gallery:', gallery);
    if (!gallery) {
      throw new HttpException('Gallery is Required', HttpStatus.BAD_REQUEST);
    }

    const product = await this._prodcutService.findById(id);

    if (!product) {
      throw new HttpException('Resource Not Found', HttpStatus.NOT_FOUND);
    }

    try {
      gallery.forEach(element => {
        product.gallery.push(element.path);
      });

      const newProduct = await this._prodcutService.update(id, product);

      return this._prodcutService.map<ProductVm>(newProduct.toJSON());
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  @ApiOperation(GetOperationId(Product.modelName, 'Delete'))
  @Roles(UserRole.Admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async delete(@Param('id') id): Promise<ProductVm> {
    const product = await this._prodcutService.findById(id);

    if (!product) {
      throw new HttpException('Resource Not Found', HttpStatus.NOT_FOUND);
    }

    try {
      const deletedProduct = await this._prodcutService.delete(id);

      return await this._prodcutService.map<ProductVm>(deletedProduct.toJSON());
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id/gallery/:index')
  @ApiOperation(GetOperationId(Product.modelName, 'DeleteGalleryp'))
  @Roles(UserRole.Admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async deleteFromGallery(
    @Param('id') id,
    @Param('index') index,
  ): Promise<ProductVm> {
    const product = await this._prodcutService.findById(id);

    if (!product) {
      throw new HttpException('Resource Not Found', HttpStatus.NOT_FOUND);
    }

    try {
      const intIndex = parseInt(index);

      console.log(product.gallery.length - 1);
      console.log(intIndex);
      if (product.gallery.length - 1 >= intIndex) {
        product.gallery.splice(intIndex, 1);
      } else {
        throw new HttpException(
          'Index out of range',
          HttpStatus.NOT_ACCEPTABLE,
        );
      }
    } catch (e) {
      throw new HttpException('index is NaN', HttpStatus.BAD_REQUEST);
    }

    try {
      const newProduct = await this._prodcutService.update(id, product);

      return await this._prodcutService.map<ProductVm>(newProduct.toJSON());
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
