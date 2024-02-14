import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { name, description, version, author, license } from '../package.json';
import { ValidationPipe } from './validation.pipe';

async function bootstrap() {
  // NestJS
  const app = await NestFactory.create(AppModule);
  // Swagger
  const config = new DocumentBuilder()
    .setTitle(name)
    .setDescription(
      `${description} developed by ${author} under ${license} license.`,
    )
    .setVersion(version)
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
  //Validation Pipe
  app.useGlobalPipes(new ValidationPipe());
  // Start the application
  await app.listen(3000);
}
bootstrap();
