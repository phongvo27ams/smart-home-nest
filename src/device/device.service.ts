import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Device } from './device.entity';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';

@Injectable()
export class DeviceService {
  constructor(
    @InjectRepository(Device)
    private deviceRepository: Repository<Device>,
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

  async toggleStatus(id: number): Promise<Device> {
    const device = await this.findOne(id);
    device.isOn = !device.isOn;
    return await this.deviceRepository.save(device);
  }
}