import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnergyConsumption } from './energy-consumption.entity';
import { EnergyConsumptionService } from './energy-consumption.service';
import { EnergyConsumptionController } from './energy-consumption.controller';
import { DeviceModule } from '../device/device.module';

@Module({
  imports: [TypeOrmModule.forFeature([EnergyConsumption]), DeviceModule],
  controllers: [EnergyConsumptionController],
  providers: [EnergyConsumptionService],
  exports: [EnergyConsumptionService],
})

export class EnergyConsumptionModule { }