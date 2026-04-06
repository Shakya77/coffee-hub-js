import { Inject, Injectable } from '@nestjs/common';
import { CreateJobPortalDto } from './dto/create-job-portal.dto';
import { UpdateJobPortalDto } from './dto/update-job-portal.dto';
import { JOB_PORTAL_REPOSITORY } from '../../constants';
import { JobPortal } from './entities/job-portal.entity';

@Injectable()
export class JobPortalsService {
  constructor(
    @Inject(JOB_PORTAL_REPOSITORY)
    private jobPortalRepository: typeof JobPortal,
  ) {}

  async create(createJobPortalDto: CreateJobPortalDto) {
    return await this.jobPortalRepository.create(
      createJobPortalDto as any as JobPortal,
    );
  }

  async findAll() {
    return await this.jobPortalRepository.findAll();
  }

  async findOne(id: number) {
    return await this.jobPortalRepository.findByPk(id);
  }

  async update(id: number, updateJobPortalDto: UpdateJobPortalDto) {
    const jobPortal = await this.jobPortalRepository.findByPk(id);
    if (!jobPortal) {
      throw new Error('JobPortal not found');
    }

    return await jobPortal.update(updateJobPortalDto as any as JobPortal);
  }

  async remove(id: number) {
    const jobPortal = await this.jobPortalRepository.findByPk(id);
    if (!jobPortal) {
      throw new Error('JobPortal not found');
    }

    return await jobPortal.destroy();
  }
}
