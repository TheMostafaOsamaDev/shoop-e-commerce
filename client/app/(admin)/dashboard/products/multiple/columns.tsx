"use client";

import { ColumnDef } from "@tanstack/react-table";

export type ProductTableData = {
  Title: string;
  Category: string;
  "Sub category": string;
  Price: number;
  Quantity: number;
  images: string;
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
  {
    accessorKey: "Images",
    header: "Images",
  },
];
