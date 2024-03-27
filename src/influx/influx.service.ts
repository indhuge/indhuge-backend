import { Injectable } from '@nestjs/common';
import { InfluxDB, Point } from '@influxdata/influxdb-client';
// import { InfluxDB } from 'influx';
import { write } from 'fs';
import { Observable, Observer, of } from 'rxjs';

@Injectable()
export class InfluxService {

    private client : InfluxDB
    org = 'indhuge'
    bucket = 'indhuge-poc'

    constructor(){
        console.log(`Using TOKEN: ${process.env.INFLUXDB_TOKEN}`);
        const token = process.env.INFLUXDB_TOKEN
        const url = 'http://localhost:8086'
        this.client = new InfluxDB({url, token})
    }

    static Union(objects : any[]) {
      let obj = {}
      console.log(objects)
      objects.forEach((e) => {
        Object.keys(e).forEach((i) => {
          obj[i] = e[i]
        })
      })
      return obj;
    }

    runTest() {
        
        let writeclient = this.client.getWriteApi(this.org, this.bucket, 'ns')
        for(let i = 0; i < 10; i++)
        {
            setTimeout(() => {

                let point = new Point('motor_b')
                    .tag('device', 'device_a')
                    .intField('rpm', i * 50)
                    .intField('temperature', i * 150)
                writeclient.writePoint(point)
                writeclient.flush()
            }, i * 1000)
            
        }
        
    }

    async runQuery(device_id : string, config : IQueryConfig) {
      let fluxQuery = `from(bucket: "indhuge-poc")
  |> range(start: ${config.range.start}, stop:${config.range.stop == 'now' ? config.range.stop + "()" : config.range.stop})
  |> mean()
  |> filter(fn: (r) => r["_measurement"] == "${device_id}")
  ${
    config.filter?.map((e) => `|> filter(fn: (r) => r["${e.key}"] == "${e.value}")\n`) ?? ""
  }
  `;
      const data = await this.client.getQueryApi(this.org).collectRows(
        fluxQuery
      );
      const procData = data.map((e) => {
        const o = e as any
        return {
          [o._field] : o._value
        }
      })
      return InfluxService.Union(procData);
    }
}
