import { Device } from "src/device/entities/device.entity";
import { ApiProperty } from "@nestjs/swagger";

export class IDeviceMessage {
  @ApiProperty()
  device: Device;
  @ApiProperty()
  type: string;
  @ApiProperty()
  timestamp: Date;
}