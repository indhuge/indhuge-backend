import { MetricTypeDef } from './MetricTypeDef';
import { ApiProperty } from '@nestjs/swagger';

export class IDeviceMessageDto {
  @ApiProperty()
  device_id: string;
  @ApiProperty()
  type: string;
  @ApiProperty()
  timestamp?: Date;
}
