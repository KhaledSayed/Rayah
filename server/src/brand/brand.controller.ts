import {
  Controller,
  Get,
  HttpStatus,
  UseGuards,
  Body,
  Post,
  UseInterceptors,
  FileInterceptor,
  UploadedFile,
  HttpException,
  Param,
  Header,
  Request,
  Head,
  Query,
  Put,
  Delete,
} from '@nestjs/common';
import {
  ApiUseTags,
  ApiBearerAuth,
  ApiResponse,
  ApiOperation,
  ApiImplicitQuery,
  ApiImplicitFile,
  ApiConsumes,
  ApiImplicitBody,
  ApiImplicitParam,
} from '@nestjs/swagger';
import { Brand } from './models/brand.model';
import { BrandVm } from './models/view-models/brand-vm.model';
import { ApiException } from 'shared/api-exception.model';
import { GetOperationId } from 'shared/utilities/get-operation-id';
import { UserRole } from 'user/models/user-role.enum';
import { Roles } from 'shared/decorators/roles.decorator';
import { RolesGuard } from 'shared/guards/roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { BrandService } from './brand.service';
import { BrandParam } from './models/view-models/brand-param.model';
import { map, isArray } from 'lodash';

@Controller('brand')
@ApiUseTags(Brand.modelName)
@ApiBearerAuth()
export class BrandController {
  constructor(private readonly _brandService: BrandService) {}

  @Post()
  @Roles(UserRole.Admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiResponse({ status: HttpStatus.CREATED, type: BrandVm })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ApiException })
  @ApiOperation(GetOperationId(Brand.modelName, 'Create'))
  @UseInterceptors(FileInterceptor('banner'))
  @ApiConsumes('multipart/form-data')
  @ApiImplicitFile({ name: 'banner', description: 'Banner', required: false })
  async create(
    @UploadedFile() banner,
    @Request() request,
    @Body() brandParam: BrandParam,
  ): Promise<BrandVm> {
    brandParam.logo = banner.path;

    const { name, logo } = brandParam;

    if (!name) {
      throw new HttpException(
        'name of Brand is Required',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!logo) {
      throw new HttpException(
        'logo of brand is required',
        HttpStatus.BAD_REQUEST,
      );
    }

    const brand = await this._brandService.onCreateBrand(brandParam);

    return brand;
  }

  @Get()
  @ApiResponse({ status: HttpStatus.OK, type: BrandVm, isArray: true })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ApiException })
  @ApiOperation(GetOperationId(Brand.modelName, 'Get'))
  @Roles(UserRole.Admin, UserRole.User)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async get(): Promise<BrandVm[]> {
    try {
      const brands = await this._brandService.findAll();

      return this._brandService.map<BrandVm[]>(
        map(brands, brand => brand.toJSON()),
        true,
      );
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put()
  @Roles(UserRole.Admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiResponse({ status: HttpStatus.OK, type: BrandVm, isArray: false })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ApiException })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, type: ApiException })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, type: ApiException })
  @ApiOperation(GetOperationId(Brand.modelName, 'Update'))
  @UseInterceptors(FileInterceptor('banner'))
  async update(
    @Body() brandParam: BrandParam,
    @UploadedFile() banner,
  ): Promise<BrandVm> {
    const { id } = brandParam;

    if (!id) {
      throw new HttpException(
        'You Must Provide the ID of the param',
        HttpStatus.BAD_REQUEST,
      );
    }

    const existBrand = await this._brandService.findById(id);
    if (!existBrand) {
      throw new HttpException(
        `${id} ${Brand.modelName}resource not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    if (banner && banner.path) {
      existBrand.logo = banner.path;
    }

    if (brandParam.name) {
      existBrand.name = brandParam.name;
    }

    try {
      const updatedBrand = await this._brandService.update(
        existBrand.id,
        existBrand,
      );

      return updatedBrand.toJSON() as BrandVm;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  @ApiResponse({ status: HttpStatus.OK, type: BrandVm, isArray: false })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ApiException })
  @ApiOperation(GetOperationId(Brand.modelName, 'Delete'))
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiImplicitParam({ name: 'id' })
  @Roles(UserRole.Admin)
  async delete(@Param('id') id): Promise<BrandVm> {
    const existBrand = await this._brandService.findById(id);

    if (!existBrand) {
      throw new HttpException('resource not found', HttpStatus.NOT_FOUND);
    }

    console.log(existBrand);

    try {
      const deletedResource = await this._brandService.delete(id);

      return this._brandService.map<BrandVm>(deletedResource.toJSON());
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
