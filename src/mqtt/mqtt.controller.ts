import { Controller, Inject } from '@nestjs/common';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';
import { InfluxService } from 'src/influx/influx.service';

@Controller('mqtt')
export class MqttController {

    constructor(@Inject(InfluxService) private influxService : InfluxService){}

    @MessagePattern('nest/test')
    getNotification(@Payload() data : any) {
        this.influxService.insert(data);
        return "Message"
    }
}
