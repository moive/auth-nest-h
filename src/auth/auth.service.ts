import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { User } from './entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const newUser = new this.userModel(createUserDto);
      // TODO: 1. Encrypt the password
      // TODO: 2. Save the user data
      // TODO: 3. Generate the JWT

      return await newUser.save();
    } catch (error) {
      // console.log(error.code);

      if (error.code === 11000) {
        throw new BadRequestException(`${createUserDto.email} already exists!`);
      }
      throw new InternalServerErrorException('Internal Server Error');
    }
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
