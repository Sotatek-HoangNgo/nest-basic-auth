import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/models/user/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

interface JWTPayload {
    username: string;
    iat: number;
    exp: number;
    expiresIn: string;
}

@Injectable()
export default class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private readonly configService: ConfigService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('SECRET_MESSAGE'),
        });
    }

    async validate(payload: JWTPayload): Promise<User> {
        const { username } = payload;
        console.log('Request payload: ', payload);

        const user = await this.userRepository.findOne({
            where: {
                username: username,
            },
        });

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}
