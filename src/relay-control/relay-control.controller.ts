import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { RelayControlService } from './relay-control.service';
import { CreateRelayControlDto } from './dto/create-relay-control.dto';

@Controller('relay-controls')
export class RelayControlController {
  constructor(private readonly relayService: RelayControlService) { }

  @Post()
  async create(@Body() dto: CreateRelayControlDto) {
    return this.relayService.create(dto);
  }

  @Get()
  async findAll() {
    return this.relayService.findAll();
  }

  @Get('device/:deviceId')
  async findByDevice(@Param('deviceId') deviceId: number) {
    return this.relayService.findByDevice(deviceId);
  }
}