import { IDeviceMessageDto } from "./IDeviceMessage.dto";

export class MotorMetricMessage extends IDeviceMessageDto {
    rpm: number;
    temperature: number;
}