import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';

@Injectable()
export class JwtDecoderInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    // graphql request
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;
    const authorization = req.headers.authorization || req.authorization;
    console.log(authorization);

    return next.handle();
  }
}
