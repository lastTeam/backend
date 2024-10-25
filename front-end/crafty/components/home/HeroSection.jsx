import * as React from "react";

export function HeroSection() {
  return (
    <section className="flex flex-col items-center px-20 pb-10 w-full bg-white max-md:px-5 max-md:max-w-full">
      <div className="flex flex-col w-full max-w-[1120px] max-md:max-w-full">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/9ae4fe26caea4ec4b922b3cd752ddc12/c1cd98d33aaf81e84b020e3e78f6c1f466ab8a5c3d04c15a79da2411383b8dd2?apiKey=9ae4fe26caea4ec4b922b3cd752ddc12&"
          alt="Hero banner"
          className="object-contain w-full aspect-[2.09] max-md:max-w-full"
        />
        <div className="mt-8 mr-7 max-md:mr-2.5 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col">
            <div className="flex flex-col w-[56%] max-md:ml-0 max-md:w-full">
              <h1 className="text-7xl font-medium tracking-tighter leading-[76px] text-zinc-500 max-md:mt-10 max-md:max-w-full max-md:text-4xl max-md:leading-10">
                Simply Unique<span className="text-zinc-500">/</span>
                <br />
                Simply Better<span className="text-zinc-500">.</span>
              </h1>
            </div>
            <div className="flex flex-col ml-5 w-[44%] max-md:ml-0 max-md:w-full">
              <p className="self-stretch my-auto text-base font-semibold leading-7 text-zinc-500 max-md:mt-10 max-md:max-w-full">
                <span className="text-neutral-700">3legant </span>
                <span className="text-zinc-500">
                  is a gift & decorations store based in HCMC, Vietnam. Est
                  since 2019.
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
