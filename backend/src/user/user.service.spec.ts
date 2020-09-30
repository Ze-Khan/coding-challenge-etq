import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { isArray } from 'class-validator';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUsersDto } from './dto/get-users.dto';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

const mockUserRepo = () => ({
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
});
describe('UserService', () => {
  let userService: UserService;
  let userRepo: ReturnType<typeof mockUserRepo>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: UserRepository, useFactory: mockUserRepo },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepo = module.get(UserRepository);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('getAllUsers', () => {
    it('should get array of users successfully', async () => {
      userRepo.find.mockResolvedValue(['user1', 'user2']);
      const dto: GetUsersDto = { limit: 10, page: 1 };
      const users = await userService.getAllUsers(dto);
      expect(isArray(users)).toEqual(true);
      expect(userRepo.find).toBeCalledWith({
        take: dto.limit,
        skip: (dto.page - 1) * dto.limit,
      });
    });
  });

  describe('getUserById', () => {
    it('should get 1 user', async () => {
      userRepo.findOne.mockResolvedValue('user');
      const user = await userService.getUserById(1);
      expect(user).toEqual('user');
    });

    it("should throw not found error if user doesn't exist", async () => {
      userRepo.findOne.mockResolvedValue(null);
      expect(userService.getUserById(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('createUser', () => {
    const dto: CreateUserDto = {
      username: 'erwersdfsdf',
      email: 'asdasd@asdasd.com',
      phone: '011123123123',
      hobbies: ['asda', 'qwebdfg'],
      skillsets: ['asdasdcxv', 'xcvsrfwsadf'],
    };

    it('should return the user created', async () => {
      userRepo.create.mockReturnValue({
        save: jest.fn().mockResolvedValue('user'),
      });
      expect(userService.createUser(dto)).resolves.not.toThrow();
    });

    it('should return a conflict error if postgress error code is 23505', async () => {
      userRepo.create.mockReturnValue({
        save: jest.fn().mockRejectedValue({ code: '23505' }),
      });
      expect(userService.createUser(dto)).rejects.toThrow(ConflictException);
    });

    it('should return an internal server error if other error occured', async () => {
      userRepo.create.mockReturnValue({
        save: jest.fn().mockRejectedValue(Error()),
      });
      expect(userService.createUser(dto)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('updateUser', () => {
    it('should update successfully', async () => {
      userRepo.update.mockResolvedValue({ affected: 1 });
      expect(userService.updateUser(1, {})).resolves.not.toThrow();
    });

    it('should throw a not found error if no entry was updated', async () => {
      userRepo.update.mockResolvedValue({ affected: 0 });
      expect(userService.updateUser(1, {})).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteUserById', () => {
    it('should delete successfully', async () => {
      userRepo.delete.mockResolvedValue({ affected: 1 });
      expect(userService.deleteUserById(1)).resolves.not.toThrow();
    });

    it('should throw a not found error if no entry was updated', async () => {
      userRepo.delete.mockResolvedValue({ affected: 0 });
      expect(userService.deleteUserById(1)).rejects.toThrow(NotFoundException);
    });
  });
});
