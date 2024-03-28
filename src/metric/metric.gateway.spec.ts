import { Test, TestingModule } from '@nestjs/testing';
import { MetricGateway } from './metric.gateway';

describe('MetricGateway', () => {
  let gateway: MetricGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MetricGateway],
    }).compile();

    gateway = module.get<MetricGateway>(MetricGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
