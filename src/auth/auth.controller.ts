import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RespondMfaDTO } from './dto/respondMfaDTO.dto';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post('admin-auth')
    async adminAuth(@Body() body) {
        return this.authService.adminAuth(body.username, body.password);
    }

    @Post('admin-respond-challange')
    async sendMfa(@Body() resp : RespondMfaDTO) {
        return this.authService.respondMfa(resp.username, resp.code, resp.session);
    }

}
