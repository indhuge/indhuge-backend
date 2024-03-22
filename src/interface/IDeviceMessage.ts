import { Device } from "src/device/entities/device.entity";

export interface IDeviceMessage {
    device : Device;
    type : string;
}