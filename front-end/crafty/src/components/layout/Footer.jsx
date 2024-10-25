import * as React from "react";
import { Link } from "react-router-dom";

export function Footer() {
  const footerLinks = ["Home", "Shop", "Product", "Blog", "Contact Us"];

  return (
    <footer className="flex flex-col justify-end items-center px-20 pt-20 pb-8 w-full bg-neutral-900 max-md:px-5 max-md:max-w-full">
      <div className="flex flex-col w-full max-w-[1120px] max-md:max-w-full">
        <div className="flex flex-wrap gap-5 justify-between w-full max-md:max-w-full">
          <div className="flex gap-8">
            <Link
              to="/"
              className="grow text-2xl font-medium leading-none text-center text-white"
            >
              3legant<span className="text-zinc-500">.</span>
            </Link>
            <div className="flex shrink-0 w-px h-6 bg-zinc-500" />
            <p className="text-sm leading-loose text-gray-200 basis-auto">
              Gift & Decoration Store
            </p>
          </div>
          <nav className="flex gap-10 self-start text-sm leading-loose text-white">
            {footerLinks.map((link) => (
              <Link key={link} to={`/${link.toLowerCase().replace(" ", "-")}`}>
                {link}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-wrap gap-10 justify-center py-4 mt-14 w-full text-xs font-semibold leading-loose text-white border-solid border-t-[0.5px] border-t-zinc-500 max-md:mt-10 max-md:mr-0.5 max-md:max-w-full">
          <div className="flex flex-wrap gap-7 self-start">
            <p className="grow text-gray-200">
              Copyright © 2023 3legant. All rights reserved
            </p>
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms-of-use">Terms of Use</Link>
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
