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
    id: 1,
    image:
      "https://i.pinimg.com/474x/d0/98/0e/d0980ee3786258228c0e73c61f64c727.jpg",
    name: "Product 1",
    price: 199.0,
    originalPrice: 400.0,
    isNew: true,
    discount: 50,
    rating:
      "https://i.pinimg.com/564x/0e/a1/f9/0ea1f9393a423e4198644ec9408317ce.jpg", // Optional
  },
  {
    id: 2,
    image:
      "https://i.pinimg.com/474x/a9/95/27/a99527df5f3be478ded05371d998a060.jpg",
    name: "Product 1",
    price: 199.0,
    originalPrice: 400.0,
    isNew: true,
    discount: 50,
    rating:
      "https://i.pinimg.com/564x/0e/a1/f9/0ea1f9393a423e4198644ec9408317ce.jpg", // Optional
  },
  {
    id: 3,
    image:
      "https://i.pinimg.com/236x/91/3f/4a/913f4a71da79ce423e3bf5ae46cf9c54.jpg",
    name: "Product 2", // Change name for uniqueness
    price: 199.0,
    originalPrice: 400.0,
    isNew: true,
    discount: 50,
    rating:
      "https://i.pinimg.com/564x/0e/a1/f9/0ea1f9393a423e4198644ec9408317ce.jpg", // Optional
  },
  {
    id: 4,
    image:
      "https://i.pinimg.com/474x/e7/eb/fb/e7ebfb6346be8b771db8e195b5a47e1b.jpg",
    name: "Product 3", // Change name for uniqueness
    price: 199.0,
    originalPrice: 400.0,
    isNew: true,
    discount: 50,
    rating:
      "https://i.pinimg.com/564x/0e/a1/f9/0ea1f9393a423e4198644ec9408317ce.jpg", // Optional
  },
  {
    id: 5,
    image:
      "https://i.pinimg.com/474x/a2/cc/37/a2cc37c96dedc3018aa9f484cf0ea7e2.jpg",
    name: "Product 4", // Change name for uniqueness
    price: 199.0,
    originalPrice: 400.0,
    isNew: true,
    discount: 50,
    rating:
      "https://i.pinimg.com/564x/0e/a1/f9/0ea1f9393a423e4198644ec9408317ce.jpg", // Optional
  },
  {
    id: 6,
    image:
      "https://i.pinimg.com/474x/43/84/8b/43848b3a937b3d4e96fc5ab48bccf494.jpg",
    name: "Product 5", // Change name for uniqueness
    price: 199.0,
    originalPrice: 400.0,
    isNew: true,
    discount: 50,
    rating:
      "https://i.pinimg.com/564x/0e/a1/f9/0ea1f9393a423e4198644ec9408317ce.jpg", // Optional
  },
  {
    id: 7,
    image:
      "https://i.pinimg.com/474x/e3/27/f2/e327f2fa25502d1e8376c4d875babb7b.jpg",
    name: "Product 6", // Change name for uniqueness
    price: 199.0,
    originalPrice: 400.0,
    isNew: true,
    discount: 50,
    rating:
      "https://i.pinimg.com/564x/0e/a1/f9/0ea1f9393a423e4198644ec9408317ce.jpg", // Optional
  },
  {
    id: 8,
    image:
      "https://i.pinimg.com/474x/36/7e/22/367e22664f75ad4ca39539c8ef0dd71a.jpg",
    name: "Product 7", // Change name for uniqueness
    price: 299.0,
    originalPrice: 500.0,
    isNew: true,
    discount: 40,
    rating:
      "https://i.pinimg.com/564x/0e/a1/f9/0ea1f9393a423e4198644ec9408317ce.jpg", // Optional
  },
  {
    id: 9,
    image:
      "https://i.pinimg.com/474x/f5/61/b1/f561b16383762c5b6d7a8f39f3c19a02.jpg",
    name: "Product 8", // Change name for uniqueness
    price: 249.0,
    originalPrice: 450.0,
    isNew: false,
    discount: 10,
    rating:
      "https://i.pinimg.com/564x/0e/a1/f9/0ea1f9393a423e4198644ec9408317ce.jpg", // Optional
  },
];

const categories = [
  {
    title: "Tunisian Jars",
    image:
      "https://i.pinimg.com/474x/ff/83/9d/ff839db119b6e89be9966d63d74b9354.jpg",
    className: "min-h-[664px]",
  },
  {
    title: "Tradition bowls",
    image:
      "https://i.pinimg.com/474x/c5/e3/3e/c5e33e73113885ba2548d6c50547d002.jpg",
  },
  {
    title: "Khazaf",
    image:
      "https://i.pinimg.com/474x/5b/f9/ec/5bf9ecee4f0f6d9c2995627439bdbc23.jpg",
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
          <h2
            className="text-4xl leading-10 text-black"
            style={{ color: "#EBBE43" }}
          >
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
                  <h3
                    className="mt-4 text-xl font-medium leading-snug"
                    style={{ color: "#EBBE43" }}
                  >
                    {feature.title}
                  </h3>
                  <p
                    className="mt-2 text-sm leading-6 text-zinc-500"
                    style={{ color: "#EBBE43" }}
                  >
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
