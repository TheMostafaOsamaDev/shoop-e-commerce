"use client";
import React from "react";
import UploadProductsSheet from "@/components/UploadProductsSheet";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
// import { createMultipleProducts } from "@/lib/actions/product.actions";

export default function AddMultipleProducts() {
  const [tableData, setTableData] = React.useState<any[]>([]);
  // const { toast } = useToast();
  const [loading /* setLoading */] = React.useState(false);

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
    // try {
    //   setLoading(true);
    //   const preparedData = tableData.map((data) => {
    //     return {
    //       title: data?.Title,
    //       price: +data?.Price?.replaceAll("$", "")?.trim(),
    //       quantity: +data?.Quantity,
    //       category: categoryFormatter(data?.Category),
    //       subCategory: categoryFormatter(data?.["Sub category"]),
    //       images: data?.Images?.split(",")?.map((image: string) =>
    //         image.trim()
    //       ),
    //     };
    //   });
    //   // const data = await createMultipleProducts(preparedData);
    //   const count = data?.data?.createMultipleProducts?.counts;
    //   const message = `${count} product${
    //     count > 1 ? "s" : ""
    //   } added successfully`;
    //   toast({
    //     description: message,
    //   });
    //   setTableData([]);
    // } catch (error) {
    //   console.log(error);
    //   const err = ApiError.generate(error);
    //   toast(err);
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <div className="relative">
      <DataTable columns={columns} data={tableData} />

      <div className="fixed bottom-5 p-5 bg-background flex items-center gap-3 shadow-xl">
        <p>Do you want to save this?</p>
        <div>
          <Button
            variant={"ghost"}
            onClick={() => setTableData([])}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>
    </div>
  );
}
