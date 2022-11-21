import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiSecurity } from '@nestjs/swagger';
import { AppService } from './app.service';
import JwtAuthGuard from './auth/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { KEYS } from './constants/keys';

@ApiBearerAuth()
@ApiSecurity(KEYS.API_KEY_NAME)
@Controller('/')
export class AppController {
    constructor(private readonly appService: AppService) {}

    @UseGuards(JwtAuthGuard)
    @UseGuards(AuthGuard('api-key'))
    @Get()
    getHello(): string {
        return this.appService.getHello();
    }
}
