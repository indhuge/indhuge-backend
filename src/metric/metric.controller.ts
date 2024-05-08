import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { MetricService } from './metric.service';
import { IDeviceMessage } from 'src/interface/IDeviceMessage.dto';
import { MotorMetric } from 'src/motorMetric/entities/motorMetric.entity';
import { InfluxService } from 'src/influx/influx.service';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IRequestResponse } from 'src/interface/IRequestResponse';

@ApiTags('Metric')
@Controller('metric')
export class MetricController {
  constructor(
    private readonly metricService: MetricService,
    private readonly influxService: InfluxService,
  ) {}

  @Post()
  @ApiBody({ type: Array<IDeviceMessage> })
  create(@Body() createMetricDtos: IDeviceMessage[]) {
    //return this.influxService.insert(createMetricDtos);
    return this.metricService.insert(createMetricDtos);
  }

  @Post('/aws')
  create_aws(@Body() data: any) {
    return data;
  }

  // @Get('/:type/:device_id')
  // getMetricAvg(
  //   @Param('type') type: string,
  //   @Param('device_id') device_id: string,
  // ) {
  //   return this.metricService.getActualAvg(device_id, type);
  // }

  @Get('/get-all')
  @ApiResponse({
    status: 200,
    description: 'Get all metrics',
    type: IRequestResponse,
  })
  async getAllMetricAvg() {
    return await this.metricService.getActualAvgAll();
  }

  @Get('/:type/:device_id')
  @ApiResponse({
    status: 200,
    description: 'Get one metric',
    type: [MotorMetric],
  })
  async getOne(
    @Param('type') type: string,
    @Param('device_id') device_id: string,
  ) {
    return await this.metricService.findOne(type, device_id);
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
