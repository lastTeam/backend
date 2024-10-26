import * as React from "react";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <header>
      <div className="flex flex-wrap gap-10 justify-end py-2 pr-4 pl-20 w-full text-sm bg-gray-100 max-md:pl-5 max-md:max-w-full">
        <div className="flex gap-3">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/9ae4fe26caea4ec4b922b3cd752ddc12/cebfcb5e4788737dcb6dc75251bba3ca921ac5d4f139f9f21b869fccfd6aa970?apiKey=9ae4fe26caea4ec4b922b3cd752ddc12&"
            alt=""
            className="object-contain shrink-0 w-6 aspect-square"
          />
          <p className="font-semibold leading-loose text-center basis-auto text-neutral-700">
            30% off storewide — Limited time!
          </p>
          <Link
            to="/shop"
            className="flex overflow-hidden relative flex-col font-medium leading-6 text-blue-500 border-b border-solid aspect-[3.792] border-b-blue-500 w-[91px]"
          >
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/9ae4fe26caea4ec4b922b3cd752ddc12/d2e49227d6b988b97e4ecb7c082440861ff6d4240619472d35141e2f5cf290b0?apiKey=9ae4fe26caea4ec4b922b3cd752ddc12&"
              alt=""
              className="object-cover absolute inset-0 size-full"
            />
            Shop Now
          </Link>
        </div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/9ae4fe26caea4ec4b922b3cd752ddc12/9db746d8b5575526a41c45b10725275eef92574e4d17be77ccb1333262efaf28?apiKey=9ae4fe26caea4ec4b922b3cd752ddc12&"
          alt=""
          className="object-contain shrink-0 my-auto w-5 aspect-square"
        />
      </div>
      <nav className="flex flex-wrap gap-10 justify-between items-center px-40 py-4 w-full bg-white max-md:px-5 max-md:max-w-full">
        <Link
          to="/"
          className="self-stretch my-auto text-2xl font-medium leading-none text-center text-black w-[105px]"
        >
          3legant<span className="text-zinc-500">.</span>
        </Link>
        <div className="flex gap-10 justify-center items-center self-stretch my-auto text-sm font-medium leading-6 min-w-[240px] text-zinc-500">
          {["Home", "Shop", "Product", "Contact Us"].map((item) => (
            <Link
              key={item}
              to={`/${item.toLowerCase().replace(" ", "-")}`}
              className={`flex gap-0.5 items-center self-stretch my-auto whitespace-nowrap ${
                item === "Home" ? "text-neutral-900" : ""
              }`}
            >
              {item}
            </Link>
          ))}
        </div>
        <div className="flex gap-4 items-center self-stretch my-auto">
          <button
            aria-label="Search"
            className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
          >
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/9ae4fe26caea4ec4b922b3cd752ddc12/74d610171b49cc3b18b456fe06d02bff2a8f09126ee10249b3afcbc71e046e51?apiKey=9ae4fe26caea4ec4b922b3cd752ddc12&"
              alt=""
            />
          </button>
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
