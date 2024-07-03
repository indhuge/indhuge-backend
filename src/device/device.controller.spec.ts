import { Test, TestingModule } from '@nestjs/testing';
import { DeviceController } from './device.controller';
import { DeviceService } from './device.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';

describe('DeviceController', () => {
  let controller: DeviceController;
  let service: DeviceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeviceController],
      providers: [
        {
          provide: 'DeviceService',
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<DeviceController>(DeviceController);
    service = module.get<DeviceService>("DeviceService");
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
