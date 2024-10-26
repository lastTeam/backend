import * as React from "react";

export function HeroSection() {
  return (
    <section className="flex flex-col items-center px-0 pb-10 w-full bg-white">
      <div className="flex flex-col w-full">
        <img
          loading="lazy"
          src="https://i.pinimg.com/474x/60/0d/47/600d473c1405db545fad6afe21e505e8.jpg"
          className="object-cover w-full h-[400px] max-md:h-[300px] transition-all duration-500" // Set a specific height
        />
        <div className="mt-8 mr-7 max-md:mr-2.5">
          <div className="flex gap-5 max-md:flex-col">
            <div className="flex flex-col w-[56%] max-md:ml-0 max-md:w-full">
              <h1 className="text-7xl font-medium tracking-tighter leading-[76px] text-[#EBBE43] max-md:mt-10 max-md:max-w-full max-md:text-4xl max-md:leading-10">
                Simply Unique<span className="text-[#EBBE43]">/</span>
                <br />
                Simply Better<span className="text-[#EBBE43]">.</span>
              </h1>
            </div>
            <div className="flex flex-col ml-5 w-[44%] max-md:ml-0 max-md:w-full">
              <p className="self-stretch my-auto text-base font-semibold leading-7 text-[#EBBE43] max-md:mt-10 max-md:max-w-full">
                <span className="text-neutral-700">Crafty </span>
                <span className="text-[#EBBE43]">
                  Crafty is a gift & it is a craft hand store based in tunisian
                  traditions, Tunisia. Est since 2019.
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
