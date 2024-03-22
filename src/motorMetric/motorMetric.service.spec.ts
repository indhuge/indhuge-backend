import { Test, TestingModule } from '@nestjs/testing';
import { MotorMetricService } from './motorMetric.service';

describe('MetricService', () => {
  let service: MotorMetricService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MotorMetricService],
    }).compile();

    service = module.get<MotorMetricService>(MotorMetricService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
