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

  async update(id: number, dto: Label): Promise<Label | null> {
    const entity = await this.labelRepository.findOneBy({ id });
    if (!entity) return null;
    Object.assign(entity, dto);
    return this.labelRepository.save(entity);
  }

  remove(id: number) {
    return this.labelRepository.delete(id);
  }
}
