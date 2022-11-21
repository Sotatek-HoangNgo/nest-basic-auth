import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import Strategy from 'passport-headerapikey';
import { ConfigService } from '@nestjs/config';

@Injectable()
export default class HeaderGuard extends PassportStrategy(Strategy, 'api-key') {
    constructor(private readonly configService: ConfigService) {
        super(
            {
                header: 'X-API-KEY',
                prefix: '',
            },
            true,
            async (
                apiKey: string,
                done: (error: Error | null, data: boolean | null) => object,
            ) => {
                return this.validate(apiKey, done);
            },
        );
    }

    public validate = (
        apiKey: string,
        done: (error: Error | null, data: boolean | null) => object,
    ) => {
        if (this.configService.get('API_KEY') === apiKey) {
            done(null, true);
        }

        done(new UnauthorizedException(), null);
    };
}
