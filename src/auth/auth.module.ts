import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { User } from 'src/models/user/user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import JwtStrategy from './jwt.strategy';
import HeaderGuard from './header-auth.guard';

@ApiTags('Authentication')
@Module({
    imports: [
        TypeOrmModule.forFeature([User]),

        PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (env: ConfigService) => {
                return {
                    secret: env.get('SECRET_MESSAGE'),
                    signOptions: {
                        expiresIn: `${env.get('ACCESS_TOKEN_MAX_AGE')}s`,
                    },
                };
            },
            inject: [ConfigService],
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, HeaderGuard],
    exports: [AuthService],
})
export class AuthModule {}
