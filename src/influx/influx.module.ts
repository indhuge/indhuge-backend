import { Module } from '@nestjs/common';
import { InfluxService } from './influx.service';
import { InfluxController } from './influx.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [InfluxService],
  controllers: [InfluxController],
  exports: [InfluxService],
})
export class InfluxModule {}
