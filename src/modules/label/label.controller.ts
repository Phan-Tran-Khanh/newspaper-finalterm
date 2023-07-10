import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { LabelService } from './label.service';
import { Protected } from 'src/decorator/protected.decorator';
import { Label } from 'src/entity/label.entity';

@Controller('label')
// @Protected('Admin')
export class LabelController {
  constructor(private readonly labelService: LabelService) {}

  @Post()
  create(@Body() dto: Label | any) {
    if (dto.isDelete) return this.labelService.remove(dto.id);
    if (dto?.id !== undefined) return this.labelService.update(dto.id, dto);
    return this.labelService.create(dto);
  }

  @Get()
  findAll() {
    return this.labelService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.labelService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: Label) {
    return this.labelService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.labelService.remove(+id);
  }
}
