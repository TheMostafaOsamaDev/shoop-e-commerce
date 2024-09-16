"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { sliceText } from "@/lib/utils";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  console.log(data);

  return (
    <div className="rounded-md border w-full max-w-full overflow-x-auto">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className={
                      header.column.columnDef.header === "Images"
                        ? "text-center"
                        : ""
                    }
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => {
                  const header = cell.column.columnDef.header;

                  return (
                    <TableCell
                      key={cell.id}
                      className={`px-6 py-4 text-sm ${
                        header === "Images" ? "text-center" : ""
                      } whitespace-wrap`}
                    >
                      {cell.column.columnDef.header === "Images" ? (
                        <ViewImages
                          images={cell.getContext().getValue() as string}
                        />
                      ) : (
                        sliceText(cell.getContext().getValue() as string, 50)
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function ViewImages({ images }: { images: string }) {
  const imagesArray = images?.split(",");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">View</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>All images </DialogTitle>
          <DialogDescription>
            The list of images that are associated with this product.
            <br />
            <p className="text-foreground text-xs font-medium">
              Note: Please make sure that all the images is uploaded correctly.
            </p>
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <div className="grid grid-cols-2 gap-2">
            {imagesArray?.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Image ${index + 1}`}
                className="w-full h-40 object-cover rounded-md"
              />
            ))}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
