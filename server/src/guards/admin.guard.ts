import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';
import { ADMIN_REPOSITORY } from 'src/auth/entities/admin.provider';
import { Admin } from 'src/auth/entities/admin.entity';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    @Inject(ADMIN_REPOSITORY) private adminRepository: typeof Admin,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // Check if it's a GraphQL request
    const ctx = GqlExecutionContext.create(context);
    const gqlRequest = ctx.getContext().req;

    // If not GraphQL, fall back to HTTP
    const request = gqlRequest || context.switchToHttp().getRequest();
    const authorization =
      request.headers['authorization'] || request.authorization;

    if (!authorization) {
      throw new Error('Unauthorized');
    }

    const token = authorization.split(' ')[1];

    if (!token) {
      throw new Error('Unauthorized');
    }

    const decoded: any = jwt.verify(token, process.env.AUTHORIZATION_SECRET);

    if (!decoded?.email) {
      throw new Error('Unauthorized');
    }

    const admin = this.adminRepository.findOne({
      where: { email: decoded.email },
    });

    if (!admin) {
      throw new Error('Unauthorized');
    }

    request.user = admin;

    return true;
  }
}
