import Link from "next/link";
import React from "react";

function Footer() {
  const links = [
    {
      heading: "Quick Links",
      data: [
        {
          label: "Products",
          link: "/products",
        },
        {
          label: "Cart",
          link: "/cart",
        },
        {
          label: "Login",
          link: "/login",
        },
      ],
    },

    {
      heading: "Support Links",
      data: [
        {
          label: "My Orders",
          link: "/orders",
        },
        {
          label: "Contact Us",
          link: "/contact",
        },
      ],
    },
  ];

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <h3>Shopify</h3>
          <p>Best collection you will ever find..</p>
        </div>

        {links.map((item, index) => (
          <div className="footer-links" key={index}>
            <h4>{item.heading}</h4>
            {item.data.map((link, i) => (
              <Link key={i} href={link.link}>
                {link.label}
              </Link>
            ))}
          </div>
        ))}
      </div>
    </footer>
  );
}

export default Footer;
