import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
// import { signal } from "@preact/signals";
import { Skeleton } from "../ui/skeleton";

// const quantitySignal = signal<number>();

const CartItemsTableSkeleton = ({ skeletonSize }: { skeletonSize: number }) => {
  const skeletonArray = Array.from({ length: skeletonSize });

  return (
    <Table className="table-responsive">
      <TableCaption>Please Wait...</TableCaption>
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
        {skeletonArray.map((_, index) => {
          const isEven = index % 2 === 0;

          return (
            <TableRow key={index} className="hover:bg-background">
              <TableCell>
                <Skeleton className="w-full h-[150px] lg:size-[60px]"></Skeleton>
              </TableCell>

              <TableCell className="flex flex-col justify-center gap-3">
                <Skeleton
                  className={`${
                    isEven ? "w-[320px]" : "w-[300px]"
                  } mx-auto lg:m-0`}
                ></Skeleton>
                {isEven && (
                  <Skeleton className="w-[80px] mx-auto lg:m-0"></Skeleton>
                )}
              </TableCell>

              <TableCell>
                <Skeleton className="w-full lg:w-[60px] mx-auto"></Skeleton>
              </TableCell>

              <TableCell>
                <Skeleton className="w-full lg:w-[60px]"></Skeleton>
              </TableCell>

              <TableCell>
                <Skeleton className="w-full lg:w-[80px]"></Skeleton>
              </TableCell>
            </TableRow>
          );
        })}
        {/* {cartItems.map((item) => {
          const p = item.product;

          return (
            <TableRow key={item.id}>
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
        })} */}
      </TableBody>
    </Table>
  );
};

export default CartItemsTableSkeleton;
