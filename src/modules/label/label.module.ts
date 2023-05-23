import { Module } from '@nestjs/common';
import { LabelService } from './label.service';
import { LabelController } from './label.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Label } from 'src/entity/label.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Label])],
  controllers: [LabelController],
  exports: [LabelService],
  providers: [LabelService],
})
export class LabelModule {}
