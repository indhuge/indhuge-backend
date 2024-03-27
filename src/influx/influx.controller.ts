import { Controller, Get, Param, Post, Sse } from '@nestjs/common';
import { InfluxService } from './influx.service';
import { Observable, defer } from 'rxjs';

@Controller('influx')
export class InfluxController {
  constructor(private service: InfluxService) {}

  @Get()
  execTest() {
    return this.service.runTest();
  }

  // TODO: Create a interface for filter function
  @Get('/query/:device_id')
  execQuery(@Param('device_id') device_id : string) {
    return this.service.runQuery(device_id, {range : {start : 0, stop : 'now'}});
  }
}
