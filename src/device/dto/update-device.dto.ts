import { PartialType } from '@nestjs/mapped-types';
import { CreateDeviceDto } from './create-device.dto';
import { IsOptional, IsBoolean } from 'class-validator';

export class UpdateDeviceDto extends PartialType(CreateDeviceDto) {
  @IsOptional()
  @IsBoolean()
  isOn?: boolean;
}