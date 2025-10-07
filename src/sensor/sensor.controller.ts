import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { SensorService } from './sensor.service';
import { CreateSensorDto } from './dto/create-sensor.dto';
import { UpdateSensorDto } from './dto/update-sensor.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('sensors')
export class SensorController {
  constructor(private readonly sensorService: SensorService) { }

  @Post()
  create(@Body() dto: CreateSensorDto) {
    return this.sensorService.create(dto);
  }

  @Get()
  findAll() {
    return this.sensorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.sensorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: UpdateSensorDto) {
    return this.sensorService.update(+id, dto);
  }

  @Patch(':id/value')
  updateValue(@Param('id') id: number, @Body('value') value: number) {
    return this.sensorService.updateValue(+id, value);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.sensorService.remove(+id);
  }
}