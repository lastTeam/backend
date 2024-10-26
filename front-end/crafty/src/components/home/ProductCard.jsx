import * as React from "react";

export function ProductCard({ product }) {
  const { image, name, price, originalPrice, isNew, discount, rating } =
    product;

  return (
    <article className="flex flex-col relative group mx-2">
      {" "}
      {/* Added margin for spacing */}
      <div className="flex relative flex-col p-4 w-full aspect-[0.751]">
        <img
          loading="lazy"
          src={image}
          alt={name}
          className="object-cover absolute inset-0 size-full"
        />
        <div className="flex relative gap-5 justify-between w-full">
          <div className="flex flex-col text-base font-bold leading-none text-center uppercase whitespace-nowrap">
            {isNew && (
              <div className="gap-2 self-stretch px-3.5 py-1 bg-white rounded text-neutral-900">
                NEW
              </div>
            )}
            {discount > 0 && (
              <div className="gap-2 self-stretch px-3.5 py-1 mt-2 text-white bg-emerald-400 rounded">
                -{discount}%
              </div>
            )}
          </div>
          <button
            aria-label="Add to wishlist"
            className="flex gap-2.5 justify-center items-center self-start px-1.5 w-8 h-8 bg-white shadow-lg min-h-[32px] rounded-[32px]"
          >
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/9ae4fe26caea4ec4b922b3cd752ddc12/3714cfabe2983e4c602cbe5f040355d9cd771c21051eaee0ba27d2338fee59eb?apiKey=9ae4fe26caea4ec4b922b3cd752ddc12&"
              alt=""
              className="object-contain flex-1 shrink w-5 aspect-square basis-0"
            />
          </button>
        </div>
      </div>
      <div className="flex flex-col mt-3 min-h-[72px]">
        {rating && (
          <img
            loading="lazy"
            src={rating}
            alt="Product rating"
            className="object-contain aspect-[5.49] w-[88px]"
          />
        )}
        <h3 className="self-stretch mt-1 text-base font-semibold leading-loose text-neutral-900">
          {name}
        </h3>
        <div className="flex gap-3 items-start mt-1 text-sm leading-loose whitespace-nowrap">
          <span className="font-semibold text-neutral-900">${price}</span>
          {originalPrice && (
            <span className="text-zinc-500">${originalPrice}</span>
          )}
        </div>
      </div>
      {/* Add to Cart Button, visibility controlled by hover */}
      <button className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-6 py-2.5 text-base font-medium tracking-tight leading-7 text-white rounded-lg shadow-lg bg-neutral-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        Add to cart
      </button>
    </article>
  );
}

export function ProductRow() {
  return (
    <div className="flex overflow-x-auto space-x-4 p-4">
      {" "}
      {/* Row for product cards */}
      {products.map((product, index) => {
        console.log(product);
        return <ProductCard key={index} product={product} />;
      })}
    </div>
  );
}
