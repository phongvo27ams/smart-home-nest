import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Device } from './device.entity';

import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';

import { RelayControlService } from '../relay-control/relay-control.service';

@Injectable()
export class DeviceService {
  constructor(
    @InjectRepository(Device)
    private deviceRepository: Repository<Device>,
    
    @Inject(forwardRef(() => RelayControlService))
    private relayControlService: RelayControlService,
  ) { }

  async create(createDeviceDto: CreateDeviceDto): Promise<Device> {
    const device = this.deviceRepository.create(createDeviceDto);
    return await this.deviceRepository.save(device);
  }

  async findAll(): Promise<Device[]> {
    return await this.deviceRepository.find();
  }

  async findOne(id: number): Promise<Device> {
    const device = await this.deviceRepository.findOne({ where: { id } });
    if (!device) throw new NotFoundException(`Device #${id} not found`);
    return device;
  }

  async update(id: number, updateDeviceDto: UpdateDeviceDto): Promise<Device> {
    const device = await this.findOne(id);
    Object.assign(device, updateDeviceDto);
    return await this.deviceRepository.save(device);
  }

  async remove(id: number): Promise<void> {
    const device = await this.findOne(id);
    await this.deviceRepository.remove(device);
  }

  async toggleDevice(deviceId: number, userId?: number) {
    const device = await this.findOne(deviceId);
    device.isOn = !device.isOn;

    await this.deviceRepository.save(device);

    await this.relayControlService.create({
      deviceId: device.id,
      userId,
      action: device.isOn ? 'ON' : 'OFF',
      isAutomatic: false,
    });

    return device;
  }
}