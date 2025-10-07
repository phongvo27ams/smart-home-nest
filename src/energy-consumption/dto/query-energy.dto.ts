import { IsOptional, IsNumber, IsDateString } from 'class-validator';

export class QueryEnergyDto {
  @IsOptional()
  @IsNumber()
  deviceId?: number;

  @IsOptional()
  @IsDateString()
  from?: string;

  @IsOptional()
  @IsDateString()
  to?: string;
}