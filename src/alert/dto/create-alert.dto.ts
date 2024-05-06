import { Device } from "src/device/entities/device.entity";
import {ApiProperty} from '@nestjs/swagger';

export class CreateAlertDto {
  @ApiProperty()
  device: Device;
  @ApiProperty()
  name: string;
  @ApiProperty()
  email: string[];
  @ApiProperty()
  field: string;
  @ApiProperty()
  alert_value: number;
}
