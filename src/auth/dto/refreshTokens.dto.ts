import { ApiProperty } from "@nestjs/swagger";

export class RefreshTokensDTO {
    @ApiProperty({description : "Valid refresh token"})
    refreshToken: string;
}