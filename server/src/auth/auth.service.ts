import {
  Inject,
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateAuthInput } from './input/create-auth.input';
import { User } from './entities/user.entity';
import { USER_REPOSITORY } from './entities/user.provider';
import { generateUsername } from 'src/utils/generate-username';
import * as bcrypt from 'bcryptjs';
import { hashPassword } from 'src/utils/hash-password';
import { LoginAuthInput } from './input/login-auth.input';
import { AdminAuthInput } from './input/admin-auth.input';
import { ADMIN_REPOSITORY } from './entities/admin.provider';
import { Admin } from './entities/admin.entity';
import { LogInAuthDto } from './dto/login-auth-dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(USER_REPOSITORY) private userRepository: typeof User,
    @Inject(ADMIN_REPOSITORY) private adminRepository: typeof Admin,
  ) {}

  async createUser(createAuthDto: CreateAuthInput) {
    let user = await this.userRepository.findOne({
      where: { email: createAuthDto.email },
    });

    if (user) {
      throw new Error('Email already exists');
    }

    const hashedPassword = await hashPassword(createAuthDto.password);
    const username = generateUsername(createAuthDto.name);

    user = await this.userRepository.create({
      ...createAuthDto,
      password: hashedPassword,
      username,
    });

    return {
      ...user.toJSON(),
      password: null,
    };
  }

  async logIn(logInAuthDto: LogInAuthDto) {
    console.log(logInAuthDto);

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

  async adminAuth(adminAuthInput: AdminAuthInput) {
    const isValidPasskey = adminAuthInput.passkey === process.env.ADMIN_PASSKEY;

    if (!isValidPasskey) {
      throw new NotFoundException('Admin not found');
    }

    let admin = await this.adminRepository.findOne({
      where: { email: adminAuthInput.email },
    });

    if (!admin) {
      admin = await this.adminRepository.create({
        email: adminAuthInput.email,
        passkey: adminAuthInput.passkey,
        username: generateUsername(adminAuthInput.email, true),
      });
    }

    return {
      ...admin.toJSON(),
      passkey: null,
    };
  }
}
