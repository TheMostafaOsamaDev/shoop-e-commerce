import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as jwt from 'jsonwebtoken';
import { USER_REPOSITORY } from 'src/auth/entities/user.provider';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class JwtDecoderInterceptor implements NestInterceptor {
  constructor(@Inject(USER_REPOSITORY) private userRepository: typeof User) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
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

    if (token) {
      try {
        // Promisify jwt.verify
        const decoded: any = await new Promise((resolve, reject) => {
          jwt.verify(
            token,
            process.env.AUTHORIZATION_SECRET,
            (err, decoded) => {
              if (err) {
                return reject(err);
              }
              resolve(decoded);
            },
          );
        });

        if (decoded) {
          const user = await this.userRepository.findOne({
            where: { email: decoded.email },
          });

          if (user) {
            request.user = user.dataValues; // Store user in the request
          }
        }
      } catch (error) {}
    }

    return next.handle().pipe();
  }
}
