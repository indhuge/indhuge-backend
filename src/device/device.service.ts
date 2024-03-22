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
    return this.deviceRepository.find();
  }

  findOne(id: string) {
    return this.deviceRepository.findOne({where : {id}});
  }

  update(id: string, updateDeviceDto: UpdateDeviceDto) {
    return this.deviceRepository.update(id, updateDeviceDto);
  }

  // remove(id: number) {
  //   return `This action removes a #${id} device`;
  // }
}
