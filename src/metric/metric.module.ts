import { Module } from '@nestjs/common';
import { MetricService } from './metric.service';
import { MetricController } from './metric.controller';
import { MotorMetricModule } from 'src/motorMetric/motorMetric.module';
import { MetricGateway } from './metric.gateway';
import { InfluxModule } from 'src/influx/influx.module';

@Module({
  imports: [MotorMetricModule, InfluxModule],
  controllers: [MetricController],
  providers: [MetricService, MetricGateway],
  exports: [MetricService]
})
export class MetricModule {}
