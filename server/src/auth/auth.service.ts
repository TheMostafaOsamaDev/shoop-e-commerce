import { SignUpAuthDto } from './dto/sign-up-auth.dto';
import {
  Inject,
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { USER_REPOSITORY } from './entities/user.provider';
import { generateUsername } from 'src/utils/generate-username';
import * as bcrypt from 'bcryptjs';
import { hashPassword } from 'src/utils/hash-password';
import { ADMIN_REPOSITORY } from './entities/admin.provider';
import { Admin } from './entities/admin.entity';
import { LogInAuthDto } from './dto/login-auth-dto';
import { UserDto } from './dto/user.dto';
import { LogInAdminDto } from './dto/login-admin.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(USER_REPOSITORY) private userRepository: typeof User,
    @Inject(ADMIN_REPOSITORY) private adminRepository: typeof Admin,
  ) {}

  async signUp(signUpAuthDto: SignUpAuthDto) {
    let user = await this.userRepository.findOne({
      where: { email: signUpAuthDto.email },
    });

    if (user) {
      throw new BadRequestException('Email already exists');
    }

    const hashedPassword = await hashPassword(signUpAuthDto.password);
    const username = generateUsername(signUpAuthDto.name);

    user = await this.userRepository.create({
      ...signUpAuthDto,
      password: hashedPassword,
      username,
    });

    console.log(user);

    return {
      ...user.toJSON(),
      password: null,
    };
  }

  async logIn(logInAuthDto: LogInAuthDto): Promise<UserDto> {
    const user = await this.userRepository.findOne({
      where: { email: logInAuthDto.email },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(
      logInAuthDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new BadRequestException('Invalid password');
    }

    return {
      ...user.toJSON(),
      password: null,
    };
  }

  async logInAdmin(logInAdminDto: LogInAdminDto) {
    const { email, passkey } = logInAdminDto;

    const isValidPasskey = passkey === process.env.ADMIN_PASSKEY;

    if (!isValidPasskey) {
      throw new NotFoundException('Admin not found');
    }

    let admin = await this.adminRepository.findOne({
      where: { email },
    });

    if (!admin) {
      admin = await this.adminRepository.create({
        email,
        passkey,
        username: generateUsername(email, true),
      });
    }

    return {
      ...admin.toJSON(),
      passkey: null,
    };
  }
}
