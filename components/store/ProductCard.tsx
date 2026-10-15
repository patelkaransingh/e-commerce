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
      <div className="relative aspect-square bg-bg overflow-hidden">
        <Image
          src={product.images[0]}
          alt="product.slug"
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          fill
        />
      </div>
    </Link>
  );
}

export default ProductCard;
