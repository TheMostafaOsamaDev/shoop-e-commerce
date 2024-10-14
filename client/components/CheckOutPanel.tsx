import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Button } from "./ui/button";
import { Cart } from "@/types/cart";

const CheckOutPanel = ({ cartItems }: { cartItems: Cart[] }) => {
  let totalPrice: number = 0;

  if (cartItems.length) {
    totalPrice = cartItems.reduce((acc, item) => {
      return acc + item.product.price * item.quantity;
    }, 0);
  }

  return (
    <div className="lg:sticky lg:top-0 pt-4 flex flex-col gap-6">
      <Card>
        <CardHeader className="p-4">
          <CardTitle className="text-lg">Apply Coupon</CardTitle>
          <CardDescription className="text-xs font-medium">
            Use coupons to get discounts on your purchase.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center gap-2 p-4">
          <Input type="text" placeholder="code" />

          <Button>Apply</Button>
        </CardContent>
      </Card>

      <Card className="p-4 space-y-6">
        <CardHeader className="p-0">
          <CardTitle className="text-lg">Total</CardTitle>
        </CardHeader>

        <Separator className="w-full h-[0.8px]" />
        {/* TODO: Add discount */}
        <CardContent className="p-0 space-y-3">
          <div className="font-medium flex items-center justify-between">
            <span>Total</span>

            <span>$ {totalPrice}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Delivery</span>

            <span>$ 14.00</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Discount</span>

            <span>-${0}</span>
          </div>
        </CardContent>

        <Separator className="w-full h-[0.8px]" />

        <CardFooter className="p-0 flex flex-col space-y-3">
          <div className="font-medium flex items-center w-full justify-between">
            <span>Total</span>

            <span>${totalPrice + 14}</span>
          </div>

          <Button className="w-full">Checkout</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CheckOutPanel;
