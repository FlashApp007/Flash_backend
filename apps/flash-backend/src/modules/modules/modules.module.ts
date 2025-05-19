import { Module } from '@nestjs/common';
import { ModulesService } from '../../controller/modules/modules.service';

@Module({
  providers: [ModulesService],
  exports: [ModulesService]
})
export class ModulesModule {}
