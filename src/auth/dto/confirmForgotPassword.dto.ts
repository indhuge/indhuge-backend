import { ApiProperty } from "@nestjs/swagger";

export class ConfirmForgotPasswordDTO {
  @ApiProperty({ description: 'Username or email' })
  username: string;
  @ApiProperty({ description: 'Code receved by email' })
  code: string;
  @ApiProperty({description: 'New password'})
  newPassword: string;
}