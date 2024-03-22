import { Device } from "src/device/entities/device.entity";
import { IDeviceMessage } from "src/interface/IDeviceMessage";
import { MetricTypeDef } from "src/interface/MetricTypeDef";
import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class MotorMetric implements IDeviceMessage {
    
  @PrimaryGeneratedColumn()
  id: number;
    
  @ManyToOne(type => Device, device => device.id)
  device: Device;
  
  @Column()
  type : string = MetricTypeDef.motor;

  @Column()
  temperature: number;

  @Column()
  rpm: number;
  
}