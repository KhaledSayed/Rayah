import { PipeTransform, ArgumentMetadata, Injectable } from '@nestjs/common';

@Injectable()
export class ToBooleanPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type === 'query' && metadata.metatype === Boolean) {
      return value ? value === 'true' : null;
    }

    return value;
  }
}
