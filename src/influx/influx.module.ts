import { Module } from '@nestjs/common';
import { InfluxService } from './influx.service';
import { InfluxController } from './influx.controller';

@Module({
 
  providers: [InfluxService],
  controllers: [InfluxController],
  exports : [InfluxService]
})
export class InfluxModule {}
