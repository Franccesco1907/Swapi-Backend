import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('API')
    .setDescription('Swapi API')
    .setVersion('1.0')
    .addTag('Swapi')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document);
  const configService = app.get(ConfigService);
  const port = configService.get<string>('PORT');

  await app.listen(port).then(() => {
    console.log(`Application is running on: ${port}`);
  });
}
bootstrap();
