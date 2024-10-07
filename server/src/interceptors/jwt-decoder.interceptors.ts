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
    // If not GraphQL, fall back to HTTP
    const request = context.switchToHttp().getRequest();

    const authorization =
      request.headers['authorization'] ||
      request.authorization ||
      request.Authorization;

    console.log(authorization);

    if (!authorization) {
      return next.handle().pipe();
    }

    const token = authorization.split(' ')[1];

    console.log('Token: ', token);

    if (token) {
      try {
        // Promisify jwt.verify
        const decoded: any = await new Promise((resolve, reject) => {
          jwt.verify(
            token,
            process.env.AUTHORIZATION_SECRET,
            (err, decoded) => {
              console.log(err, decoded);
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
      } catch (error) {
        return next.handle().pipe();
      }
    }

    return next.handle().pipe();
  }
}
