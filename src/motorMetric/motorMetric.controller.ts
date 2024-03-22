import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MotorMetricService } from './motorMetric.service';
import { CreateMotorMetricDTO } from './dto/createMotorMetric.dto';

@Controller('metric/motor')
export class MotorMetricController {
  constructor(private readonly metricService: MotorMetricService) {}

  @Post()
  create(@Body() createMotorMetricDto: CreateMotorMetricDTO) {
    return this.metricService.create(createMotorMetricDto);
  }

//   @Get()
//   findAll() {
//     return this.deviceService.findAll();
//   }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.deviceService.findOne(+id);
  // }

//   @Patch(':id')
//   update(@Param('id') id: string, @Body() updateDeviceDto: UpdateDeviceDto) {
//     return this.deviceService.update(id, updateDeviceDto);
//   }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.deviceService.remove(+id);
  // }
}
