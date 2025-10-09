import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Device } from '../device/device.entity';
import { User } from '../user/user.entity';

@Entity('relay_controls')
export class RelayControl {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Device, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'deviceId' })
  device: Device;

  @ManyToOne(() => User, { eager: true, nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'userId' })
  user?: User;

  @Column()
  action: 'ON' | 'OFF';

  @Column({ default: false })
  isAutomatic: boolean;

  @CreateDateColumn()
  timestamp: Date;
}