"use client";
import React from "react";
import UploadProductsSheet from "@/components/UploadProductsSheet";
import { DataTable } from "./data-table";
import { columns, ProductTableData } from "./columns";
import { Button } from "@/components/ui/button";
import { ApiError } from "@/lib/api-error";
import { useToast } from "@/components/ui/use-toast";
import { createMultipleProducts } from "@/lib/actions/product.actions";

export default function AddMultipleProducts() {
  const [tableData, setTableData] = React.useState<any[]>([]);
  const { toast } = useToast();
  // TODO: Add a loading state

  if (tableData.length === 0) {
    return (
      <div className="h-screen grid place-content-center">
        <UploadProductsSheet
          tableData={tableData}
          setTableData={setTableData}
        />
      </div>
    );
  }

  const handleSave = async () => {
    try {
      const res = await createMultipleProducts(tableData);
    } catch (error) {
      console.log(error);
      const err = ApiError.generate(error);

      toast(err);
    }
  };

  return (
    <div className="relative">
      <DataTable columns={columns} data={tableData} />

      <div className="fixed bottom-5 p-5 bg-background flex items-center gap-3 shadow-xl">
        <p>Do you want to save this?</p>
        <div>
          <Button variant={"ghost"} onClick={() => setTableData([])}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </div>
      </div>
    </div>
  );
}
