import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { JobPortalsService } from './job-portals.service';
import { CreateJobPortalDto } from './dto/create-job-portal.dto';
import { UpdateJobPortalDto } from './dto/update-job-portal.dto';

@Controller('job-portals')
export class JobPortalsController {
  constructor(private readonly jobPortalsService: JobPortalsService) {}

  @Post()
  create(@Body() createJobPortalDto: CreateJobPortalDto) {
    return this.jobPortalsService.create(createJobPortalDto);
  }

  @Get()
  findAll() {
    return this.jobPortalsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobPortalsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateJobPortalDto: UpdateJobPortalDto,
  ) {
    return this.jobPortalsService.update(+id, updateJobPortalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobPortalsService.remove(+id);
  }
}
