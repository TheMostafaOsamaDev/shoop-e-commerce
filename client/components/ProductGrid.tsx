import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

export default function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {products.map((p) => (
        <Card key={`products_grid_${p.id}`}>
          <div>
            {`${process.env.NEXT_PUBLIC_BACKEND_UPLOADS_URL}/products/` +
              p.images[0].name}
            <Image
              // src={p.images[0].name}
              src={
                `${process.env.NEXT_PUBLIC_BACKEND_UPLOADS_URL}/products/` +
                p.images[0].name
              }
              width={350}
              height={400}
              alt="product image"
            />
          </div>

          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
