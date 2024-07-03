import { IDeviceMessageDto } from 'src/interface/IDeviceMessage.dto';

export class CreateMotorMetricDTO implements IDeviceMessageDto {
  device_id: string;
  type: 'motor';
  temperature: number;
  rpm: number;
  //alignment : number;
  vibration: number;
  timestamp: Date;
}
