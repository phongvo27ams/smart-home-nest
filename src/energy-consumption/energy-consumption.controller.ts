import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { EnergyConsumptionService } from './energy-consumption.service';
import { CreateEnergyConsumptionDto } from './dto/create-energy-consumption.dto';
import { QueryEnergyDto } from './dto/query-energy.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('energy-consumptions')
export class EnergyConsumptionController {
  constructor(private readonly energyService: EnergyConsumptionService) { }

  @Post()
  create(@Body() dto: CreateEnergyConsumptionDto) {
    return this.energyService.create(dto);
  }

  @Get()
  findAll() {
    return this.energyService.findAll();
  }

  @Get('device/:id')
  findByDevice(@Param('id') id: number) {
    return this.energyService.findByDevice(+id);
  }

  @Get('query')
  query(@Query() query: QueryEnergyDto) {
    return this.energyService.query(query);
  }

  @Get('total')
  async getTotalPower() {
    return {
      total_power: await this.energyService.getTotalPowerAllDevices(),
    };
  }
}