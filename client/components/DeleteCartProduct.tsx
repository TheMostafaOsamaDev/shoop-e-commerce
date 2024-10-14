import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Trash } from "lucide-react";

export default function DeleteCartProduct({
  productId,
}: {
  productId: string;
}) {
  const deleteProduct = async () => {
    console.log(`Deleting product with id: ${productId}`);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="bg-background hover:bg-red-50 text-red-500 border border-red-500 hover:text-red-600 hover:border-red-600 px-2 btn-icon-container w-full !justify-center"
          variant={"destructive"}
        >
          <Trash size={17} /> Delete
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely?</DialogTitle>

          <DialogDescription>
            This action cannot be undone. This will permanently delete the
            product from your cart.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"outline"}>No, keep it</Button>
          </DialogClose>
          <Button onClick={deleteProduct} variant={"destructive"}>
            Yes, remove this product
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
