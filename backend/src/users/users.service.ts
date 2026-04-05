import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';
@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: typeof User,
  ) {}

  async findOneEmail(email: string) {
    return await this.userRepository.findOne({
      where: { email: email },
      include: ['userHasRoles'],
    });
  }

  async create(createUserDto: CreateUserDto) {
    const checkMail = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (checkMail) {
      throw new Error('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const userData = {
      ...createUserDto,
      password: hashedPassword,
    };

    const user = this.userRepository.create(userData as any as User);

    return user;
  }

  async findAll() {
    const data = await this.userRepository.findAll();

    return data;
  }

  async findOne(id: number) {
    return this.userRepository.findByPk(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findByPk(id);

    if (!user) {
      throw new Error('User not found');
    }

    const data = await this.userRepository.update(
      updateUserDto as any as User,
      {
        where: { id },
      },
    );

    return data;
  }

  async remove(id: number) {
    const user = await this.userRepository.findByPk(id);

    if (!user) {
      throw new Error('User not found');
    }

    return user.destroy();
  }
}
