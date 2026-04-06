import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TagUsedService } from './tag-used.service';
import { CreateTagUsedDto } from './dto/create-tag-used.dto';
import { UpdateTagUsedDto } from './dto/update-tag-used.dto';

@Controller('tag-used')
export class TagUsedController {
  constructor(private readonly tagUsedService: TagUsedService) {}

  @Post()
  create(@Body() createTagUsedDto: CreateTagUsedDto) {
    return this.tagUsedService.create(createTagUsedDto);
  }

  @Get()
  findAll() {
    return this.tagUsedService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tagUsedService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTagUsedDto: UpdateTagUsedDto) {
    return this.tagUsedService.update(+id, updateTagUsedDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tagUsedService.remove(+id);
  }
}
