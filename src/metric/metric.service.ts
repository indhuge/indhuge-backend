import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Socket } from 'dgram';
import { IDeviceMessageDto } from 'src/interface/IDeviceMessage.dto';
import { IRequestResponse } from 'src/interface/IRequestResponse';
import { MetricTypeDef } from '../interface/MetricTypeDef';
import { CreateMotorMetricDTO } from 'src/motorMetric/dto/createMotorMetric.dto';
import { MotorMetricService } from '../motorMetric/motorMetric.service';
import { AlertService } from 'src/alert/alert.service';
import { InfluxService } from 'src/influx/influx.service';

@Injectable()
export class MetricService {
  private readonly clients: Socket[] = [];

  constructor(
    @Inject(MotorMetricService)
    private motorMetricService: MotorMetricService,
    @Inject(AlertService)
    private alertService: AlertService,
    @Inject(InfluxService)
    private influxService: InfluxService,
  ) {}

  create(data: IDeviceMessageDto) {
    let result = null;
    switch (data.type) {
      case MetricTypeDef.motor:
        result = this.motorMetricService.create(data as CreateMotorMetricDTO);
        break;
    }

    return result;
  }

  createAll(data: IDeviceMessageDto[]) {
    const motors = data.filter((e) => e.type == MetricTypeDef.motor);

    if (motors.length) {
      this.motorMetricService.createAll(motors as CreateMotorMetricDTO[]);
    }

    this.emmit({
      timestamp: new Date().toISOString(),
      items: data,
    });
  }

  emmit(data: IRequestResponse) {
    this.clients.forEach((e) => e.emit('message', data));
  }

  addListener(client: Socket) {
    this.clients.push(client);
  }

  removeListener(client: Socket) {
    const i = this.clients.indexOf(client);
    if (i > -1) this.clients.splice(i, 1);
  }

  getActualAvg(device_id: string, type: string) {
    switch (type) {
      case MetricTypeDef.motor:
        return this.motorMetricService.getActualMetricAvg(device_id);
      default:
        throw new HttpException('Invalid device type', HttpStatus.BAD_REQUEST);
    }
  }

  async getActualAvgAll(): Promise<IRequestResponse> {
    // motors
    const motors = this.motorMetricService.getActualMetricAvgAll();

    const response: IRequestResponse = {
      timestamp: new Date().toISOString(),
      items: await motors,
    };

    return response;
  }

  async insert(data: Array<IDeviceMessageDto>) {
    const alers = await this.alertService.findAll();
    alers.forEach((a) => {
      const device = data.find((d) => d.device_id == a.target);
      if (device) {
        if (a.alert_value <= device[a.field as string]) {
          const ms =
            'Alert on ' +
            device.device_id +
            ' : ' +
            a.field +
            ' with value ' +
            device[a.field as string];
          console.log(ms);
          a.email.forEach((e) => {
            this.alertService.sendEmail(e as string, 'Ind[huge] alert', ms);
          });
        }
      }
    });
    this.emmit({
      timestamp: new Date().toISOString(),
      items: data,
    });
    return this.influxService.insert(data);
  }

  findAll() {
    return `This action returns all metric`;
  }

  findOne(type: string, device_id: string) {
    if (type == 'motor') {
      return this.motorMetricService.findByDeviceId(device_id);
    }
    return null;
  }

  update(id: number, updateMetricDto: any) {
    return `This action updates a #${id} metric`;
  }

  remove(id: number) {
    return `This action removes a #${id} metric`;
  }
}
