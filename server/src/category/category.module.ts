import { Module, MulterModule } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { MongooseModule } from '@nestjs/mongoose';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Category } from './models/category.model';
import { BrandService } from '../brand/brand.service';
import { IsCategoryExist } from '../shared/validators/category/category-exists.validator';
import { CheckItemValidity } from '../shared/validators/slider/is-item.validator';
import { ProductService } from '../product/product.service';
import { ProductModule } from '../product/product.module';
import { Product } from '../product/models/product.model';

@Module({
  controllers: [CategoryController],
  providers: [
    CategoryService,
    IsCategoryExist,
    ProductService,
    CheckItemValidity,
  ],
  exports: [CategoryService],
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          // Generating a 32 random chars long string
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          //Calling the callback passing the random name generated with the original extension name
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
    MongooseModule.forFeature([
      {
        name: Category.modelName,
        schema: Category.model.schema,
      },
      {
        name: Product.modelName,
        schema: Product.model.schema,
      },
    ]),
  ],
})
export class CategoryModule {}
