import { Module, MulterModule } from '@nestjs/common';
import { SliderService } from './slider.service';
import { SliderController } from './slider.controller';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { Slider } from './models/slider.model';

@Module({
  providers: [SliderService],
  controllers: [SliderController],
  exports: [SliderService],
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
        name: Slider.modelName,
        schema: Slider.model.schema,
      },
    ]),
  ],
})
export class SliderModule {}
