import { ApiProperty } from '@nestjs/swagger';

export class ForgotPasswordDTO {
  @ApiProperty()
  username: string;
}
