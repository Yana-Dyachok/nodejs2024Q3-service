import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { LoggingService } from './logging/logging.service';
import { CustomExceptionFilter } from './logging/exception-filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const loggingService = app.get(LoggingService);
  app.useGlobalFilters(new CustomExceptionFilter());
  const port = configService.get<number>('PORT') || 4000;

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Home Library Service')
    .addServer(`http://localhost:${port}`)
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('doc', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.enableCors();

  process.on('uncaughtException', (error) => {
    loggingService.error('Uncaught Exception', error.stack);
    process.exit(1);
  });

  process.on('unhandledRejection', (reason: unknown) => {
    loggingService.error('Unhandled Rejection', JSON.stringify(reason));
  });

  await app.listen(port);
  loggingService.log(`Application is running on: http://localhost:${port}`);
  loggingService.log(`OpenAPI is running on: http://localhost:${port}/doc`);
}

bootstrap();
