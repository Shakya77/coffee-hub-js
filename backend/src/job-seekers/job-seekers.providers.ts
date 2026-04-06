import { JOB_SEEKER_REPOSITORY } from '../../constants';
import { JobSeeker } from './entities/job-seeker.entity';

export const jobSeekersProviders = [
  {
    provide: JOB_SEEKER_REPOSITORY,
    useValue: JobSeeker,
  },
];
