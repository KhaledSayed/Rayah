import {
  Controller,
  Get,
  Body,
  Post,
  Put,
  Param,
  Delete,
  UseInterceptors,
  FileInterceptor,
  UploadedFile,
  HttpException,
  HttpStatus,
  Query,
  UseGuards,
} from '@nestjs/common';
import { SliderService } from './slider.service';
import { SliderVm } from './models/view-models/slider-vm.model';
import { SliderParams } from './models/view-models/slider-param.model';
import { Types } from 'mongoose';
import { map } from 'lodash';
import {
  ApiResponse,
  ApiOperation,
  ApiImplicitQuery,
  ApiUseTags,
} from '@nestjs/swagger';
import { ApiException } from 'shared/api-exception.model';
import { Slider } from './models/slider.model';
import { GetOperationId } from 'shared/utilities/get-operation-id';
import { ToInt } from 'shared/pipes/to-int.pipe';
import { Roles } from 'shared/decorators/roles.decorator';
import { UserRole } from 'user/models/user-role.enum';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'shared/guards/roles.guard';

@Controller('sliders')
@ApiUseTags(Slider.modelName)
export class SliderController {
  constructor(private readonly _sliderService: SliderService) {}

  @Get()
  @ApiResponse({ status: HttpStatus.OK, type: SliderVm, isArray: true })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ApiException })
  @ApiOperation(GetOperationId(Slider.modelName, 'Get'))
  @ApiImplicitQuery({
    name: 'page',
    required: true,
    type: Number,
  })
  @ApiImplicitQuery({ name: 'perPage', required: true, type: Number })
  async get(
    @Query('page', new ToInt()) page: number,
    @Query('perPage', new ToInt()) perPage: number,
  ): Promise<SliderVm[]> {
    if (isNaN(page) || isNaN(perPage)) {
      throw new HttpException(
        'page and perPage must be numbers',
        HttpStatus.BAD_REQUEST,
      );
    }

    console.log(page, perPage);
    const sliders = await this._sliderService.findAll(
      {},
      ['category'],
      page,
      perPage,
    );

    return await this._sliderService.map<SliderVm[]>(
      map(sliders, slider => slider.toJSON()),
      true,
    );
  }

  @Get(':id')
  @ApiOperation(GetOperationId(Slider.modelName, 'GetOne'))
  async getOne(@Param('id') id): Promise<SliderVm> {
    const slider = await this._sliderService.findById(id, ['item']);

    if (!slider) {
      throw new HttpException('Resource not Found', HttpStatus.NOT_FOUND);
    }

    return await this._sliderService.map<SliderVm>(slider.toJSON());
  }

  @Post()
  @ApiOperation(GetOperationId(Slider.modelName, 'Create'))
  @UseInterceptors(FileInterceptor('banner'))
  @Roles(UserRole.Admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async post(
    @UploadedFile() banner,
    @Body() sliderParams: SliderParams,
  ): Promise<SliderVm> {
    if (!banner || banner.path) {
      throw new HttpException('Banner Is Required', HttpStatus.BAD_REQUEST);
    }

    sliderParams.banner = banner.path;

    try {
      const slider = await this._sliderService.onCreateSlider(sliderParams);

      return slider;
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':id')
  @ApiOperation(GetOperationId(Slider.modelName, 'Put'))
  @UseInterceptors(FileInterceptor('banner'))
  @Roles(UserRole.Admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async put(
    @UploadedFile() banner,
    @Param('id') id,
    @Body() sliderParams: SliderParams,
  ): Promise<SliderVm> {
    const slider = await this._sliderService.findById(id);

    if (!slider) {
      throw new HttpException('Resource not Found', HttpStatus.NOT_FOUND);
    }

    if (banner && banner.path) {
      sliderParams.banner = banner.path;
    }

    try {
      const updatedSlider = await this._sliderService.onUpdateSlider(
        slider,
        sliderParams,
      );

      return updatedSlider;
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  @ApiOperation(GetOperationId(Slider.modelName, 'Delete'))
  @Roles(UserRole.Admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async delete(@Param('id') id): Promise<SliderVm> {
    const slider = await this._sliderService.findById(id);

    if (!slider) {
      throw new HttpException('Resource not Found', HttpStatus.NOT_FOUND);
    }

    try {
      const deletedSlider = await this._sliderService.delete(id);

      return await this._sliderService.map<SliderVm>(deletedSlider.toJSON());
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
