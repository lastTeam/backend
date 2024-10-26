import * as React from "react";
import { Link } from "react-router-dom";

import { Header } from "../layout/Header";
import { Footer } from "../layout/Footer";
import { HeroSection } from "./HeroSection";
import { CategoryCard } from "./CategoryCard";
import { ProductCard } from "./ProductCard";
import { Newsletter } from "./Newsletter";

const products = [
  {
    image:
      "https://cdn.builder.io/api/v1/image/assets/9ae4fe26caea4ec4b922b3cd752ddc12/2b854ef52b77adb5889a79f32f474a8bf34925543111db6e33ebf77b3f30e106?apiKey=9ae4fe26caea4ec4b922b3cd752ddc12&",
    name: "Loveseat Sofa",
    price: "199.00",
    originalPrice: "400.00",
    isNew: true,
    discount: 50,
    rating:
      "https://cdn.builder.io/api/v1/image/assets/9ae4fe26caea4ec4b922b3cd752ddc12/ac91ee13fa60a089929cfb3c84d88c4c7e44993d53054e7d2e3c0f8ca3250815?apiKey=9ae4fe26caea4ec4b922b3cd752ddc12&",
  },
  // Add more products here
];

const categories = [
  {
    title: "Living Room",
    image:
      "https://cdn.builder.io/api/v1/image/assets/9ae4fe26caea4ec4b922b3cd752ddc12/3880fc18463c9844e2f739b1d338e1eabc7e68ffb533e56c56c468bc57f5c6f1?apiKey=9ae4fe26caea4ec4b922b3cd752ddc12&",
    className: "min-h-[664px]",
  },
  {
    title: "Bedroom",
    image:
      "https://cdn.builder.io/api/v1/image/assets/9ae4fe26caea4ec4b922b3cd752ddc12/5785ccbe4b36753ef3876023f4eb7809e2e71a8af3c7fdf8e8b29f8d8dd0641c?apiKey=9ae4fe26caea4ec4b922b3cd752ddc12&",
  },
  {
    title: "Kitchen",
    image:
      "https://cdn.builder.io/api/v1/image/assets/9ae4fe26caea4ec4b922b3cd752ddc12/1dc7f7dc6e173e1b1e35aa654674d62d606fef952d0576f0ec38fbab876e4beb?apiKey=9ae4fe26caea4ec4b922b3cd752ddc12&",
  },
];

export function HomePage() {
  return (
    <main>
      <Header />
      <HeroSection />

      <section className="flex flex-col items-center px-16 w-full bg-white max-md:px-5 max-md:max-w-full">
        <div className="w-full max-w-[1120px] max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col">
            {categories.map((category, index) => (
              <div
                key={category.title}
                className={`flex flex-col ${
                  index === 0 ? "w-6/12" : "ml-5 w-6/12"
                } max-md:ml-0 max-md:w-full`}
              >
                <CategoryCard {...category} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="flex flex-col items-center pt-12 pl-20 w-full bg-white max-md:pl-5 max-md:max-w-full">
        <div className="flex flex-wrap gap-5 justify-between w-full font-medium tracking-tight max-w-[1120px] max-md:max-w-full">
          <h2 className="text-4xl leading-10 text-black">
            New
            <br />
            Arrivals
          </h2>
          <Link
            to="/products"
            className="flex overflow-hidden relative flex-col self-end mt-16 text-base leading-7 border-b border-solid aspect-[4.714] border-b-neutral-900 text-neutral-900 w-[132px] max-md:mt-10"
          >
            More Products
          </Link>
        </div>
        <div className="flex flex-wrap gap-6 self-end mt-12 max-md:mt-10">
          {products.map((product) => (
            <ProductCard key={product.name} product={product} />
          ))}
        </div>
        <div className="flex flex-col items-start mt-12 max-w-full bg-gray-200 rounded-[80px] w-[1120px] max-md:pr-5 max-md:mt-10">
          <div className="flex shrink-0 max-w-full h-1 bg-neutral-700 rounded-[80px] w-[834px]" />
        </div>
      </section>

      <section className="flex flex-col justify-center items-center px-16 py-12 w-full bg-white max-md:px-5 max-md:max-w-full">
        <div className="w-full max-w-[1120px] max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col">
            {[
              {
                icon: "https://cdn.builder.io/api/v1/image/assets/9ae4fe26caea4ec4b922b3cd752ddc12/3e5ec843eb5472fbb48e1b4545ff01a07418018188f4bdb255ec6ddb8815ac31?apiKey=9ae4fe26caea4ec4b922b3cd752ddc12&",
                title: "Free Shipping",
                description: "Order above $200",
              },
              {
                icon: "https://cdn.builder.io/api/v1/image/assets/9ae4fe26caea4ec4b922b3cd752ddc12/b8a0fd8160e58ee0fe918fb2b97a5e7b72f25fce92c4b590f46dcc4fd03ef3a4?apiKey=9ae4fe26caea4ec4b922b3cd752ddc12&",
                title: "Money-back",
                description: "30 days guarantee",
              },
              {
                icon: "https://cdn.builder.io/api/v1/image/assets/9ae4fe26caea4ec4b922b3cd752ddc12/994ca45c330b7b6a47d574edeaf040cbb965d0bf92d6b762340d15954b0de408?apiKey=9ae4fe26caea4ec4b922b3cd752ddc12&",
                title: "Secure Payments",
                description: "Secured by Stripe",
              },
              {
                icon: "https://cdn.builder.io/api/v1/image/assets/9ae4fe26caea4ec4b922b3cd752ddc12/994ca45c330b7b6a47d574edeaf040cbb965d0bf92d6b762340d15954b0de408?apiKey=9ae4fe26caea4ec4b922b3cd752ddc12&",
                title: "24/7 Support",
                description: "Phone and Email support",
              },
            ].map((feature) => (
              <article
                key={feature.title}
                className="flex flex-col w-3/12 max-md:ml-0 max-md:w-full"
              >
                <div className="flex flex-col grow justify-center items-start px-8 py-12 w-full bg-gray-100 max-md:px-5 max-md:mt-6">
                  <img
                    loading="lazy"
                    src={feature.icon}
                    alt=""
                    className="object-contain w-12 aspect-square"
                  />
                  <h3 className="mt-4 text-xl font-medium leading-snug text-neutral-900">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-500">
                    {feature.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
      <Footer />
    </main>
  );
}
export default HomePage;
