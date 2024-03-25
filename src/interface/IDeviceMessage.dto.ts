import { MetricTypeDef } from "./MetricTypeDef";

export interface IDeviceMessage {
  device_id: string;
  type: string;
  timestamp? : Date;
}
