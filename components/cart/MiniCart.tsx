import EmptyCart from "@/components/cart/EmptyCart";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ShoppingCart } from "lucide-react";
function MiniCart() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <div className="cart-icon-wrapper">
              {false && <span className="cart-count">4</span>}
              <ShoppingCart size={16} />
            </div>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <EmptyCart />
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export default MiniCart;
