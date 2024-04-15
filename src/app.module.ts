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
import { ScheduleModule } from '@nestjs/schedule';
import { SchedulerModule } from './scheduler/scheduler.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MqttModule } from './mqtt/mqtt.module';
import { InvalidConfigurationException } from './interface/InvalidConfigurationException';
import { InitModule } from './init/init.module';

@Module({
  imports: [
    InitModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports:[ConfigModule],
      inject: [ConfigService],
      useFactory: (config : ConfigService) => ({
        type: 'postgres',
        host:  config.get('POSTGRES_HOST'),
        username: config.get('POSTGRES_USERNAME'),
        password: config.get('POSTGRES_PASSWORD'),
        database: config.get('POSTGRES_DATABASE'),
        entities: [__dirname + '/**/*.entity.ts'],
        synchronize: true,
      })
    }),
    DeviceModule,
    MotorMetricModule,
    MetricModule,
    InfluxModule,
    ScheduleModule.forRoot(),
    SchedulerModule,
    MqttModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
