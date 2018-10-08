import { Injectable } from '@nestjs/common';
import 'automapper-ts/dist/automapper';
@Injectable()
export class MapperService {
  mapper: AutoMapperJs.AutoMapper;

  constructor() {
    this.mapper = automapper;
    this.initializeMapper();
  }

  private initializeMapper() {
    this.mapper.initialize(MapperService.configure);
  }

  private static configure(config: AutoMapperJs.IConfiguration): void {
    config
      .createMap('User', 'UserVM')
      .forSourceMember('_id', opts => opts.ignore())
      .forSourceMember('password', opts => opts.ignore());
  }
}
