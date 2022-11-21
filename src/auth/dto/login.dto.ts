import { ApiProperty } from '@nestjs/swagger';

export default class LoginDTO {
    @ApiProperty({ type: String, default: 'hoangzzzsss' })
    username: string;
    @ApiProperty({ type: String, default: '1' })
    password: string;
}
