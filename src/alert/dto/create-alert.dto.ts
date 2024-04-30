import { Device } from "src/device/entities/device.entity";

export class CreateAlertDto {

  device: Device;
  name: String;
  email: String[];
  field: String;
  alert_value: number;
  
}
