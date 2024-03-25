import { Device } from "src/device/entities/device.entity";
import { IDeviceMessage } from "src/interface/IDeviceMessage";
import { MetricTypeDef } from "src/interface/MetricTypeDef";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class MotorMetric implements IDeviceMessage {
  
  @PrimaryGeneratedColumn()
  id: number;
  
  //@Column({name : 'device_id'})
  @ManyToOne(type => Device, device => device.id)
  @JoinColumn({name : 'device_id'})
  device: Device;
  
  @Column()
  type : string = MetricTypeDef.motor;
  
  @Column()
  timestamp: Date;
  
  @Column()
  temperature: number;
  
  @Column()
  rpm: number;
  
}