import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateSensorDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsNumber()
  deviceId: number;
}