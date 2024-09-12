"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ProductTableData = {
  Title: string;
  Category: string;
  "Sub category": string;
  Price: number;
  Quantity: number;
};
export const columns: ColumnDef<ProductTableData>[] = [
  {
    accessorKey: "Title",
    header: "Title",
  },
  {
    accessorKey: "Category",
    header: "Category",
  },
  {
    accessorKey: "Sub category",
    header: "Sub category",
  },
  {
    accessorKey: "Price",
    header: "Price",
  },
  {
    accessorKey: "Quantity",
    header: "Quantity",
  },
];
