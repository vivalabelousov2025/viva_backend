import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import metadata from 'src/metadata';

export async function swaggerSetup(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('VIVA BACKEND')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'Bearer',
    )
    .build();

  await SwaggerModule.loadPluginMetadata(metadata);
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
}
