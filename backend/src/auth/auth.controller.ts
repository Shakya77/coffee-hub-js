import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserRole } from './decorators/user-role.decorator';
import { AllowedRoles } from './decorators/roles.decorator';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from 'src/roles/entities/role.entity';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Public()
  @Post('login')
  async login(@Body() loginDto: CreateUserDto, @Request() req) {
    const ipAddress =
      req.ip || req.connection.remoteAddress || req.socket.remoteAddress;
    const userAgent = req.headers['user-agent'];
    return this.authService.login(loginDto, ipAddress, userAgent);
  }

  @Post('/register')
  @Public()
  async register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  async getProfile(@Request() req, @UserRole() role: string) {
    return {
      ...req.user,
      role,
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('role')
  getRole(@UserRole() role) {
    return { role };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('roles')
  async getRoles(@Request() req) {
    return this.authService.getUserRoles(req.user.id);
  }

  @AllowedRoles(Roles.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get('admin-only')
  getAdminOnlyData(@Request() req) {
    return { message: 'Admin action allowed', user: req.user };
  }
}
