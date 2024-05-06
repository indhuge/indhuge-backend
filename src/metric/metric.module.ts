import { Module } from '@nestjs/common';
import { MetricService } from './metric.service';
import { MetricController } from './metric.controller';
import { MotorMetricModule } from 'src/motorMetric/motorMetric.module';
import { MetricGateway } from './metric.gateway';
import { InfluxModule } from 'src/influx/influx.module';
import { AlertModule } from 'src/alert/alert.module';

@Module({
  imports: [MotorMetricModule, InfluxModule, AlertModule],
  controllers: [MetricController],
  providers: [MetricService, MetricGateway],
  exports: [MetricService]
})
export class MetricModule {}
