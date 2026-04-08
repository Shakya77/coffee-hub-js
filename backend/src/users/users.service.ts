import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';
import {
  ROLES_REPOSITORY,
  USER_HAS_ROLES_REPOSITORY,
  USER_REPOSITORY,
} from '../../constants';
import { UserHasRole } from 'src/user-has-roles/entities/user-has-role.entity';
import slugify from 'slugify';
import { Role } from 'src/roles/entities/role.entity';
import { Sequelize } from 'sequelize-typescript';
@Injectable()
export class UsersService {
  constructor(
    @Inject('SEQUELIZE')
    private readonly sequelize: Sequelize,

    @Inject(USER_REPOSITORY)
    private userRepository: typeof User,

    @Inject(USER_HAS_ROLES_REPOSITORY)
    private userHasRolesRepository: typeof UserHasRole,

    @Inject(ROLES_REPOSITORY)
    private rolesRepository: typeof Role,
  ) {}

  async findOneEmail(email: string) {
    return await this.userRepository.findOne({
      where: { email: email },
      include: [
        {
          association: 'userHasRoles',
          include: ['role'],
        },
      ],
    });
  }

  async create(createUserDto: CreateUserDto) {
    return await this.sequelize.transaction(async (transaction) => {
      const checkMail = await this.userRepository.findOne({
        where: { email: createUserDto.email },
        transaction,
      });

      if (checkMail) {
        throw new ConflictException('Email already exists');
      }

      const role = await this.rolesRepository.findOne({
        where: { slug: createUserDto.role, isActive: true },
        transaction,
      });

      if (!role) {
        throw new NotFoundException('Invalid or inactive role');
      }

      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

      const userData = {
        name: createUserDto.name,
        email: createUserDto.email,
        password: hashedPassword,
        slug: slugify(createUserDto.name),
        isActive: createUserDto.isActive ?? true,
        verifiedAt: createUserDto.verifiedAt,
      };

      const user = await this.userRepository.create(userData as User, {
        transaction,
      });

      if (!user?.id) {
        throw new BadRequestException('Unable to create user');
      }

      await this.userHasRolesRepository.create(
        {
          userId: user.id,
          roleId: role.id,
          contactNumber: createUserDto.contactNumber,
          businessName: createUserDto.businessName,
          businessType: createUserDto.businessType,
        } as UserHasRole,
        { transaction },
      );

      return user;
    });
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
