import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductHasImagesService } from './product-has-images.service';
import { CreateProductHasImageDto } from './dto/create-product-has-image.dto';
import { UpdateProductHasImageDto } from './dto/update-product-has-image.dto';

@Controller('product-has-images')
export class ProductHasImagesController {
  constructor(
    private readonly productHasImagesService: ProductHasImagesService,
  ) {}

  @Post()
  create(@Body() createProductHasImageDto: CreateProductHasImageDto) {
    return this.productHasImagesService.create(createProductHasImageDto);
  }

  @Get()
  findAll() {
    return this.productHasImagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productHasImagesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductHasImageDto: UpdateProductHasImageDto,
  ) {
    return this.productHasImagesService.update(+id, updateProductHasImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productHasImagesService.remove(+id);
  }
}
