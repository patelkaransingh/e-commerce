"use client";
import { Separator } from "@/components/ui/separator";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import {
  selectAuthLoading,
  selectIsAuthenticated,
  selectUser,
} from "@/store/selectors";
import { User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";

function NavBar() {
  // const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isLoading = useAppSelector(selectAuthLoading);
  const isAdmin = user?.role == "admin" || user?.role == "superadmin";

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
                <div>
                  {isAdmin && (
                    <Link href="/admin" className="link">
                      Dashboard
                    </Link>
                  )}

                  <Separator orientation="vertical" />

                  <Link
                    href="/profile"
                    className="flex items-center gap-1 text-gray-600 font-bold"
                  >
                    {" "}
                    Hi {user?.name.split(" ")[0]}
                    <User size={18} strokeWidth={2.5} />
                  </Link>
                </div>
              ) : (
                <Link href="/login">Login</Link>
              )}
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default NavBar;
