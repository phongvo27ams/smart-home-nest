import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Device } from '../device/device.entity';
import { User } from '../user/user.entity';

@Entity('relay_controls')
export class RelayControl {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Device, { eager: true, onDelete: 'CASCADE' })
  device: Device;

  @ManyToOne(() => User, { eager: true, nullable: true, onDelete: 'SET NULL' })
  user?: User;

  @Column()
  action: 'ON' | 'OFF';

  @Column({ default: false })
  isAutomatic: boolean;

  @CreateDateColumn()
  timestamp: Date;
}