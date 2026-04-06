import { PartialType } from '@nestjs/mapped-types';
import { CreateBlogHasFileDto } from './create-blog-has-file.dto';

export class UpdateBlogHasFileDto extends PartialType(CreateBlogHasFileDto) {}
