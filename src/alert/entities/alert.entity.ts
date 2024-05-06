import { Device } from "src/device/entities/device.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Alert {

    @PrimaryGeneratedColumn()
    id : number;

    @ManyToOne(type => Device, (device) => device.id)
    @JoinColumn({name : 'device_id'})
    device: Device;

    @Column()
    name : String;

    @Column("text", {array : true})
    email: String[];

    @Column()
    field: String;

    @Column("real")
    alert_value: number

}
