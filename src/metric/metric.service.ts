import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Socket } from 'dgram';
import { IDeviceMessage } from 'src/interface/IDeviceMessage.dto';
import { MetricTypeDef } from 'src/interface/MetricTypeDef';
import { CreateMotorMetricDTO } from 'src/motorMetric/dto/createMotorMetric.dto';
import { MotorMetricService } from 'src/motorMetric/motorMetric.service';


@Injectable()
export class MetricService {

  private readonly clients: Socket[] = []

  constructor(
    @Inject(MotorMetricService)
    private motorMetricService : MotorMetricService
  ){}

  create(data : IDeviceMessage) {
    
    let result = null;
    switch(data.type){
      case MetricTypeDef.motor:
        result = this.motorMetricService.create(data as CreateMotorMetricDTO);
        break;
        
    }

    return result;
  }

  createAll(data : IDeviceMessage[]) {

    const motors = data.filter((e) => e.type == MetricTypeDef.motor);
    
    if(motors.length){
      this.motorMetricService.createAll(motors as CreateMotorMetricDTO[])
    }

    this.emmit(data)

  }

  emmit(data : IDeviceMessage[]) {
    this.clients.forEach((e) => e.emit('message', data))
  }
  
  addListener(client : Socket) {
    this.clients.push(client)
  }

  removeListener(client : Socket){
    const i = this.clients.indexOf(client);
    if(i > -1)
      this.clients.splice(i, 1);
  }

  getActualAvg(device_id : string, type : string) {
    switch(type) {
      case MetricTypeDef.motor:
        return this.motorMetricService.getActualMetricAvg(device_id)
      default:
        throw new HttpException('Invalid device type', HttpStatus.BAD_REQUEST)
    }
  }

  async getActualAvgAll() {
    // motors
    const motors = this.motorMetricService.getActualMetricAvgAll();

    return {
      motors: await motors
    }
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
