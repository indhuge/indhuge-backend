import { IDeviceMessage } from "src/interface/IDeviceMessage.dto";

export class CreateMotorMetricDTO implements IDeviceMessage {
  device_id: string;
  type: 'motor';
  temperature: number;
  rpm: number;
}