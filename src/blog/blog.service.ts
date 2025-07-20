import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BlogEntity } from './entities/blog.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(BlogEntity)
    private readonly blogRepo: Repository<BlogEntity>,
  ) {}
  async create(createBlogDto: CreateBlogDto) {
    try {
      const newBlog = this.blogRepo.create(createBlogDto);
      await this.blogRepo.save(newBlog);
      return {
        message: 'success',
        statusCode: 201,
        data: newBlog,
      };
    } catch (error) {
      throw new HttpException(error?.message, error?.status);
    }
  }

  async findAll() {
    try {
      const blogs = await this.blogRepo.find();
      return {
        message: 'success',
        statusCode: 200,
        data: blogs,
      };
    } catch (error) {
      throw new HttpException(error?.message, error?.status);
    }
  }

  async findOne(id: number) {
    try {
      const blog = await this.findBlogById(id);
      return {
        message: 'success',
        statusCode: 200,
        data: blog,
      };
    } catch (error) {
      throw new HttpException(error?.message, error?.status);
    }
  }

  async update(id: number, updateBlogDto: UpdateBlogDto) {
    try {
      await this.findBlogById(id);
      const { affected } = await this.blogRepo.update(id, updateBlogDto);

      if (!affected)
        throw new BadRequestException(`Blog with ID ${id} not updated`);

      const updatedBlog = await this.findBlogById(id);
      return {
        message: 'success',
        statusCode: 200,
        data: updatedBlog,
      };
    } catch (error) {
      throw new HttpException(error?.message, error?.status);
    }
  }

  async remove(id: number) {
    try {
      await this.findBlogById(id);
      await this.blogRepo.delete(id);
      return {
        message: 'success',
        statusCode: 200,
        data: {},
      };
    } catch (error) {
      throw new HttpException(error?.message, error?.status);
    }
  }

  private async findBlogById(id: number) {
    try {
      const blog = await this.blogRepo.findOne({ where: { id } });
      if (!blog) throw new NotFoundException(`Blog with ${id} not found`);
      return blog;
    } catch (error) {
      throw new HttpException(error?.message, error?.status);
    }
  }
}
