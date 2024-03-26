import { Controller, Get, Post, Sse } from '@nestjs/common';
import { InfluxService } from './influx.service';
import { Observable, defer } from 'rxjs';

@Controller('influx')
export class InfluxController {
  constructor(private service: InfluxService) {}

  @Get()
  execTest() {
    return this.service.runTest();
  }

  @Get('/query')
  execQuery() {
    return this.service.runQueryRaw();
  }
  @Get('/query1')
  execQuery_() {
    return this.service.runQuery();
  }
}
