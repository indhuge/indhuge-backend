import { Test, TestingModule } from '@nestjs/testing';
import { DeviceService } from './device.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Device } from './entities/device.entity';

describe('DeviceService', () => {
    let service: DeviceService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [{ provide: 'DeviceService', useClass: DeviceService }, {
                provide: getRepositoryToken(Device),
                useValue: {
                    find: jest.fn(),
                    findOne: jest.fn(),
                    create: jest.fn(),
                    save: jest.fn(),
                    remove: jest.fn(),
                },
            }],
        }).compile();

        service = module.get<DeviceService>('DeviceService');
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });


});