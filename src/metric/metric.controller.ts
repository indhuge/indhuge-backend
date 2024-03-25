import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MetricService } from './metric.service';
import { IDeviceMessage } from 'src/interface/IDeviceMessage.dto';
import { MotorMetric } from 'src/motorMetric/entities/motorMetric.entity';
import { MotorMetricService } from 'src/motorMetric/motorMetric.service';

@Controller('metric')
export class MetricController {
  constructor(private readonly metricService: MetricService) {}

  @Post()
  create(@Body() createMetricDto: IDeviceMessage) {
    return this.metricService.create(createMetricDto);
  }

  @Get('/:type/:device_id')
  getMetricAvg(@Param('type') type : string, @Param('device_id') device_id : string) {
    return this.metricService.getActualAvg(device_id, type)
  }

  // @Get()
  // findAll() {
  //   return this.metricService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.metricService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateMetricDto: UpdateMetricDto) {
  //   return this.metricService.update(+id, updateMetricDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.metricService.remove(+id);
  // }
}
