import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class Device {
  @PrimaryColumn()
  id: String;

  @Column()
  type: string;

  @Column()
  description: String;
}
