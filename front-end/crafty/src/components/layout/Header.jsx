import * as React from "react";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <header>
      <div
        className="flex flex-wrap gap-10 justify-end py-2 pr-4 pl-20 w-full text-sm max-md:pl-5 max-md:max-w-full"
        style={{ backgroundColor: "#EBBE43" }} // Updated background color
      >
        <div className="flex gap-3">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/9ae4fe26caea4ec4b922b3cd752ddc12/cebfcb5e4788737dcb6dc75251bba3ca921ac5d4f139f9f21b869fccfd6aa970?apiKey=9ae4fe26caea4ec4b922b3cd752ddc12&"
            alt=""
            className="object-contain shrink-0 w-6 aspect-square"
          />
          <p
            className="font-semibold leading-loose text-center basis-auto"
            style={{ color: "white" }} // Text color updated to white
          >
            30% off storewide — Limited time!
          </p>
        </div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/9ae4fe26caea4ec4b922b3cd752ddc12/9db746d8b5575526a41c45b10725275eef92574e4d17be77ccb1333262efaf28?apiKey=9ae4fe26caea4ec4b922b3cd752ddc12&"
          alt=""
          className="object-contain shrink-0 my-auto w-5 aspect-square"
        />
      </div>
      <nav
        className="flex flex-wrap gap-10 justify-between items-center px-40 py-4 w-full max-md:px-5 max-md:max-w-full"
        style={{ backgroundColor: "#EBBE43" }} // Updated background color
      >
        <Link
          to="/"
          className="self-stretch my-auto text-2xl font-medium leading-none text-center"
          style={{ color: "white" }} // Brand name color updated to white
        >
          Crafty<span className="text-white">.</span>
        </Link>
        <div className="flex gap-10 justify-center items-center self-stretch my-auto text-sm font-medium leading-6 min-w-[240px]">
          {["Home", "Shop", "Product", "Contact Us"].map((item) => (
            <Link
              key={item}
              to={`/${item.toLowerCase().replace(" ", "-")}`}
              className={`flex gap-0.5 items-center self-stretch my-auto whitespace-nowrap ${
                item === "Home" ? "text-white" : ""
              }`}
              style={{ color: "white" }} // Links color updated to white
            >
              {item}
            </Link>
          ))}
        </div>
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="p-2 border border-gray-300 rounded"
            style={{ minWidth: "200px" }} // You can adjust the width as needed
          />
          <button
            aria-label="Search"
            className="absolute right-0 top-0 bottom-0 flex items-center justify-center p-2 bg-white border-l border-gray-300 rounded-r"
          >
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/9ae4fe26caea4ec4b922b3cd752ddc12/74d610171b49cc3b18b456fe06d02bff2a8f09126ee10249b3afcbc71e046e51?apiKey=9ae4fe26caea4ec4b922b3cd752ddc12&"
              alt="Search Icon"
              className="w-4 h-4"
            />
          </button>
        </div>
        <div className="flex gap-4 items-center self-stretch my-auto">
          <button
            aria-label="Account"
            className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
          >
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/9ae4fe26caea4ec4b922b3cd752ddc12/d8ac2af4fe98d3962e7216f1d3a4f909c949da16f51206d4e6f2839c71acdc86?apiKey=9ae4fe26caea4ec4b922b3cd752ddc12&"
              alt=""
            />
          </button>
          <button
            aria-label="Cart"
            className="flex shrink-0 self-stretch my-auto h-7 w-[50px]"
          />
        </div>
      </nav>
    </header>
  );
}
