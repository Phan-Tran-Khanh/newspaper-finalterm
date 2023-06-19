import { Injectable } from '@nestjs/common';
import { Label } from 'src/entity/label.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class LabelService {
  constructor(
    @InjectRepository(Label)
    private readonly labelRepository: Repository<Label>,
  ) {}
  create(dto: Label): Promise<Label> {
    return this.labelRepository.save(dto);
  }

  findAll(): Promise<Label[]> {
    return this.labelRepository.find();
  }

  findOne(id: number): Promise<Label | null> {
    return this.labelRepository.findOneBy({ id });
  }

  update(id: number, dto: Label): Promise<Label> {
    dto.id = id;
    return this.labelRepository.save(dto);
  }

  remove(id: number) {
    return this.labelRepository.delete(id);
  }
}
