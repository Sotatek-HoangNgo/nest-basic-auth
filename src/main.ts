import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { KEYS } from './constants/keys';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const config = new DocumentBuilder()
        .setTitle('Document')
        .setDescription('API description')
        .setVersion('1.0')
        .addBearerAuth()
        .addApiKey(
            {
                type: 'apiKey',
                name: 'x-api-key',
                in: 'header',
            },
            KEYS.API_KEY_NAME,
        )
        .build();
    const document = SwaggerModule.createDocument(app, config);
    const env = app.get(ConfigService);

    SwaggerModule.setup('api', app, document);

    await app.listen(env.get('PORT') as number);
    console.log('Apps start at: http://localhost:' + env.get('PORT'));
    console.log('Swagger docs: http://localhost:' + env.get('PORT') + '/api');
}
bootstrap();
