import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { ConfigOptions } from './config/config';
import generateTypeormConfigFile from './scripts/generate-typeormconfig';
import setDefaultData from './scripts/set-default-data';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);
  // generate ormconfig.json
  generateTypeormConfigFile(configService);

  // generate default data
  await setDefaultData(configService);
  console.log('NODE_ENV', process.env.NODE_ENV);
  console.log('DATABAS CONFIG', configService.get(ConfigOptions.database));

  const port = configService.get(ConfigOptions.port);
  await app.listen(port);
}
bootstrap();
