import { Inject, Injectable } from '@nestjs/common';
import { CreateDiseaseDto } from './dto/create-disease.dto';
import { UpdateDiseaseDto } from './dto/update-disease.dto';
import { DISEASE_REPOSITORY } from '../../constants';
import { Disease } from './entities/disease.entity';

@Injectable()
export class DiseasesService {
  constructor(
    @Inject(DISEASE_REPOSITORY)
    private diseaseRepository: typeof Disease,
  ) {}

  async create(createDiseaseDto: CreateDiseaseDto) {
    return await this.diseaseRepository.create(
      createDiseaseDto as any as Disease,
    );
  }

  async findAll() {
    return await this.diseaseRepository.findAll();
  }

  async findOne(id: number) {
    return await this.diseaseRepository.findByPk(id);
  }

  async update(id: number, updateDiseaseDto: UpdateDiseaseDto) {
    const disease = await this.diseaseRepository.findByPk(id);
    if (!disease) {
      throw new Error('Disease not found');
    }

    return await disease.update(updateDiseaseDto as any as Disease);
  }

  async remove(id: number) {
    const disease = await this.diseaseRepository.findByPk(id);
    if (!disease) {
      throw new Error('Disease not found');
    }

    return await disease.destroy();
  }
}
