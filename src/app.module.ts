import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeviceModule } from './device/device.module';
import { Device } from './device/entities/device.entity';
import { MotorMetricModule } from './motorMetric/motorMetric.module';
import { MotorMetric } from './motorMetric/entities/motorMetric.entity';
import { MetricModule } from './metric/metric.module';
import { InfluxModule } from './influx/influx.module';
import { ScheduleModule } from '@nestjs/schedule';
import { SchedulerModule } from './scheduler/scheduler.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MqttModule } from './mqtt/mqtt.module';
import { InitModule } from './init/init.module';
import { AlertModule } from './alert/alert.module';
import { Alert } from './alert/entities/alert.entity';

@Module({
  imports: [
    InitModule,
    ConfigModule.forRoot({
      envFilePath: ['./.env.local', './.env.prod', './.env'],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('POSTGRES_HOST'),
        username: config.get('POSTGRES_USER'),
        password: config.get('POSTGRES_PASSWORD'),
        database: config.get('POSTGRES_DB'),
        entities: [Device, MotorMetric, Alert],
        synchronize: true,
      }),
    }),
    DeviceModule,
    MotorMetricModule,
    MetricModule,
    InfluxModule,
    ScheduleModule.forRoot(),
    SchedulerModule,
    MqttModule,
    AlertModule,
  ],
})
export class AppModule {}
