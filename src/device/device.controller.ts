import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards, ParseIntPipe, Request  } from '@nestjs/common';
import { DeviceService } from './device.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('devices')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) { }

  @Post()
  create(@Body() createDeviceDto: CreateDeviceDto) {
    return this.deviceService.create(createDeviceDto);
  }

  @Get()
  findAll() {
    return this.deviceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.deviceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateDeviceDto: UpdateDeviceDto) {
    return this.deviceService.update(+id, updateDeviceDto);
  }

  @Post(':id/toggle')
  async toggle(
    @Param('id', ParseIntPipe) id: number,
    @Request() req,
  ) {
    const userId = req.user?.user_id;
    const updatedDevice = await this.deviceService.toggleDevice(id, userId);
    return { message: 'Device toggled', data: updatedDevice };
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.deviceService.remove(+id);
  }
}