import * as React from "react";
import { Link } from "react-router-dom";

export function CategoryCard({ title, image, className }) {
  return (
    <article
      className={`flex flex-col font-medium text-neutral-900 ${className}`}
    >
      <div className="flex relative flex-col items-start px-12 pt-12 w-full min-h-[319px] pb-10 max-md:px-5 max-md:pt-24">
        <img
          loading="lazy"
          src={image}
          alt={`${title} category`}
          className="object-cover absolute inset-0 size-full"
        />
        <div className="flex relative flex-col w-full">
          <h2 className="text-4xl tracking-tight leading-none text-[#EBBE43]">
            {title}
          </h2>
          <Link
            to={`/category/${title.toLowerCase()}`}
            className="flex gap-1 items-center self-start mt-3 text-base tracking-tight leading-7 text-[#EBBE43] border-b border-solid border-b-neutral-900"
          >
            Shop Now
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/9ae4fe26caea4ec4b922b3cd752ddc12/611d84849678bc53d6f8ffeb079bf986cfd9febdc18118eb217c3e667e279cf3?apiKey=9ae4fe26caea4ec4b922b3cd752ddc12&"
              alt=""
              className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square"
            />
          </Link>
        </div>
      </div>
    </article>
  );
}
