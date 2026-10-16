"use client";

import { TProduct } from "@/types";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type ProductProps = {
  product: TProduct;
};

function ProductCard({ product }: ProductProps) {
  return (
    <Link href={`/products/${product.slug}`}>
      <Card className="relative mx-auto w-full max-w-sm pt-0">
        {/* image with badge */}
        <div className="group relative aspect-square overflow-hidden">
          <div className="absolute inset-0 z-5 bg-black/35" />
          <img
            src={product.images[0]}
            alt={product.slug}
            className="relative z-10 aspect-square w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-135"
          />
        </div>

        {product.stock > 0 ? (
          // show discount if there is stock
          product.discountPercentage > 0 && (
            <Badge className="corner-tag font-semibold">
              {product.discountPercentage}% off
            </Badge>
          )
        ) : (
          // else show out of stock
          <Badge
            variant={"destructive"}
            className="corner-tag font-semibold text-white bg-red-500"
          >
            Out of Stock!
          </Badge>
        )}

        {/* product info */}
        <CardHeader>
          <CardTitle>{product.name}</CardTitle>
          <CardDescription>{product.description}</CardDescription>
        </CardHeader>
        {/* <CardFooter>footer</CardFooter> */}
      </Card>
    </Link>
  );
}

export default ProductCard;
