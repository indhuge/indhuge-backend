import MotorType from 'src/interface/MotorType';
import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class Device {
  @PrimaryColumn()
  id: String;

  @Column()
  type: 'motor' | 'silo';

  @Column()
  description: String;
}
