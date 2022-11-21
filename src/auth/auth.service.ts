import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import LoginDTO from './dto/login.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/models/user/user.entity';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService,
        private configServices: ConfigService,
    ) {}

    async login(authCredential: LoginDTO) {
        const user = await this.userRepository.findOne({
            where: {
                username: authCredential.username,
            },
        });

        if (!user) {
            throw new NotFoundException();
        }

        if (authCredential.password !== user.password) {
            throw new BadRequestException();
        }

        const accessToken = this.jwtService.sign({
            id: user.id,
            username: user.username,
            expiresIn: this.configServices.get('ACCESS_TOKEN_MAX_AGE'),
        });

        return {
            accessToken,
            maxAge: this.configServices.get('ACCESS_TOKEN_MAX_AGE'),
        };
    }
}
