"use client";

import { TFilters } from "@/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Square, SquareCheck, SquareDashedX, Star } from "lucide-react";
import { cn } from "cn";
import { ScrollArea } from "@/components/ui/scroll-area";
import { string } from "zod";

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
            <Button variant="ghost">
              <SquareDashedX className="text-red-600" />
            </Button>
          )}
        </CardAction>
      </CardHeader>
      <CardContent>
        {/* filter by category */}
        <div className="flex flex-col gap-2 rounded-md bg-purple-50 p-2">
          <h3 className="text-sm font-semibold">Category</h3>
          <ScrollArea className="h-25 w-48 rounded-md">
            <div className="flex flex-col gap-1.5">
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
                    "text-sm flex gap-1 items-center ml-1 capitalize",
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
          <ScrollArea className="h-30 w-48 rounded-md">
            <div className="flex flex-col gap-1.5">
              {filters.brands.map((brand) => (
                <button
                  key={brand}
                  onClick={() =>
                    updateFilter("brand", isActive("brand", brand) ? "" : brand)
                  }
                  className={cn(
                    "text-sm flex gap-1 items-center ml-1 capitalize",
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
          <ScrollArea className="h-25 w-48 rounded-md">
            <div className="flex flex-col gap-1.5">
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
                    "text-sm flex gap-1 items-center ml-1 capitalize",
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
          <ScrollArea className="h-20 w-48 rounded-md">
            <div className="flex flex-col gap-1.5">
              <button
                onClick={() =>
                  updateFilter(
                    "maxPrice",
                    isActive("maxPrice", "5000") ? "" : "5000",
                  )
                }
                className={cn(
                  "text-sm flex gap-1 items-center ml-1 capitalize",
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
                  "text-sm flex gap-1 items-center ml-1 capitalize",
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
                  "text-sm flex gap-1 items-center ml-1 capitalize",
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
