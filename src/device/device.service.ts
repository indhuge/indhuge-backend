import { Injectable } from '@nestjs/common';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { Repository } from 'typeorm';
import { Device } from './entities/device.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DeviceService {

  constructor(
    @InjectRepository(Device)
    private deviceRepository: Repository<Device>
  ){}

  create(createDeviceDto: CreateDeviceDto) {
    return this.deviceRepository.insert(createDeviceDto);
  }

  findAll() {
    return `This action returns all device`;
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} device`;
  // }

  // update(id: number, updateDeviceDto: UpdateDeviceDto) {
  //   return `This action updates a #${id} device`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} device`;
  // }
}
