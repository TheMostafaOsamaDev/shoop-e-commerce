"use client";
import { useDropzone } from "react-dropzone";
import { Button } from "./ui/button";
import { CloudUpload } from "lucide-react";
import clsx from "clsx";
import { useCallback } from "react";
import Papa from "papaparse";
import { useToast } from "./ui/use-toast";

interface UploadProductsSheetProps {
  setTableData: React.Dispatch<React.SetStateAction<string[][]>>;
  tableData: string[][];
}

export default function UploadProductsSheet({
  setTableData,
}: UploadProductsSheetProps) {
  const { toast } = useToast();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];

    Papa.parse(file, {
      complete: (result) => {
        if (result.data.length === 0) {
          return toast({
            description: "No data found in the file",
          });
        }

        const data: any[] = [];

        (result.data as string[][])
          ?.slice(1)
          ?.filter((row) => row[0] && row[1] && row[2] && row[3] && row[4])
          ?.map((row) => {
            const objectData = {
              Title: row[0],
              Category: row[1],
              "Sub category": row[2],
              Price: row[3] + " $",
              Quantity: row[4],
              Images: row[5],
            };

            data.push(objectData);
          });

        setTableData(data);
      },
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps({
        className: clsx(
          "dropzone",
          "flex flex-col items-center gap-3 w-[250px] text-center"
        ),
      })}
    >
      <input {...getInputProps()} multiple={false} accept=".csv" />
      <Button className="btn-icon-container">
        <CloudUpload size={20} /> Start Uploading
      </Button>

      <p className="text-sm">
        Start uploading by clicking the button. only CSV files are allowed.
      </p>
    </div>
  );
}
