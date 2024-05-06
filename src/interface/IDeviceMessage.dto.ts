import { MetricTypeDef } from './MetricTypeDef';
import { ApiProperty } from '@nestjs/swagger';

export class IDeviceMessage {
  @ApiProperty()
  device_id: string;
  @ApiProperty()
  type: string;
  @ApiProperty()
  timestamp?: Date;
}
