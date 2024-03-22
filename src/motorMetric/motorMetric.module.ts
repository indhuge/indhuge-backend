import { Module } from '@nestjs/common';
import { MotorMetricService } from './motorMetric.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MotorMetric } from './entities/motorMetric.entity';
import { MotorMetricController } from './motorMetric.controller';
import { DeviceService } from 'src/device/device.service';
import { Device } from 'src/device/entities/device.entity';
import { DeviceModule } from 'src/device/device.module';

@Module({
  imports: [TypeOrmModule.forFeature([MotorMetric]), DeviceModule],
  controllers: [MotorMetricController],
  providers: [MotorMetricService],
  exports: [MotorMetricService]
})
export class MotorMetricModule {}
