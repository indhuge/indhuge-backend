import { Module } from '@nestjs/common';
import { SchedulerService } from './scheduler.service';
import { MetricModule } from 'src/metric/metric.module';
import { InfluxModule } from 'src/influx/influx.module';

@Module({
  imports: [InfluxModule, MetricModule],
  providers: [SchedulerService],
})
export class SchedulerModule {}
