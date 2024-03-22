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
      ...createMetricDto,
      device : dv
    }

    return this.motorRepository.insert(mm);
  }

  // findAll() {
  //   return `This action returns all metric`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} metric`;
  // }

  // update(id: number, updateMetricDto: UpdateMetricDto) {
  //   return `This action updates a #${id} metric`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} metric`;
  // }
}
