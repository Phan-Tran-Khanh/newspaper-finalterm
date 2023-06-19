import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import * as hbs from 'hbs';
import { join } from 'path';
import * as morgan from 'morgan';
import * as cookieParser from 'cookie-parser';
import { AppModule } from 'src/modules/app/app.module';
import registerHelpers from './utils/hbs';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // set up view engine
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  app.set('view options', { layout: 'layouts/main' });
  hbs.registerPartials(join(__dirname, '..', 'views', 'partials'));
  registerHelpers(hbs);

  //set up cookies
  app.use(cookieParser());

  // set up request logger
  app.use(
    morgan('tiny', {
      stream: {
        write: (message) => Logger.log(message.replace('\n', '')),
      },
    }),
  );

  // set up swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Newspaper API')
    .setDescription('The newspaper API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  // set up application
  const configService = app.get(ConfigService);
  const port = configService.get('SERVER_PORT');
  await app.listen(port);

  Logger.log(`Server is listening on port ${port}`, 'NestApplication');
}
bootstrap();
