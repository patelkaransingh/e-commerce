"use client";

import { TProduct } from "@/types";
import Image from "next/image";
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
        <div className="absolute inset-0 z-5 aspect-square bg-black/35" />
        <img
          src={product.images[0]}
          alt={product.slug}
          className="relative z-10 aspect-square w-full object-cover"
        />

        {product.stock > 0 ? (
          // show discount if there is stock
          product.discountPercentage > 0 && (
            <Badge className="corner-tag font-semibold">
              {product.discountPercentage}% off
            </Badge>
          )
        ) : (
          // else show out of stock
          <Badge variant={"destructive"} className="corner-tag font-semibold">
            Out of Stock!
          </Badge>
        )}

        <CardHeader>
          <CardAction>
            <Badge variant="secondary">Featured</Badge>
          </CardAction>
          <CardTitle>Design systems meetup</CardTitle>
          <CardDescription>
            A practical talk on component APIs, accessibility, and shipping
            faster.
          </CardDescription>
        </CardHeader>
        <CardFooter>footer</CardFooter>
      </Card>
    </Link>
  );
}

export default ProductCard;
