import {
  Controller,
  Get,
  Request,
  Post,
  UseInterceptors,
  FileInterceptor,
  UploadedFile,
  Body,
  Put,
  Delete,
  Param,
  HttpException,
  HttpStatus,
  UseGuards,
  Query,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import {
  ApiUseTags,
  ApiBearerAuth,
  ApiResponse,
  ApiOperation,
  ApiImplicitQuery,
  ApiImplicitParam,
} from '@nestjs/swagger';
import { Category } from './models/category.model';
import { CategoryVm } from './models/view-models/category-vm.model';
import { map } from 'lodash';
import { CategoryParams } from './models/view-models/category-params.model';
import { ApiException } from 'shared/api-exception.model';
import { GetOperationId } from 'shared/utilities/get-operation-id';
import { UserRole } from 'user/models/user-role.enum';
import { Roles } from 'shared/decorators/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'shared/guards/roles.guard';
import { ToInt } from 'shared/pipes/to-int.pipe';
import { Types } from 'mongoose';

@Controller('categories')
@ApiUseTags(Category.modelName)
@ApiBearerAuth()
export class CategoryController {
  constructor(private readonly _categoryService: CategoryService) {}

  @Get(':id')
  @ApiResponse({ status: HttpStatus.OK, type: CategoryVm, isArray: false })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ApiException })
  @ApiOperation(GetOperationId(Category.modelName, 'Get'))
  @ApiImplicitParam({
    name: 'id',
    required: true,
    type: String,
  })
  async getOne(@Param('id') id): Promise<CategoryVm> {
    // console.log(parent);

    let parentQuery = {};

    const category = await this._categoryService.findById(id, ['parent']);

    if (!category) {
      throw new HttpException('Resource not found', HttpStatus.NOT_FOUND);
    }

    return this._categoryService.map<CategoryVm>(category.toJSON());
  }

  @Get()
  @ApiResponse({ status: HttpStatus.OK, type: CategoryVm, isArray: true })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ApiException })
  @ApiOperation(GetOperationId(Category.modelName, 'Get'))
  @ApiImplicitQuery({
    name: 'page',
    required: true,
    type: Number,
  })
  @ApiImplicitQuery({ name: 'perPage', required: true, type: Number })
  @ApiImplicitQuery({
    name: 'parent',
    required: false,
    type: String,
    isArray: false,
  })
  async get(
    @Query('page', new ToInt()) page: number,
    @Query('perPage', new ToInt()) perPage: number,
    @Query('parent') parent: string,
  ): Promise<CategoryVm[]> {
    let parentQuery = {};

    if (parent && parent !== null) {
      console.log('Parent:' + parent);

      let mappedParentObject = [];

      parentQuery = { parent: Types.ObjectId(parent) };

      console.log(parentQuery, page, perPage);
    }

    const categories = await this._categoryService.findAll(
      parentQuery,
      ['parent'],
      page,
      perPage,
    );

    // console.log(categories);
    return this._categoryService.map<CategoryVm[]>(
      map(categories, category => category.toJSON()),
      true,
    );
  }

  @Post()
  @ApiOperation(GetOperationId(Category.modelName, 'Create'))
  @UseInterceptors(FileInterceptor('thumbnail'))
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.Admin)
  async post(
    @UploadedFile() thumbnail,
    @Body() categoryParams: CategoryParams,
  ): Promise<CategoryVm> {
    console.log(categoryParams);
    const { name, description } = categoryParams;

    if (!thumbnail) {
      throw new HttpException(
        'Category Image is Required',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!name) {
      throw new HttpException(
        'name of category is required',
        HttpStatus.BAD_REQUEST,
      );
    }

    categoryParams.thumbnail = thumbnail.path;

    try {
      const category = this._categoryService.onCreateCategory(categoryParams);

      return category;
    } catch (e) {
      console.log(e);
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put()
  @UseInterceptors(FileInterceptor('thumbnail'))
  @ApiOperation(GetOperationId(Category.modelName, 'Put'))
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.Admin)
  async put(
    @UploadedFile() thumbnail,
    @Body() categoryParams: CategoryParams,
  ): Promise<CategoryVm> {
    console.log(thumbnail);

    const { id, parent } = categoryParams;

    if (!id) {
      throw new HttpException(
        'id resource is required',
        HttpStatus.BAD_REQUEST,
      );
    }

    const currentCategory = await this._categoryService.findById(id);

    if (!currentCategory) {
      throw new HttpException(
        `resource with ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    if (parent) {
      const parentCategory = await this._categoryService.findById(parent);

      if (!parentCategory) {
        throw new HttpException(
          'parent resource with ${id} not found',
          HttpStatus.NOT_ACCEPTABLE,
        );
      }
      currentCategory.parent = Types.ObjectId(parent);
    }

    if (thumbnail && thumbnail.path) {
      console.log('Update Patttttth');
      currentCategory.thumbnail = thumbnail.path;
    }

    currentCategory.name = categoryParams.name
      ? categoryParams.name
      : currentCategory.name;
    currentCategory.description = categoryParams.description
      ? categoryParams.description
      : currentCategory.description;

    try {
      const updatedCategory = await this._categoryService.update(
        currentCategory.id,
        currentCategory,
      );

      return updatedCategory.toJSON() as CategoryVm;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.Admin)
  @ApiOperation(GetOperationId(Category.modelName, 'Delete'))
  async delete(@Param('id') id): Promise<CategoryVm> {
    const currentCategory = await this._categoryService.findById(id);

    if (!currentCategory) {
      throw new HttpException(
        `${id} of resource not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    const deletedCategory = await this._categoryService.delete(id);
    return deletedCategory.toJSON() as CategoryVm;
  }
}
