import { JOB_PORTAL_REPOSITORY } from '../../constants';
import { JobPortal } from './entities/job-portal.entity';

export const jobPortalsProviders = [
  {
    provide: JOB_PORTAL_REPOSITORY,
    useValue: JobPortal,
  },
];
