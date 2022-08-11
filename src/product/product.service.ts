import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

// import { Product } from './interfaces/product.interface';
import { Product, ProductDocument } from './schemas/product.schema';
import { CreateProductDTO } from './dto/product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product') private productModel: Model<ProductDocument>,
  ) {}

  async create(createProductDTO: CreateProductDTO): Promise<Product> {
    const createProduct = new this.productModel(createProductDTO);
    return createProduct.save();
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find();
  }

  async findOne(id: string): Promise<Product[]> {
    return this.productModel.findById(id);
  }

  async update(
    id: string,
    createProductDTO: CreateProductDTO,
  ): Promise<Product[]> {
    return this.productModel.findByIdAndUpdate(id, createProductDTO, {
      new: true,
    });
  }

  async delete(id: string): Promise<Product[]> {
    return this.productModel.findByIdAndDelete(id);
  }
}
