import { Module } from '@nestjs/common';
import { MetricService } from './metric.service';
import { MetricController } from './metric.controller';
import { MotorMetricModule } from 'src/motorMetric/motorMetric.module';

@Module({
  imports: [MotorMetricModule],
  controllers: [MetricController],
  providers: [MetricService],
})
export class MetricModule {}
