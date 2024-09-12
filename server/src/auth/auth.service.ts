import { Inject, Injectable } from '@nestjs/common';
import { CreateAuthInput } from './dto/create-auth.input';
import { UpdateAuthInput } from './dto/update-auth.input';
import { User } from './entities/user.entity';
import { USER_REPOSITORY } from './entities/user.provider';
import { generateUsername } from 'src/utils/generate-username';
import * as bcrypt from 'bcryptjs';
import { hashPassword } from 'src/utils/hash-password';

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
}
