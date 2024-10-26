import * as React from "react";
import { Link } from "react-router-dom";

export function Footer() {
  const footerLinks = ["Home", "Shop", "Product", "Blog", "Contact Us"];

  return (
    <footer
      className="flex flex-col justify-end items-center px-20 pt-20 pb-8 w-full max-md:px-5 max-md:max-w-full"
      style={{ backgroundColor: "#EBBE43" }} // Updated background color
    >
      <div className="flex flex-col w-full max-w-[1120px] max-md:max-w-full">
        <div className="flex flex-wrap gap-5 justify-between w-full max-md:max-w-full">
          <div className="flex gap-8">
            <Link
              to="/"
              className="grow text-2xl font-medium leading-none text-center"
              style={{ color: "white" }} // Text color updated to white
            >
              Crafty<span style={{ color: "white" }}>.</span>
            </Link>
            <div className="flex shrink-0 w-px h-6 bg-white" />{" "}
            {/* Updated divider color */}
            <p
              className="text-sm leading-loose basis-auto"
              style={{ color: "white" }}
            >
              Crafts & Craft hand  Store
            </p>
          </div>
          <nav className="flex gap-10 self-start text-sm leading-loose">
            {footerLinks.map((link) => (
              <Link
                key={link}
                to={`/${link.toLowerCase().replace(" ", "-")}`}
                style={{ color: "white" }} // Link color updated to white
              >
                {link}
              </Link>
            ))}
          </nav>
        </div>
        <div
          className="flex flex-wrap gap-10 justify-center py-4 mt-14 w-full text-xs font-semibold leading-loose border-solid border-t-[0.5px] max-md:mt-10 max-md:mr-0.5 max-md:max-w-full"
          style={{ color: "white", borderColor: "white" }} // Updated text and border color
        >
          <div className="flex flex-wrap gap-7 self-start">
            <p className="grow" style={{ color: "white" }}>
              Copyright © 2023 3legant. All rights reserved
            </p>
            <Link to="/privacy-policy" style={{ color: "white" }}>
              Privacy Policy
            </Link>
            <Link to="/terms-of-use" style={{ color: "white" }}>
              Terms of Use
            </Link>
          </div>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/9ae4fe26caea4ec4b922b3cd752ddc12/2e230cf2d163f049f36ea1b39e44c455fbfbe2083eee0eeaf72a5ceef9613eae?apiKey=9ae4fe26caea4ec4b922b3cd752ddc12&"
            alt="Payment methods"
            className="object-contain shrink-0 max-w-full aspect-[5] w-[120px]"
          />
        </div>
      </div>
    </footer>
  );
}
