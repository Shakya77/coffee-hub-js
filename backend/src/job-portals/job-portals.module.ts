import { Module } from '@nestjs/common';
import { JobPortalsService } from './job-portals.service';
import { JobPortalsController } from './job-portals.controller';
import { jobPortalsProviders } from './job-portals.providers';

@Module({
  controllers: [JobPortalsController],
  providers: [JobPortalsService, ...jobPortalsProviders],
})
export class JobPortalsModule {}
