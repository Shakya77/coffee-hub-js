import { Module } from '@nestjs/common';
import { JobSeekersService } from './job-seekers.service';
import { JobSeekersController } from './job-seekers.controller';
import { jobSeekersProviders } from './job-seekers.providers';

@Module({
  controllers: [JobSeekersController],
  providers: [JobSeekersService, ...jobSeekersProviders],
})
export class JobSeekersModule {}
