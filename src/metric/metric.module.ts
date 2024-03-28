import { Module } from '@nestjs/common';
import { MetricService } from './metric.service';
import { MetricController } from './metric.controller';
import { MotorMetricModule } from 'src/motorMetric/motorMetric.module';
import { MetricGateway } from './metric.gateway';

@Module({
  imports: [MotorMetricModule],
  controllers: [MetricController],
  providers: [MetricService, MetricGateway],
  exports: [MetricService]
})
export class MetricModule {}
