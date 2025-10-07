import { IsEnum, IsInt, IsOptional, IsBoolean } from 'class-validator';

export class CreateRelayControlDto {
  @IsInt()
  deviceId: number;

  @IsEnum(['ON', 'OFF'])
  action: 'ON' | 'OFF';

  @IsOptional()
  @IsInt()
  userId?: number;

  @IsOptional()
  @IsBoolean()
  isAutomatic?: boolean;
}