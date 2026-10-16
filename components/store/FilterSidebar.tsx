"use client";

import { cn } from "cn";
import { Square, SquareCheck, SquareDashedX, Star } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { TFilters } from "@/types";

type TFilterProps = {
  filters: TFilters;
};

function FilterSidebar({ filters }: TFilterProps) {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const activeFilters = Array.from(searchParams.keys()).filter(
    (x) => x !== "sort" && x !== "p",
  ).length;

  const clearAll = () => {
    router.push(pathName);
  };

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    params.delete("page");
    router.push(`${pathName}?${params.toString()}`);
  };

  const isActive = (key: string, value: string): boolean => {
    return searchParams.get(key) === value;
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Filters</CardTitle>
        <CardDescription>Filter Products</CardDescription>
        <CardAction>
          {activeFilters > 0 && (
            <Button variant="ghost" onClick={clearAll}>
              <SquareDashedX className="text-red-600" />
            </Button>
          )}
        </CardAction>
      </CardHeader>
      <CardContent>
        {/* filter by category */}
        <div className="flex flex-col gap-2 rounded-md bg-purple-50 p-2">
          <h3 className="text-sm font-semibold">Category</h3>
          <ScrollArea className="h-25 w-full rounded-md">
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-0.5">
              {filters.categories.map((category) => (
                <button
                  key={category}
                  onClick={() =>
                    updateFilter(
                      "category",
                      isActive("category", category) ? "" : category,
                    )
                  }
                  className={cn(
                    "flex gap-1 items-center w-full px-2 capitalize min-h-8 text-[16px] lg:text-sm",
                    isActive("category", category)
                      ? "text-primary font-semibold"
                      : "text-gray-600 hover:text-text",
                  )}
                >
                  {isActive("category", category) ? (
                    <SquareCheck
                      size={16}
                      strokeWidth={2.5}
                      className="text-primary"
                    />
                  ) : (
                    <Square size={14} />
                  )}
                  {category}
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* filter by brand */}
        <div className="flex flex-col gap-2 rounded-md bg-purple-50 p-2">
          <h3 className="text-sm font-semibold">Brand</h3>
          <ScrollArea className="h-50 w-full rounded-md">
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-0.5">
              {filters.brands.map((brand) => (
                <button
                  key={brand}
                  onClick={() =>
                    updateFilter("brand", isActive("brand", brand) ? "" : brand)
                  }
                  className={cn(
                    "flex gap-1 items-center w-full px-2 capitalize min-h-8 text-[16px] lg:text-sm",
                    isActive("brand", brand)
                      ? "text-primary font-semibold"
                      : "text-gray-600 hover:text-text",
                  )}
                >
                  {isActive("brand", brand) ? (
                    <SquareCheck
                      size={16}
                      strokeWidth={2.5}
                      className="text-primary"
                    />
                  ) : (
                    <Square size={14} />
                  )}
                  {brand}
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* filter by rating */}
        <div className="flex flex-col gap-2 rounded-md bg-purple-50 p-2">
          <h3 className="text-sm font-semibold">Rating</h3>
          <ScrollArea className="h20 lg:h-35 w-full rounded-md">
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-0.5">
              {filters.ratings.map((rating) => (
                <button
                  key={rating}
                  onClick={() =>
                    updateFilter(
                      "rating",
                      isActive("rating", String(rating)) ? "" : String(rating),
                    )
                  }
                  className={cn(
                    "flex gap-1 items-center w-full px-2 capitalize min-h-8 text-[16px] lg:text-sm",
                    isActive("rating", String(rating))
                      ? "text-primary font-semibold"
                      : "text-gray-600 hover:text-text",
                  )}
                >
                  {isActive("rating", String(rating)) ? (
                    <SquareCheck
                      size={16}
                      strokeWidth={2.5}
                      className="text-primary"
                    />
                  ) : (
                    <Star size={14} />
                  )}
                  {rating} & above
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* filter by price range*/}
        <div className="flex flex-col gap-2 rounded-md bg-purple-50 p-2">
          <h3 className="text-sm font-semibold">Price Range</h3>
          <p className="text-xs text-gray-600">
            ₹{filters.priceRange.min.toLocaleString("en-IN")} — ₹
            {filters.priceRange.max.toLocaleString("en-IN")}
          </p>
          <ScrollArea className="h-25 w-full rounded-md">
            <div className="grid grid-cols-1 gap-0.5">
              <button
                onClick={() =>
                  updateFilter(
                    "maxPrice",
                    isActive("maxPrice", "5000") ? "" : "5000",
                  )
                }
                className={cn(
                  "flex gap-1 items-center w-full px-2 capitalize min-h-8 text-[16px] lg:text-sm",
                  isActive("maxPrice", "5000")
                    ? "text-primary font-semibold"
                    : "text-gray-600 hover:text-text",
                )}
              >
                {isActive("maxPrice", "5000") ? (
                  <SquareCheck
                    size={16}
                    strokeWidth={2.5}
                    className="text-primary"
                  />
                ) : (
                  <Square size={14} />
                )}
                Under ₹5,000
              </button>

              <button
                onClick={() =>
                  updateFilter(
                    "maxPrice",
                    isActive("maxPrice", "20000") ? "" : "20000",
                  )
                }
                className={cn(
                  "flex gap-1 items-center w-full px-2 capitalize min-h-8 text-[16px] lg:text-sm",
                  isActive("maxPrice", "20000")
                    ? "text-primary font-semibold"
                    : "text-gray-600 hover:text-text",
                )}
              >
                {isActive("maxPrice", "20000") ? (
                  <SquareCheck
                    size={16}
                    strokeWidth={2.5}
                    className="text-primary"
                  />
                ) : (
                  <Square size={14} />
                )}
                Under ₹20,000
              </button>

              <button
                onClick={() =>
                  updateFilter(
                    "minPrice",
                    isActive("minPrice", "50000") ? "" : "50000",
                  )
                }
                className={cn(
                  "flex gap-1 items-center w-full px-2 capitalize min-h-8 text-[16px] lg:text-sm",
                  isActive("minPrice", "50000")
                    ? "text-primary font-semibold"
                    : "text-gray-600 hover:text-text",
                )}
              >
                {isActive("minPrice", "50000") ? (
                  <SquareCheck
                    size={16}
                    strokeWidth={2.5}
                    className="text-primary"
                  />
                ) : (
                  <Square size={14} />
                )}
                Above ₹50,000
              </button>
            </div>
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
}

export default FilterSidebar;
