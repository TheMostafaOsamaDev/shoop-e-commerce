import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Cart } from "@/types/cart";
import Image from "next/image";
import { getAssetsUrl } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { signal } from "@preact/signals";
import DeleteCartProduct from "./DeleteCartProduct";

const quantitySignal = signal<number>();

const CartItemsTable = ({ cartItems }: { cartItems: Cart[] }) => {
  return (
    <Table className="table-responsive">
      <TableCaption>A list of your cart items.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Preview</TableHead>
          <TableHead>Title</TableHead>
          <TableHead className="text-center">Quantity</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Delete</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {cartItems.map((item) => {
          const p = item.product;

          return (
            <TableRow key={item.id}>
              <TableCell className="cart-image">
                <Image
                  src={getAssetsUrl(
                    p.images[0].url,
                    p.images[0].isExternal,
                    "products"
                  )}
                  className="lg:size-[60px] w-fit object-contain"
                  width={550}
                  height={500}
                  alt="product image"
                />
              </TableCell>
              <TableCell className="font-medium">{p.title}</TableCell>
              <TableCell>
                <div className="gap-3 flex items-center cart-product-quantity">
                  <Button
                    className="p-2 px-3 h-fit"
                    variant={"secondary"}
                    disabled={item.quantity === 1}
                  >
                    -
                  </Button>
                  <span className="font-medium text-center w-full lg:w-[30px]">
                    {item.quantity}
                  </span>
                  <Button
                    className="p-2 px-3 h-fit"
                    variant={"secondary"}
                    disabled={item.quantity === p.quantity}
                  >
                    +
                  </Button>
                </div>
              </TableCell>
              <TableCell>
                <span className="text-nowrap font-medium price">
                  $ {p.price}
                </span>
              </TableCell>

              <TableCell>
                <DeleteCartProduct productId={item.id.toString()} />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default CartItemsTable;
