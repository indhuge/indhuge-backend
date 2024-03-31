import { Inject, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InfluxService } from 'src/influx/influx.service';
import { MetricService } from 'src/metric/metric.service';
import { CreateMotorMetricDTO } from 'src/motorMetric/dto/createMotorMetric.dto';

@Injectable()
export class SchedulerService {

    numberOfReads : number = 0

    constructor(
        @Inject(InfluxService)
        private influxService : InfluxService,
        @Inject(MetricService)
        private metricService : MetricService
    ){}


    //@Cron(CronExpression.EVERY_MINUTE)
    async importData(){
        console.time("Importing data")
        let config = InfluxService.GET_ALL_DEVICES_AND_GROUP
        if(this.numberOfReads != 0)
            config.range.start = '-1m'
        const data = (await this.influxService.runQuery(config)) as CreateMotorMetricDTO[]
        this.metricService.createAll(data);
        console.timeEnd('Importing data');
    }

}
