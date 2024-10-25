import * as React from "react";

export function Newsletter() {
  return (
    <section className="flex flex-col w-full font-medium text-neutral-900 max-md:max-w-full">
      <div className="flex relative flex-col justify-center items-center px-20 py-24 w-full min-h-[360px] max-md:px-5 max-md:pt-24 max-md:max-w-full">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/9ae4fe26caea4ec4b922b3cd752ddc12/1debcab8898a7624451f6ffe382ea1809fce4de63d147057d451b1f1f26b4683?apiKey=9ae4fe26caea4ec4b922b3cd752ddc12&"
          alt=""
          className="object-cover absolute inset-0 size-full"
        />
        <div className="flex relative flex-col items-center max-w-full w-[488px]">
          <h2 className="text-4xl tracking-tight leading-none text-center">
            Join Our Newsletter
          </h2>
          <p className="mt-2 text-lg leading-loose text-center">
            Sign up for deals, new products and promotions
          </p>
          <form className="flex flex-wrap gap-10 justify-center self-stretch py-3 mt-8 w-full text-base tracking-tight leading-7 border-b border-solid border-b-zinc-500 border-b-opacity-50 text-zinc-500 max-md:max-w-full">
            <div className="flex gap-2">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/9ae4fe26caea4ec4b922b3cd752ddc12/976b2d52e2c0d2b17087b938d538ee50d93808e3cfe28d7d41cbcc6d0549b614?apiKey=9ae4fe26caea4ec4b922b3cd752ddc12&"
                alt=""
                className="object-contain shrink-0 my-auto w-6 aspect-square"
              />
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                type="email"
                id="email"
                placeholder="Email address"
                className="bg-transparent border-none outline-none"
              />
            </div>
            <button
              type="submit"
              className="whitespace-nowrap border-0 border-solid border-neutral-900"
            >
              Signup
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
