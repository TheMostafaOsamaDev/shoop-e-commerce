import {
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { UserGuard } from 'src/guards/user.guard';

@ApiTags('Cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  @UseGuards(UserGuard)
  getCartItems(@Req() req: Request) {
    return this.cartService.getCartItems(req.user.id);
  }

  @Patch(':id')
  @UseGuards(UserGuard)
  addToCart(
    @Param('id') id: string,
    @Query('quantity', new DefaultValuePipe(1), ParseIntPipe) quantity: number,
    @Req() req: Request,
  ) {
    return this.cartService.addToCart(id, quantity, req);
  }
}
