import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Device } from '../device/device.entity';

@Entity('energy_consumptions')
export class EnergyConsumption {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Device, (device) => device.id, { onDelete: 'CASCADE' })
  device: Device;

  @Column('float')
  power_value: number;

  @Column('float')
  total_power: number;

  @CreateDateColumn()
  timestamp: Date;
}