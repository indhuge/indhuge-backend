import { Test } from '@nestjs/testing';
import { MetricService } from './metric.service';
import { AlertService } from 'src/alert/alert.service';
import { InfluxService } from 'src/influx/influx.service';
import { MotorMetricModule } from 'src/motorMetric/motorMetric.module';
import { MotorMetricService } from 'src/motorMetric/motorMetric.service';
import { IDeviceMessageDto } from 'src/interface/IDeviceMessage.dto';
import { MotorMetricMessage } from 'src/interface/MotorMetricMessage';
import { Point } from '@influxdata/influxdb-client';
import exp from 'constants';

const obj: MotorMetricMessage = {
  device_id: 'motor_a',
  type: 'motor',
  timestamp: new Date(),
  rpm: 601,
  temperature: 30,
};

describe('MetricService', () => {
  let metricService: MetricService;
  let alertService: AlertService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        MetricService,
        {
          provide: AlertService,
          useValue: {
            findAll: jest.fn(() => {
              return [
                {
                  id: 4,
                  name: 'alert_test',
                  email: ['luanf2003@gmail.com'],
                  field: 'rpm',
                  alert_value: 600,
                  target: 'motor_a',
                },
              ];
            }),
            sendEmail: jest.fn(),
          },
        },
        {
          provide: InfluxService,
          useValue: {
            insert: jest.fn(() => new Point()),
          },
        },
        { provide: MotorMetricService, useValue: {} },
      ],
    }).compile();

    metricService = module.get<MetricService>(MetricService);
    alertService = module.get<AlertService>(AlertService);
  });

  it('should be defined', () => {
    expect(metricService).toBeDefined();
  });

  it('should create a metric', async () => {
    const result = await metricService.insert([obj]);
    expect(alertService.sendEmail).toHaveBeenCalled();
    expect(result).toBeInstanceOf(Point);
  });
});
