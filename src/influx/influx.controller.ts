import { Controller, Get, Param, Post, Sse } from '@nestjs/common';
import { InfluxService } from './influx.service';
import { Observable, defer } from 'rxjs';
import { filterByDeviceId, filterGetAllMetrics } from './dto/IQueryConfig.dto';

@Controller('influx')
export class InfluxController {j
  constructor(private service: InfluxService) {}

  // @Get()
  // execTest() {
  //   return this.service.runTest();
  // }

  // TODO: Create a interface for filter function
  @Get('/query')
  execQuery() {
    return this.service.runQuery({
      range: { start: 0, stop: 'now' },
      filter: [filterGetAllMetrics()],
      postGroupBy: 'device_id',
    });
  }
}
