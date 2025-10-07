import { PartialType } from '@nestjs/mapped-types';
import { CreateSensorDto } from './create-sensor.dto';
import { IsOptional, IsNumber } from 'class-validator';

export class UpdateSensorDto extends PartialType(CreateSensorDto) {
  @IsOptional()
  @IsNumber()
  value?: number;
}