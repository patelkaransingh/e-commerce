import { Funnel } from "lucide-react";
import FilterSidebar from "@/components/store/FilterSidebar";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { TFilters } from "@/types";

type TFilterProps = {
  filters: TFilters;
};

function FilterDrawer({ filters }: TFilterProps) {
  return (
    <Drawer swipeDirection="right">
      <DrawerTrigger
        render={
          <Button variant="secondary">
            Filter <Funnel />
          </Button>
        }
      />
      <DrawerContent className="border-gray-300">
        <DrawerHeader className="sr-only">
          <DrawerTitle>Product filters</DrawerTitle>
          <DrawerDescription>
            Filter products by category, brand, rating, and price.
          </DrawerDescription>
        </DrawerHeader>
        <ScrollArea className="min-h-0 w-full flex-1">
          <div className="p-4">
            <FilterSidebar filters={filters} />
          </div>
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
}

export default FilterDrawer;
