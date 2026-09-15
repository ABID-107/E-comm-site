import { useState, useEffect } from "react";
import Products from "/components/FetchingData";
import Navbar from "/components/Navbar";
import Footer from "/components/Footer";

const baseUrl = "https://dummyjson.com/products/";

function ProductSkeleton() {
  return (
    <div
      className="flex flex-wrap gap-4 justify-center mt-10"
      role="status"
      aria-label="Loading products"
    >
      {[...Array(8)].map((_, i) => (
        <div key={i} className="w-96">
          <div className="card bg-neutral-900 border border-white/10 shadow-sm">
            <figure className="px-10 pt-10">
              <div
                className="w-full h-48 bg-neutral-800 rounded-xl skeleton"
                aria-hidden="true"
              ></div>
            </figure>
            <div className="card-body items-center text-center">
              <div
                className="h-6 w-3/4 bg-neutral-800 rounded skeleton mb-2"
                aria-hidden="true"
              ></div>
              <div
                className="h-4 w-full bg-neutral-800 rounded skeleton mb-2"
                aria-hidden="true"
              ></div>
              <div
                className="h-4 w-1/2 bg-neutral-800 rounded skeleton"
                aria-hidden="true"
              ></div>
              <div className="card-actions mt-4 flex flex-col gap-2 w-full">
                <div
                  className="h-10 w-full bg-neutral-800 rounded skeleton"
                  aria-hidden="true"
                ></div>
                <div
                  className="h-10 w-full bg-neutral-800 rounded skeleton"
                  aria-hidden="true"
                ></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    fetch(baseUrl)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
      })
      .then((data) => {
        if (mounted) {
          setProducts(data.products);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (mounted) {
          setError(err.message);
          setLoading(false);
        }
      });
    return () => {
      mounted = false;
    };
  }, []);

  const retryFetch = () => {
    setLoading(true);
    setError(null);
    fetch(baseUrl)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
      })
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  return (
    <div>
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        products={products}
        className="w-full border-b border-white/10 bg-neutral-950/90 backdrop-blur-xl sticky top-0 z-50"
      />
      <div className="hero-section min-h-150 flex items-center bg-neutral-950 text-white px-6 lg:px-16 overflow-hidden">
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <span
              className="inline-flex px-4 py-2 rounded-full bg-white/10 border border-white/10 text-sm text-white/70"
              aria-label="New collection badge"
            >
              ✨ New Collection 2026
            </span>

            <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
              Elevate Your
              <span className="text-indigo-400">Everyday Style.</span>
            </h1>

            <p className="max-w-xl text-lg text-white/60 leading-relaxed">
              Discover premium products curated for modern lifestyles. Shop the
              latest collection with exclusive deals and fast delivery.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <button className="px-7 py-3 rounded-xl border border-white/20 hover:bg-white/10 transition font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-neutral-950">
                Explore Collection
              </button>
            </div>

            {/* Trust Indicators */}
            <div
              className="flex gap-8 pt-6 text-sm text-white/50"
              role="list"
              aria-label="Trust indicators"
            >
              <div role="listitem">
                <strong className="block text-white text-xl">10K+</strong>
                Happy Customers
              </div>

              <div role="listitem">
                <strong className="block text-white text-xl">500+</strong>
                Products
              </div>

              <div role="listitem">
                <strong className="block text-white text-xl">4.9★</strong>
                Customer Rating
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-black w-full p-10">
        {loading ? (
          <ProductSkeleton />
        ) : error ? (
          <div className="max-w-7xl mx-auto px-6 lg:px-16 py-12 text-center">
            <div className="text-6xl mb-4" aria-hidden="true">
              ⚠️
            </div>
            <h2 className="text-2xl font-bold mb-2">Failed to Load Products</h2>
            <p className="text-white/50 mb-6 max-w-md mx-auto">{error}</p>
            <button
              onClick={retryFetch}
              className="px-6 py-3 bg-indigo-500 hover:bg-indigo-400 rounded-xl font-semibold transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-neutral-950"
            >
              Try Again
            </button>
          </div>
        ) : (
          <Products
            searchQuery={searchQuery}
            products={products}
            isLoading={false}
          />
        )}
      </div>
      <Footer />
    </div>
  );
}
