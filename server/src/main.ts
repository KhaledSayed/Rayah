import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './shared/filters/http-exception.filter';
import * as path from 'path';
import * as express from 'express';
import { ValidationPipe } from '@nestjs/common';
import { useContainer, Validator } from 'class-validator';
import { MapperService } from 'shared/mapper/mapper.service';
import { CouponModule } from 'coupon/coupon.module';
import { Container } from 'typedi';
declare const module: any;

async function bootstrap() {
  const server = express();
  const app = await NestFactory.create(AppModule, server);
  app.enableCors();
  const hostDomain = AppModule.isDev
    ? `${AppModule.host}:${AppModule.port}`
    : `${AppModule.host}`;

  const swaggerOption = new DocumentBuilder()
    .setTitle('Clan Company eCommerce Solution')
    .setDescription('API Documentation')
    .setVersion('1.0.0')
    .setHost(hostDomain.split('//')[1])
    .setBasePath('/api')
    .addBearerAuth('Authorization', 'header')
    .build();

  const swaggerDoc = SwaggerModule.createDocument(app, swaggerOption);

  app.use('/api/docs/swagger.json', (req, res) => {
    res.send(swaggerDoc);
  });

  SwaggerModule.setup('/api/docs', app, null, {
    swaggerUrl: `${hostDomain}/api/docs/swagger.json`,
    explorer: true,
    swaggerOptions: {
      docExpansion: true,
      filter: true,
      showRequestDuration: true,
    },
  });

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  // app.useStaticAssets(path.join(__dirname, '/../public/uploads'));

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.setGlobalPrefix('api');
  app.useGlobalFilters(new HttpExceptionFilter());
  const directory: string = path.join(__dirname, '../uploads');
  app.use('/uploads', express.static(directory));
  app.useGlobalPipes(
    new ValidationPipe({
      skipMissingProperties: true,
    }),
  );

  await app.listen(AppModule.port);
}
bootstrap();

function getExpressPath() {
  return path.join(__dirname + '/../uploads');
}

function getReadablePath() {
  return '/uploads';
}
