import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RespondMfaDTO } from './dto/respondMfaDTO.dto';
import { ApiTags } from '@nestjs/swagger';
import { ForgotPasswordDTO } from './dto/forgetPassword.dto';
import { ConfirmForgotPasswordDTO } from './dto/confirmForgotPassword.dto';
import { RefreshTokensDTO } from './dto/refreshTokens.dto';

@Controller('auth')
@ApiTags('Auth')
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

    @Post('forgot-password')
    async forgetPassword(@Body() body : ForgotPasswordDTO) {
        return this.authService.forgetPassword(body);
    }

    @Post('confirm-forgot-password')
    async confirmForgotPassword(@Body() body : ConfirmForgotPasswordDTO) {
        return this.authService.confirmForgotPassword(body);
    }

    @Post('refresh-session')
    async refreshSession(@Body() body : RefreshTokensDTO) {
        return this.authService.refreshSession(body);
    }
}
