import { Inject, Injectable } from '@nestjs/common';
import { InfluxDB, Point } from '@influxdata/influxdb-client';
// import { InfluxDB } from 'influx';
import { IQueryConfig, filterGetAllMetrics } from './dto/IQueryConfig.dto';
import { IDeviceMessage } from 'src/interface/IDeviceMessage.dto';
import { Tools } from 'src/tools';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class InfluxService {
  static GET_ALL_DEVICES_AND_GROUP: IQueryConfig = {
    range: {
      start: '-10m',
      stop: 'now',
    },
    filter: [filterGetAllMetrics()],
    postGroupBy: 'device_id',
  };

  private client: InfluxDB;
  private org;
  private bucket;

  constructor(@Inject(ConfigService) config: ConfigService) {
    const token = config.get('INFLUXDB_TOKEN');
    const url = config.get('INFLUXDB_URL');
    this.client = new InfluxDB({ url, token });
    this.org = config.get('INFLUXDB_ORG');
    this.bucket = config.get('INFLUXDB_BUCKET');
  }

  runTest() {
    const writeclient = this.client.getWriteApi(this.org, this.bucket, 'ns');
    for (let i = 0; i < 10; i++) {
      setTimeout(() => {
        const point = new Point('motor_a')
          .tag('data_type', 'device_metric')
          .tag('type', 'motor')
          .intField('rpm', i * 50)
          .intField('temperature', i * 150);
        writeclient.writePoint(point);
        writeclient.flush();
      }, i * 1000);
    }
  }

  private _insert(data: IDeviceMessage) {
    const writeclient = this.client.getWriteApi(this.org, this.bucket, 'ms');
    const point = new Point(data.device_id)
      .tag('data_type', 'device_metric')
      .tag('type', data.type);
    Object.keys(data).forEach((e) => {
      if (e == 'type' || e == 'device_id') return;
      point.floatField(e, data[e]);
    });
    writeclient.writePoint(point);
    writeclient.flush();
    return point;
  }

  insert(data: IDeviceMessage | Array<IDeviceMessage>) {
    if (data instanceof Array) {
      return data.map((e) => this._insert(e));
    }

    return this._insert(data);
  }

  async runQuery(config: IQueryConfig) {
    const fluxQuery = `from(bucket: "${this.bucket}")
  |> range(start: ${config.range.start}, stop:${config.range.stop == 'now' ? config.range.stop + '()' : config.range.stop})
  ${
    config.filter?.map(
      (e) => `|> filter(fn: (r) => r["${e.key}"] == "${e.value}")\n`,
    ) ?? ''
  }
    ${config.group ? `|> group(columns: ["${config.group.map((e) => `"${e}",`)}"])\n` : ''}
    |> mean()
  `;
    const data = await this.client.getQueryApi(this.org).collectRows(fluxQuery);
    const procData = data.map((e) => {
      const o = e as any;
      return {
        device_id: o._measurement,
        [o._field]: o._value,
        timestamp: o._stop,
        type: o.type,
      };
    });
    const processed = config.postGroupBy
      ? Tools.GroupByAsList(config.postGroupBy, procData)
      : null;
    return processed ?? procData;
  }
}
