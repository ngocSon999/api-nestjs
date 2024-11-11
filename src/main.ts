import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RequestMethod, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      // disableErrorMessages: true,
    }),
  );
  app.setGlobalPrefix('api/v1', {
    exclude: [{ path: '/', method: RequestMethod.GET }],
  });

  const config = new DocumentBuilder()
    .setTitle('Nestjs project')
    .setDescription('The nestjs project API description')
    .addBearerAuth()
    .setVersion('1.0')
    .addServer(`${process.env.PORT}`)
    .addTag('Project nestjs documentation')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
  console.log('Server is running on http://localhost:3000');
  console.log('Swagger listening at http://localhost:3000/docs');
}
bootstrap();
