import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { KEYS } from 'src/constants/keys';
import { AuthService } from './auth.service';
import LoginDTO from './dto/login.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @ApiBearerAuth()
    @ApiSecurity(KEYS.API_KEY_NAME)
    @UseGuards(AuthGuard('api-key'))
    @Get()
    getAuth() {
        return 'test';
    }

    @Post()
    login(@Body() form: LoginDTO) {
        return this.authService.login(form);
    }
}
