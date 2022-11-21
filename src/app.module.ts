import { Module, UseGuards } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import * as Joi from '@hapi/joi';
// import { APP_GUARD } from '@nestjs/core';
// import HeaderGuard from './auth/header-auth.guard';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            validationSchema: Joi.object({
                PORT: Joi.number().required(),
                DB_USER: Joi.string().required(),
                DB_PORT: Joi.number().required(),
                DB_HOST: Joi.string().required(),
                DB_PASSWORD: Joi.string().required(),
                DB_NAME: Joi.string().required(),
            }),
        }),
        DatabaseModule,
        AuthModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        // {
        //     provide: APP_GUARD,
        //     useClass: HeaderGuard,
        // },
    ],
})
export class AppModule {}
