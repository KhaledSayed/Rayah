import { Module, MulterModule } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { Product } from './models/product.model';
import { MongooseModule } from '@nestjs/mongoose';
import { diskStorage } from 'multer';
import { extname } from 'path';
import {
  IsProductUnique,
  isUniqueProductCode,
} from '../shared/validators/product/unique-code';
import { CheckOrderValidation } from '../shared/validators/orders/valid-order.validator';
import {
  IsProductValid,
  CheckProductValidity,
} from '../shared/validators/product/valid-product.validator';
import { CheckProductQuantity } from '../shared/validators/product/is-applicable.validator';
import { CheckItemValidity } from '../shared/validators/slider/is-item.validator';

@Module({
  controllers: [ProductController],
  exports: [ProductService],
  providers: [
    ProductService,
    IsProductUnique,
    CheckOrderValidation,
    CheckProductValidity,
    CheckProductQuantity,
  ],
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
        name: Product.modelName,
        schema: Product.model.schema,
      },
    ]),
  ],
})
export class ProductModule {}
