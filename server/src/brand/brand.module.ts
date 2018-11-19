import { Module, MulterModule } from '@nestjs/common';
import { BrandController } from './brand.controller';
import { BrandService } from './brand.service';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { Brand } from './models/brand.model';

@Module({
  controllers: [BrandController],
  providers: [BrandService],
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
        name: Brand.modelName,
        schema: Brand.model.schema,
      },
    ]),
  ],
})
export class BrandModule {}
