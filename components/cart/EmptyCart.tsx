import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Ghost } from "lucide-react";
function EmptyCart() {
  return (
    <Empty className="border border-dashed">
      <EmptyHeader>
        <EmptyMedia className="text-gray-700">
          <p className="flex items-center gap-1 ghost-float text-gray-600">
            ~<Ghost />~
          </p>
        </EmptyMedia>
        <EmptyTitle className="text-gray-600">I'm stuck here..</EmptyTitle>
        <EmptyDescription className="font-medium">
          Add items in cart to set me free..
        </EmptyDescription>
      </EmptyHeader>
      {/* EmptyContent if you want to show any buttons or anything */}
    </Empty>
  );
}

export default EmptyCart;
