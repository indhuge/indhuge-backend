import { Module } from '@nestjs/common';
import { AlertService } from './alert.service';
import { AlertController } from './alert.controller';
import { ConfigModule } from '@nestjs/config';
import { DeviceModule } from 'src/device/device.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Alert } from './entities/alert.entity';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([Alert]), DeviceModule],
  controllers: [AlertController],
  providers: [AlertService],
  exports: [AlertService]
})
export class AlertModule {}
