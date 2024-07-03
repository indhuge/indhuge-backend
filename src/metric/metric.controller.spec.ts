import { Test, TestingModule } from '@nestjs/testing';
import { MetricController } from './metric.controller';
import { MetricService } from './metric.service';
import { Point } from '@influxdata/influxdb-client';

describe('MetricController', () => {
  let controller: MetricController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MetricController],
      providers: [{ provide: MetricService, useValue: {
        insert: jest.fn(() => new Point)
      } }],
    }).compile();

    controller = module.get<MetricController>(MetricController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create metric', () => {
    it('should return a 201', async () => {
      const result = await controller.create([{
        device_id: 'motor_b',
        type: 'motor',
        timestamp: new Date()
      }]);
      expect(result).toBeInstanceOf(Point)
    });
  });
});
