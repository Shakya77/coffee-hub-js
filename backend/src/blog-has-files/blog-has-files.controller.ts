import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BlogHasFilesService } from './blog-has-files.service';
import { CreateBlogHasFileDto } from './dto/create-blog-has-file.dto';
import { UpdateBlogHasFileDto } from './dto/update-blog-has-file.dto';

@Controller('blog-has-files')
export class BlogHasFilesController {
  constructor(private readonly blogHasFilesService: BlogHasFilesService) {}

  @Post()
  create(@Body() createBlogHasFileDto: CreateBlogHasFileDto) {
    return this.blogHasFilesService.create(createBlogHasFileDto);
  }

  @Get()
  findAll() {
    return this.blogHasFilesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blogHasFilesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBlogHasFileDto: UpdateBlogHasFileDto,
  ) {
    return this.blogHasFilesService.update(+id, updateBlogHasFileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blogHasFilesService.remove(+id);
  }
}
