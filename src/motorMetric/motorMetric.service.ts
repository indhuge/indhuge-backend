import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateMotorMetricDTO } from './dto/createMotorMetric.dto';
import { Repository } from 'typeorm';
import { MotorMetric } from './entities/motorMetric.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeviceService } from 'src/device/device.service';
import { MetricTypeDef } from 'src/interface/MetricTypeDef';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

@Injectable()
export class MotorMetricService {

  constructor(
    @InjectRepository(MotorMetric)
    private motorRepository : Repository<MotorMetric>,
    @Inject(DeviceService)
    private readonly deviceService : DeviceService
    
  ){}

  async create(createMetricDto: CreateMotorMetricDTO) {

    const dv = await this.deviceService.findOne(createMetricDto.device_id);
    if(dv == null){
      throw new HttpException("Invalid device_id", HttpStatus.BAD_REQUEST);
    }

    const mm : MotorMetric = {
      id : null,
      timestamp : createMetricDto.timestamp ?? Date(),
      ...createMetricDto,
      device : dv
    }

    return this.motorRepository.insert(mm);
  }

  findOne(id : number) {
    return this.motorRepository.findOne({where : {id}})
  }


  async getActualMetricAvg(deviceId : string) {
    const  o = await this.motorRepository.createQueryBuilder('m')
      .select(['AVG(m.temperature) AS temperature', 'AVG(m.rpm) AS rpm'])
      .where('device_id = :deviceId', {deviceId})
      .getRawOne()
    return {
      type : 'motor',
      ...o,
    }
  }
}
