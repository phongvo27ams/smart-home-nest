import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sensor } from './sensor.entity';
import { CreateSensorDto } from './dto/create-sensor.dto';
import { UpdateSensorDto } from './dto/update-sensor.dto';
import { DeviceService } from '../device/device.service';

@Injectable()
export class SensorService {
  constructor(
    @InjectRepository(Sensor)
    private sensorRepo: Repository<Sensor>,
    private deviceService: DeviceService,
  ) { }

  async create(dto: CreateSensorDto): Promise<Sensor> {
    const device = await this.deviceService.findOne(dto.deviceId);
    const sensor = this.sensorRepo.create({
      name: dto.name,
      type: dto.type,
      device
    });
    return this.sensorRepo.save(sensor);
  }

  async findAll(): Promise<Sensor[]> {
    return this.sensorRepo.find({ relations: ['device'] });
  }

  async findOne(id: number): Promise<Sensor> {
    const sensor = await this.sensorRepo.findOne({ where: { id }, relations: ['device'] });
    if (!sensor) throw new NotFoundException(`Sensor #${id} not found`);
    return sensor;
  }

  async update(id: number, dto: UpdateSensorDto): Promise<Sensor> {
    const sensor = await this.findOne(id);
    Object.assign(sensor, dto);
    return this.sensorRepo.save(sensor);
  }

  async remove(id: number): Promise<void> {
    const sensor = await this.findOne(id);
    await this.sensorRepo.remove(sensor);
  }

  async updateValue(id: number, value: number): Promise<Sensor> {
    const sensor = await this.findOne(id);
    sensor.value = value;
    return this.sensorRepo.save(sensor);
  }
}