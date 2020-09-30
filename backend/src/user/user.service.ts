import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { GetUsersDto } from './dto/get-users.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/replace-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository) private userRepo: UserRepository,
  ) {}

  getAllUsers(dto: GetUsersDto) {
    const { limit, page } = dto;
    return this.userRepo.find({ take: limit, skip: (page - 1) * limit });
  }

  async getUserById(id: number) {
    const user = await this.userRepo.findOne(id);
    if (!user) throw new NotFoundException(`User with id ${id} not found`);
    return user;
  }

  async createUser(dto: CreateUserDto) {
    const user = this.userRepo.create(dto);
    try {
      await user.save();
      return user;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException(
          `Either the username ${user.username} or the email ${user.email} already exists`,
        );
      } else throw new InternalServerErrorException();
    }
  }

  async updateUser(id: number, body: UpdateUserDto) {
    const res = await this.userRepo.update(id, body);
    if (!res.affected)
      throw new NotFoundException(`User with id ${id} not found`);
  }

  async deleteUserById(id: number) {
    const res = await this.userRepo.delete(id);
    if (!res.affected)
      throw new NotFoundException(`User with id ${id} not found`);
  }
}
