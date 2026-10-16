"use client";

import { Badge } from "@/components/ui/badge";
import { Star, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { string } from "zod";

function ActiveFilters() {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const NO_FILTERS = ["page", "sort", "search"];

  const rowFilters = Array.from(searchParams.entries()).filter(
    ([key]) => !NO_FILTERS.includes(key),
  );

  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");

  const chips: { label: string; keys: string[]; showStar?: boolean }[] = [];

  for (const [key, value] of rowFilters) {
    if (key == "minPrice" || key == "maxPrice") continue;

    if (key == "rating") {
      chips.push({
        label: `${value} & above`,
        keys: ["rating"],
        showStar: true,
      });
    } else {
      chips.push({
        label: value,
        keys: [key],
      });
    }
  }

  if (minPrice || maxPrice) {
    let priceLabel = "";

    if (minPrice && maxPrice) {
      priceLabel = `₹${Number(minPrice).toLocaleString("en-IN")} - ₹${Number(maxPrice).toLocaleString("en-IN")}`;
    } else if (maxPrice) {
      priceLabel = `Under ₹${Number(maxPrice).toLocaleString("en-IN")}`;
    } else {
      priceLabel = `Above ₹${Number(minPrice).toLocaleString("en-IN")}`;
    }

    chips.push({
      label: priceLabel,
      keys: ["minPrice", "maxPrice"],
    });
  }

  function handleRemove(keys: string[]) {
    const params = new URLSearchParams(searchParams.toString());

    keys.forEach((key) => params.delete(key));
    params.delete("page");

    router.push(`${pathName}?${params.toString()}`);
  }

  if (chips.length === 0) return null;

  return (
    <div className="flex gap-2 mt-2">
      {chips.map((chip, index) => (
        <Badge
          key={index}
          variant={"secondary"}
          onClick={() => handleRemove(chip.keys)}
          className="text-sm font-semibold capitalize cursor-default border-gray-400 bg-purple-100 text-gray-600"
        >
          {chip.showStar && <Star strokeWidth={3} size={14} />} {chip.label}{" "}
          <X strokeWidth={2.5} size={14} className="text-red-400" />
        </Badge>
      ))}
    </div>
  );
}

export default ActiveFilters;
