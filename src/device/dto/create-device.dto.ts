import { ApiProperty } from '@nestjs/swagger';

export class CreateDeviceDto {
  @ApiProperty()
  id: string;
  @ApiProperty({
    enum: ['motor', 'silo'],
  })
  type: 'motor' | 'silo';
  @ApiProperty()
  description: string;
}
