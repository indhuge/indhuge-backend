import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeviceModule } from './device/device.module';
import { Device } from './device/entities/device.entity';
import { MotorMetricModule } from './motorMetric/motorMetric.module';
import { MotorMetric } from './motorMetric/entities/motorMetric.entity';
import { MetricModule } from './metric/metric.module';
import { InfluxModule } from './influx/influx.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      username: 'postgres',
      password: 'admin',
      database : 'indhuge',
      entities: [Device, MotorMetric],
      synchronize : true
    }),
    DeviceModule,
    MotorMetricModule,
    MetricModule,
    InfluxModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
