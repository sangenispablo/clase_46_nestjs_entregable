import {
  Controller,
  Post,
  Res,
  HttpStatus,
  Body,
  Get,
  Param,
  NotFoundException,
  Put,
  Delete,
} from '@nestjs/common';
import { Response } from 'express';

import { CreateProductDTO } from './dto/product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  async createProduct(
    @Res() res: Response,
    @Body() createProductDTO: CreateProductDTO,
  ) {
    const product = await this.productService.create(createProductDTO);
    return res
      .status(HttpStatus.CREATED)
      .json({ msg: 'Created', data: product });
  }

  @Get()
  async allProduct(@Res() res: Response) {
    const products = await this.productService.findAll();
    return res.status(HttpStatus.OK).json({ msg: 'Ok', data: products });
  }

  @Get(':id')
  async oneProduct(@Res() res: Response, @Param('id') productId: string) {
    const product = await this.productService.findOne(productId);
    if (!product) {
      throw new NotFoundException('El id no se encuentra en la base de datos');
    }
    return res.status(HttpStatus.OK).json({ msg: 'Ok', data: product });
  }

  @Put(':id')
  async updateProduct(
    @Res() res: Response,
    @Param('id') productId: string,
    @Body() createProductDTO: CreateProductDTO,
  ) {
    const product = await this.productService.update(
      productId,
      createProductDTO,
    );
    if (!product) {
      throw new NotFoundException('El id no se encuentra en la base de datos');
    }
    return res.status(HttpStatus.OK).json({ msg: 'Updated', data: product });
  }

  @Delete(':id')
  async deleteProduct(@Res() res: Response, @Param('id') productId: string) {
    const product = await this.productService.delete(productId);
    if (!product) {
      throw new NotFoundException('El id no se encuentra en la base de datos');
    }
    return res.status(HttpStatus.OK).json({ msg: 'Deleted', data: product });
  }
}
