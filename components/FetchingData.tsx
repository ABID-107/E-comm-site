import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/useCart";
import { useWishlist } from "../context/useWishlist";
import { FiShoppingCart } from "react-icons/fi";
import { Product } from "../types";

function ProductSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div
      className="flex flex-wrap gap-4 justify-center mt-10"
      role="status"
      aria-label="Loading products"
    >
      {[...Array(count)].map((_, i) => (
        <div key={i} className="w-full">
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

function EmptyState({ searchQuery }: { searchQuery: string }) {
  return (
    <div className="w-full text-center py-16" role="status">
      <div className="text-6xl mb-4" aria-hidden="true">
        🔍
      </div>
      <h3 className="text-xl font-semibold mb-2">
        {searchQuery
          ? `No products found for "${searchQuery}"`
          : "No Products Available"}
      </h3>
      <p className="text-white/50 max-w-md mx-auto mb-6">
        {searchQuery
          ? "Try adjusting your search or browse our collections below."
          : "We couldn't find any products at the moment."}
      </p>
      {searchQuery && (
        <button
          onClick={() => (window.location.href = "/hero")}
          className="px-6 py-3 bg-indigo-500 hover:bg-indigo-400 rounded-xl font-semibold transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-neutral-950"
        >
          Clear Search & Browse All
        </button>
      )}
    </div>
  );
}

export default function FetchingData({
  searchQuery = "",
  products = [],
  isLoading = false,
}: { searchQuery?: string; products?: Product[]; isLoading?: boolean }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return products;
    const query = searchQuery.toLowerCase();
    return products.filter(
      (product) =>
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query),
    );
  }, [products, searchQuery]);

  if (isLoading) {
    return <ProductSkeleton count={8} />;
  }

  if (products.length === 0) {
    return <EmptyState searchQuery="" />;
  }

  if (filteredProducts.length === 0) {
    return <EmptyState searchQuery={searchQuery} />;
  }

  return (
    <div
      className="grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-5 mt-10"
      role="list"
      aria-label="Products"
    >
      {filteredProducts.map((item) => {
        const inWishlist = isInWishlist(item.id);
        return (
          <div
            className="w-full h-full min-h-[clamp(12rem,32vw,14rem)]"
            role="listitem"
          >
            <div className="card bg-neutral-900 border border-white/10 shadow-sm hover:border-indigo-500/50 transition relative h-full">
              <Link
                to={`/product/${item.id}`}
                className="block focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-neutral-950 rounded-xl"
              >
                <figure className="p-[clamp(0.5rem,3vw,2.5rem)] pt-[clamp(0.5rem,3vw,2.5rem)] relative">
                  <img
                    src={item.thumbnail}
                    alt={`${item.title} - ${item.category} product`}
                    className="w-full h-[clamp(6rem,20vw,12rem)] object-contain mx-auto"
                    loading="lazy"
                  />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleWishlist(item);
                    }}
                    className={`absolute top-[clamp(0.4rem,1.5vw,1rem)] right-[clamp(0.4rem,1.5vw,1rem)]
                w-[clamp(1.5rem,5vw,2.5rem)] h-[clamp(1.5rem,5vw,2.5rem)]
                rounded-full bg-white/10 hover:bg-white/20 transition
                flex items-center justify-center text-[clamp(0.75rem,2.5vw,1.25rem)]
                ${inWishlist ? "text-red-400" : "text-white/50"}
                focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-neutral-950`}
                    aria-label={
                      inWishlist
                        ? `Remove ${item.title} from wishlist`
                        : `Add ${item.title} to wishlist`
                    }
                    aria-pressed={inWishlist}
                  >
                    {inWishlist ? "♥" : "♡"}
                  </button>
                </figure>
              </Link>

              <div className="card-body items-center text-center p-[clamp(0.75rem,3vw,1.5rem)] gap-[clamp(0.375rem,1.5vw,0.75rem)]">
                <Link
                  to={`/product/${item.id}`}
                  className="block w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-neutral-950 rounded-lg"
                >
                  <h2 className="card-title justify-center text-white text-[clamp(0.8125rem,2.2vw,1.0625rem)] line-clamp-1">
                    {item.title}
                  </h2>
                  <p className="text-white/50 text-[clamp(0.6875rem,1.8vw,0.875rem)] line-clamp-1 sm:line-clamp-2">
                    {item.description}
                  </p>
                </Link>

                <div className="card-actions mt-[clamp(0.5rem,2vw,1rem)] flex flex-row flex-nowrap gap-[clamp(0.375rem,1.5vw,0.75rem)] w-full justify-center items-center">
                  <Link
                    to={`/product/${item.id}`}
                    className="bg-zinc-700 flex flex-1 min-w-0 rounded-full justify-center items-center
                p-[clamp(0.5rem,2vw,0.9rem)] text-[clamp(0.6875rem,1.8vw,0.9375rem)]
                truncate font-medium lg:font-semibold
                focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:ring-offset-2 focus:ring-offset-neutral-950"
                  >
                    View Details
                  </Link>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      addToCart(item, 1);
                    }}
                    className="flex-none flex items-center justify-center rounded-full bg-zinc-700
                w-[clamp(2.25rem,7vw,3rem)] h-[clamp(2.25rem,7vw,3rem)]
                text-[clamp(0.875rem,2.2vw,1.125rem)]
                focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:ring-offset-2 focus:ring-offset-neutral-950"
                    aria-label={`Add ${item.title} to cart`}
                  >
                    <FiShoppingCart />
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}