import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateEnergyConsumptionDto {
  @IsNotEmpty()
  @IsNumber()
  deviceId: number;

  @IsNotEmpty()
  @IsNumber()
  power_value: number;

  @IsNotEmpty()
  @IsNumber()
  total_power: number;
}