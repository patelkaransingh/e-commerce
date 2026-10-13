import Link from "next/link";
import React from "react";

function NavBar() {
  return (
    <header className="navbar">
      <div className="nav-items-wrapper">
        <Link href="/" className="navbar-logo">
          Shopify
        </Link>
        <nav className="navbar-links">
          <Link href="/products">Products</Link>
          <Link href="/login">Login</Link>
        </nav>
      </div>
    </header>
  );
}

export default NavBar;
