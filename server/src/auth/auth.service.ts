import { Inject, Injectable } from '@nestjs/common';
import { CreateAuthInput } from './input/create-auth.input';
import { UpdateAuthInput } from './input/update-auth.input';
import { User } from './entities/user.entity';
import { USER_REPOSITORY } from './entities/user.provider';
import { generateUsername } from 'src/utils/generate-username';
import * as bcrypt from 'bcryptjs';
import { hashPassword } from 'src/utils/hash-password';
import { LoginAuthInput } from './input/login-auth.input';

@Injectable()
export class AuthService {
  constructor(@Inject(USER_REPOSITORY) private userRepository: typeof User) {}

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

  async logIn(logInAuthInput: LoginAuthInput) {
    const user = await this.userRepository.findOne({
      where: { email: logInAuthInput.email },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(
      logInAuthInput.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    return {
      ...user.toJSON(),
      password: null,
    };
  }
}
