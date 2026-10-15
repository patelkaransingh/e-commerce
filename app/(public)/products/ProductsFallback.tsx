import React from "react";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  Heater,
  ListClock,
  Shirt,
  SportShoe,
  TabletSmartphone,
} from "lucide-react";
function ProductsFallback() {
  return (
    <Empty className="h-[70vh] border border-solid border-gray-300 bg-white">
      <EmptyHeader>
        <EmptyMedia className="text-gray-700">
          <p className="text-gray-400 flex items-center gap-2">
            <Heater size={40} strokeWidth={1.5} />
            <SportShoe size={40} strokeWidth={1.5} />
            <TabletSmartphone size={40} strokeWidth={1.5} />
          </p>
        </EmptyMedia>
        <EmptyTitle className="text-gray-600">No Items Available !</EmptyTitle>
        <EmptyDescription className="font-medium">
          Please clear any filter combinations if applied..
        </EmptyDescription>
      </EmptyHeader>
      {/* EmptyContent if you want to show any buttons or anything */}
    </Empty>
  );
}

export default ProductsFallback;
