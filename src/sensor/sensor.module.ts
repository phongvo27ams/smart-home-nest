import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sensor } from './sensor.entity';
import { SensorService } from './sensor.service';
import { SensorController } from './sensor.controller';
import { DeviceModule } from '../device/device.module';

@Module({
  imports: [TypeOrmModule.forFeature([Sensor]), DeviceModule],
  controllers: [SensorController],
  providers: [SensorService],
  exports: [SensorService],
})

export class SensorModule { }