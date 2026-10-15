import React from "react";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { ListClock } from "lucide-react";
function ProductsFallback() {
  return (
    <div className="content-wrapper">
      <Empty className="py-36 border border-dashed border-gray-400">
        <EmptyHeader>
          <EmptyMedia className="text-gray-700">
            <p className="text-gray-400">
              <ListClock size={80} strokeWidth={1.5} />
            </p>
          </EmptyMedia>
          <EmptyTitle className="text-gray-600">
            It's not you, it's us
          </EmptyTitle>
          <EmptyDescription className="font-medium">
            We are updating the inventory for you, please come back later to
            check-out new collection.
          </EmptyDescription>
        </EmptyHeader>
        {/* EmptyContent if you want to show any buttons or anything */}
      </Empty>{" "}
    </div>
  );
}

export default ProductsFallback;
