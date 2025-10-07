import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RelayControl } from './relay-control.entity';
import { RelayControlService } from './relay-control.service';
import { RelayControlController } from './relay-control.controller';
import { DeviceModule } from '../device/device.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([RelayControl]),
    forwardRef(() => DeviceModule),
    UserModule,
  ],
  providers: [RelayControlService],
  controllers: [RelayControlController],
  exports: [RelayControlService],
})

export class RelayControlModule { }