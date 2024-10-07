import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as jwt from 'jsonwebtoken';
import { USER_REPOSITORY } from 'src/auth/entities/user.provider';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(@Inject(USER_REPOSITORY) private userRepository: typeof User) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Check if it's a GraphQL request
    const ctx = GqlExecutionContext.create(context);
    const gqlRequest = ctx.getContext().req;

    // If not GraphQL, fall back to HTTP
    const request = gqlRequest || context.switchToHttp().getRequest();
    const authorization =
      request.headers['authorization'] ||
      request.authorization ||
      request.Authorization;

    if (!authorization) {
      throw new UnauthorizedException('Unauthorized');
    }

    const token = authorization.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Unauthorized');
    }

    const decoded: any = jwt.verify(token, process.env.AUTHORIZATION_SECRET);

    if (!decoded?.email) {
      throw new UnauthorizedException('Unauthorized');
    }

    const user = await this.userRepository.findOne({
      where: { email: decoded.email },
    });

    if (!user) {
      throw new UnauthorizedException('Unauthorized');
    }

    request.user = user.dataValues;

    return true;
  }
}
