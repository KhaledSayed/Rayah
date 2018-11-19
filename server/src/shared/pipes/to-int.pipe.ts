import { PipeTransform, ArgumentMetadata, Injectable } from '@nestjs/common';

@Injectable()
export class ToInt implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type === 'query' && metadata.metatype === Number) {
      return parseInt(value, 10);
    }

    return value;
  }
}
