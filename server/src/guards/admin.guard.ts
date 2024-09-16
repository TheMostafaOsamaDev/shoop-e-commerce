import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // Check if it's a GraphQL request
    const ctx = GqlExecutionContext.create(context);
    const gqlRequest = ctx.getContext().req;

    // If not GraphQL, fall back to HTTP
    const request = gqlRequest || context.switchToHttp().getRequest();
    const authorization = request.headers['authorization'];

    console.log(request.headers);

    console.log(authorization);

    return true;
  }
}
