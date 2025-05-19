import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '../modules/auth/auth.module';
import { LookupCodesModule } from '../modules/lookupcodes/lookupcodes.module';
import { ModulesModule } from '../modules/modules/modules.module';

@Module({
  imports: [AuthModule, LookupCodesModule, ModulesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
