import { PartialType } from '@nestjs/mapped-types';
import { CreateTagUsedDto } from './create-tag-used.dto';

export class UpdateTagUsedDto extends PartialType(CreateTagUsedDto) {}
