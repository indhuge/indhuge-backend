import { ApiProperty } from "@nestjs/swagger";

export class RespondMfaDTO {
    @ApiProperty({example: 'email@mail.com'})
    username: string;
    @ApiProperty({example: '123456'})
    code: string;
    @ApiProperty({title : "Session from previous auth request"})
    session : string;
}