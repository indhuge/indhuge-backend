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

    async runQueryRaw() {
      let fluxQuery = `from(bucket: "indhuge-poc")
  |> range(start: 0)
  |> mean()
  |> filter(fn: (r) => r["_measurement"] == "motor_a")`;
      const data = await this.client.getQueryApi(this.org).collectRows(
        fluxQuery, //, you can also specify a row mapper as a second argument
      );
      return data
    }

    runQuery() : Observable<any> {

        let queryClient = this.client.getQueryApi(this.org)
        let fluxQuery = `from(bucket: "indhuge-poc")
  |> range(start: 0)
  |> mean()
  |> filter(fn: (r) => r["_measurement"] == "motor_a")`;

        this.client
        
        
        const _arr : any[] = [];

        queryClient.queryRows(fluxQuery, {
          next: (row, tableMeta) => {
            const tableObject = tableMeta.toObject(row);
            _arr.push(tableObject);
            console.log(tableObject);
          },
          error: (error) => {
            console.error('\nError', error);
          },
          complete: () => {
            console.log('\nSuccess');
          },
        });

        return of(_arr);
    }




}
