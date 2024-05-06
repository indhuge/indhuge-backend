import { IDeviceMessage } from "./IDeviceMessage.dto";
import { ApiProperty } from "@nestjs/swagger";

export class IRequestResponse {
    @ApiProperty()
    timestamp: string;

    @ApiProperty()
    items: IDeviceMessage[];
}
