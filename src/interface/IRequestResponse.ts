import { IDeviceMessage } from "./IDeviceMessage.dto";

export interface IRequestResponse {
    timestamp : String,
    items : IDeviceMessage[];
}
