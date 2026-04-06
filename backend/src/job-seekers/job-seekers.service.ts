import { Inject, Injectable } from '@nestjs/common';
import { CreateJobSeekerDto } from './dto/create-job-seeker.dto';
import { UpdateJobSeekerDto } from './dto/update-job-seeker.dto';
import { JOB_SEEKER_REPOSITORY } from '../../constants';
import { JobSeeker } from './entities/job-seeker.entity';

@Injectable()
export class JobSeekersService {
  constructor(
    @Inject(JOB_SEEKER_REPOSITORY)
    private jobSeekerRepository: typeof JobSeeker,
  ) {}

  async create(createJobSeekerDto: CreateJobSeekerDto) {
    return await this.jobSeekerRepository.create(
      createJobSeekerDto as any as JobSeeker,
    );
  }

  async findAll() {
    return await this.jobSeekerRepository.findAll();
  }

  async findOne(id: number) {
    return await this.jobSeekerRepository.findByPk(id);
  }

  async update(id: number, updateJobSeekerDto: UpdateJobSeekerDto) {
    const jobSeeker = await this.jobSeekerRepository.findByPk(id);
    if (!jobSeeker) {
      throw new Error('JobSeeker not found');
    }

    return await jobSeeker.update(updateJobSeekerDto as any as JobSeeker);
  }

  async remove(id: number) {
    const jobSeeker = await this.jobSeekerRepository.findByPk(id);
    if (!jobSeeker) {
      throw new Error('JobSeeker not found');
    }

    return await jobSeeker.destroy();
  }
}
