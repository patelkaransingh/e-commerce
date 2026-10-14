"use client";

import MiniCart from "@/components/cart/MiniCart";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import {
  selectAuthLoading,
  selectIsAuthenticated,
  selectUser,
} from "@/store/selectors";
import { clearUser } from "@/store/slice/authSlice";
import { LogOut, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

function NavBar() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isLoading = useAppSelector(selectAuthLoading);
  const isAdmin = user?.role == "admin" || user?.role == "superadmin";

  const handleLogout = async () => {
    try {
      await fetch("api/auth/logout", {
        method: "POST",
      });

      dispatch(clearUser());
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("something went wrong", error);
    }
  };

  const [hover, setHover] = useState(false);

  return (
    <header className="navbar">
      <div className="nav-items-wrapper">
        <Link href="/" className="navbar-logo">
          Shopify
        </Link>
        <nav className="navbar-links">
          <Link href="/products" className="link">
            Products
          </Link>

          {!isLoading && (
            <>
              {isAuthenticated ? (
                <div className="flex gap-3 items-center">
                  {isAdmin ? (
                    <Link href="/admin" className="link mr-3">
                      Dashboard
                    </Link>
                  ) : (
                    <MiniCart />
                  )}

                  <Separator
                    orientation="vertical"
                    className="h-6 bg-gray-800"
                  />

                  <Link
                    href="/profile"
                    className="text-gray-700 font-medium hover:text-primary"
                  >
                    <span className="flex items-center gap-1">
                      <User size={18} strokeWidth={2.5} />
                      Hi {user?.name.split(" ")[0]}
                    </span>
                  </Link>

                  <Button
                    variant={hover ? "default" : "ghost"}
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                    onClick={handleLogout}
                  >
                    <LogOut size={18} /> Logout
                  </Button>
                </div>
              ) : (
                <Link href="/login" className="link">
                  Login / Register
                </Link>
              )}
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default NavBar;
