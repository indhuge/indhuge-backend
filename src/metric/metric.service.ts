import { Inject, Injectable } from '@nestjs/common';
import { IDeviceMessage } from 'src/interface/IDeviceMessage.dto';
import { MetricTypeDef } from 'src/interface/MetricTypeDef';
import { CreateMotorMetricDTO } from 'src/motorMetric/dto/createMotorMetric.dto';
import { MotorMetricService } from 'src/motorMetric/motorMetric.service';


@Injectable()
export class MetricService {

  constructor(
    @Inject(MotorMetricService)
    private motorMetricService : MotorMetricService
  ){}

  create(data : IDeviceMessage) {
    
    switch(data.type){
      case MetricTypeDef.motor:
        return this.motorMetricService.create(data as CreateMotorMetricDTO);
        
    }

    return null;
  }

  findAll() {
    return `This action returns all metric`;
  }

  findOne(id: number) {
    return `This action returns a #${id} metric`;
  }

  update(id: number, updateMetricDto: any) {
    return `This action updates a #${id} metric`;
  }

  remove(id: number) {
    return `This action removes a #${id} metric`;
  }
}
