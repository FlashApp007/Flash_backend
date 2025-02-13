import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '../modules/auth/auth.module';
import { LookupCodesModule } from '../modules/lookupcodes/lookupcodes.module';

@Module({
  imports: [AuthModule, LookupCodesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
