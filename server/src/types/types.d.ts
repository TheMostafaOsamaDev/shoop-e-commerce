type WishlistResponse = {
  message: string;
  status: number;
  where: string;
  data: {
    productId: number;
  };
};

import { Request } from 'express';
import { User } from 'src/auth/entities/user.entity';

declare module 'express' {
  export interface Request {
    user?: User;
  }
}

import { ExecutionContext } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
// Property 'req' does not exist on type 'ExecutionContext'.
declare module 'context' {
  export interface ExecutionContext {
    req: Request;
  }
}
