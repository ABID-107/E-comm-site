import { Link } from "react-router-dom";
import { useCart } from "../context/useCart";
import { useWishlist } from "../context/useWishlist";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function WishlistPage() {
  const { wishlistItems, wishlistCount, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white">
        <Navbar searchQuery="" onSearchChange={() => {}} products={[]} />
        <div className="max-w-7xl mx-auto px-6 lg:px-16 py-24 text-center">
          <div className="text-6xl mb-6" aria-hidden="true">♡</div>
          <h1 className="text-3xl font-bold mb-4">Your Wishlist is Empty</h1>
          <p className="text-white/50 mb-8 max-w-md mx-auto">
            Save items you love for later. Start shopping to fill your wishlist!
          </p>
          <Link to="/hero" className="inline-flex px-8 py-3 bg-indigo-500 hover:bg-indigo-400 rounded-xl font-semibold transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-neutral-950">
            Start Shopping
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <Navbar searchQuery="" onSearchChange={() => {}} products={[]} />

      <div className="max-w-7xl mx-auto px-6 lg:px-16 py-12">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <h1 className="text-3xl lg:text-4xl font-bold">My Wishlist ({wishlistCount} items)</h1>
          <button
            onClick={clearWishlist}
            className="text-white/50 hover:text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-neutral-950 rounded-lg px-2 py-1"
          >
            Clear All
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" role="list" aria-label="Wishlist items">
          {wishlistItems.map((item) => (
            <div
              key={item.id}
              className="card bg-neutral-900 border border-white/10 shadow-sm hover:border-white/20 transition group"
              role="listitem"
            >
              <figure className="relative p-4">
                <Link to={`/product/${item.id}`} className="block focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-neutral-950 rounded-xl">
                  <img src={item.thumbnail} alt={`${item.title} - ${item.category} product`} className="w-full h-56 object-cover rounded-xl" loading="lazy" />
                </Link>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    removeFromWishlist(item.id);
                  }}
                  className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/10 hover:bg-red-500/20 hover:text-red-400 transition flex items-center justify-center text-xl group-hover:opacity-100 opacity-0 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-neutral-950"
                  aria-label="Remove from wishlist"
                >
                  ♥
                </button>
              </figure>
              <div className="card-body p-4 pt-0">
                <Link to={`/product/${item.id}`} className="block focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-neutral-950 rounded-lg">
                  <h3 className="card-title text-white truncate group-hover:text-indigo-400 transition">{item.title}</h3>
                </Link>
                <p className="text-sm text-white/50 mt-1 capitalize">{item.category}</p>
                <p className="text-lg font-bold text-white mt-2">${item.price}</p>
                <div className="card-actions mt-4 flex flex-col gap-2">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      addToCart(item, 1);
                    }}
                    className="btn btn-primary w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-neutral-950"
                    aria-label={`Add ${item.title} to cart`}
                  >
                    Add to Cart
                  </button>
                  <Link to={`/product/${item.id}`} className="btn btn-ghost w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-neutral-950">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}