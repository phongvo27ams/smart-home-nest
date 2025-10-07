import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { EnergyConsumption } from './energy-consumption.entity';
import { CreateEnergyConsumptionDto } from './dto/create-energy-consumption.dto';
import { QueryEnergyDto } from './dto/query-energy.dto';
import { DeviceService } from '../device/device.service';

@Injectable()
export class EnergyConsumptionService {
  constructor(
    @InjectRepository(EnergyConsumption)
    private energyRepo: Repository<EnergyConsumption>,
    private deviceService: DeviceService,
  ) { }

  async create(dto: CreateEnergyConsumptionDto): Promise<EnergyConsumption> {
    const device = await this.deviceService.findOne(dto.deviceId);
    if (!device) {
      throw new NotFoundException('Device not found');
    }

    const lastRecord = await this.energyRepo.findOne({
      where: { device: { id: dto.deviceId } },
      order: { timestamp: 'DESC' },
    });

    const previousTotal = lastRecord ? lastRecord.total_power : 0;

    const newTotal = previousTotal + dto.power_value;

    const record = this.energyRepo.create({
      device,
      power_value: dto.power_value,
      total_power: newTotal,
    });

    return this.energyRepo.save(record);
  }

  async findAll(): Promise<EnergyConsumption[]> {
    return this.energyRepo.find({ relations: ['device'], order: { timestamp: 'DESC' } });
  }

  async findByDevice(deviceId: number): Promise<EnergyConsumption[]> {
    return this.energyRepo.find({
      where: { device: { id: deviceId } },
      order: { timestamp: 'DESC' },
    });
  }

  async query(dto: QueryEnergyDto) {
    const where: any = {};
    if (dto.deviceId) where.device = { id: dto.deviceId };
    if (dto.from && dto.to) where.timestamp = Between(dto.from, dto.to);

    const records = await this.energyRepo.find({ where, relations: ['device'] });
    const total = records.reduce((sum, r) => sum + r.total_power, 0);

    return { total, count: records.length, records };
  }

  async getTotalPowerAllDevices(): Promise<number> {
    const latestRecords = await this.energyRepo
      .createQueryBuilder('ec')
      .leftJoinAndSelect('ec.device', 'device')
      .where(qb => {
        const subQuery = qb.subQuery()
          .select('MAX(sub.timestamp)', 'maxTime')
          .from(EnergyConsumption, 'sub')
          .where('sub.deviceId = ec.deviceId')
          .getQuery();
        return 'ec.timestamp = ' + subQuery;
      })
      .getMany();

    const total = latestRecords.reduce((sum, record) => sum + record.total_power, 0);
    return total;
  }
}