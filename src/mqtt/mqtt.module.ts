import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MqttController } from './mqtt.controller';
import { InfluxService } from 'src/influx/influx.service';
import { InfluxModule } from 'src/influx/influx.module';

@Module({
    imports: [InfluxModule],
    controllers : [MqttController]
})
export class MqttModule {}
