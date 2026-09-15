import { Link } from "react-router-dom";
import { useCart } from "/context/useCart";
import Navbar from "/components/Navbar";
import Footer from "/components/Footer";

export default function CartPage() {
  const { cartItems, cartCount, subtotal, updateQuantity, removeFromCart, clearCart } = useCart();

  const tax = subtotal * 0.1;
  const grandTotal = subtotal + tax;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white">
        <Navbar searchQuery="" onSearchChange={() => {}} products={[]} />
        <div className="max-w-7xl mx-auto px-6 lg:px-16 py-24 text-center">
          <div className="text-6xl mb-6" aria-hidden="true">🛒</div>
          <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-white/50 mb-8 max-w-md mx-auto">
            Looks like you haven't added any products yet. Start shopping to fill your cart!
          </p>
          <Link to="/hero" className="inline-flex px-8 py-3 bg-indigo-500 hover:bg-indigo-400 rounded-xl font-semibold transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-neutral-950">
            Continue Shopping
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
        <h1 className="text-3xl lg:text-4xl font-bold mb-8">Shopping Cart ({cartCount} items)</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 bg-neutral-900 border border-white/10 rounded-2xl p-4 hover:border-white/20 transition"
              >
                <Link to={`/product/${item.id}`} className="shrink-0 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-neutral-950 rounded-xl">
                  <img
                    src={item.thumbnail}
                    alt={`${item.title} - ${item.category} product`}
                    className="w-24 h-24 object-cover rounded-xl"
                    loading="lazy"
                  />
                </Link>

                <div className="flex-1 min-w-0">
                  <Link to={`/product/${item.id}`} className="block focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-neutral-950 rounded-lg">
                    <h3 className="font-semibold text-lg truncate hover:text-indigo-400 transition">
                      {item.title}
                    </h3>
                  </Link>
                  <p className="text-sm text-white/50 mt-1 capitalize">{item.category}</p>
                  <p className="text-lg font-bold text-white mt-2">${item.price}</p>
                </div>

                <div className="flex flex-col items-end gap-4">
                  <div className="flex items-center border border-white/10 rounded-xl overflow-hidden" role="group" aria-label={`Quantity for ${item.title}`}>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-3 py-2 hover:bg-white/5 transition text-white/70 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-neutral-950"
                      disabled={item.quantity <= 1}
                      aria-label={`Decrease quantity of ${item.title}`}
                      aria-disabled={item.quantity <= 1}
                    >
                      −
                    </button>
                    <span className="px-4 py-2 border-x border-white/10 text-lg font-medium min-w-12.5 text-center" aria-live="polite">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-3 py-2 hover:bg-white/5 transition text-white/70 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-neutral-950"
                      disabled={item.quantity >= item.stock}
                      aria-label={`Increase quantity of ${item.title}`}
                      aria-disabled={item.quantity >= item.stock}
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-400 hover:text-red-300 text-sm font-medium flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-neutral-950 rounded-lg"
                    aria-label={`Remove ${item.title} from cart`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Remove
                  </button>

                  <div className="text-right" aria-label={`Line total for ${item.title}`}>
                    <p className="font-semibold text-lg">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex justify-between items-center pt-4 border-t border-white/10">
              <button
                onClick={clearCart}
                className="text-white/50 hover:text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-neutral-950 rounded-lg px-2 py-1"
              >
                Clear Cart
              </button>
              <Link to="/hero" className="text-indigo-400 hover:text-indigo-300 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-neutral-950 rounded-lg px-2 py-1">
                ← Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-neutral-900 border border-white/10 rounded-2xl p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-white/70">
                  <span>Subtotal ({cartCount} items)</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-white/70">
                  <span>Estimated Tax (10%)</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-white/70">
                  <span>Shipping</span>
                  <span className="font-medium text-green-400">Free</span>
                </div>
                <div className="border-t border-white/10 pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${grandTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <Link
                to="/checkout"
                className="block w-full px-6 py-4 bg-indigo-500 hover:bg-indigo-400 rounded-xl font-semibold text-lg text-center transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-neutral-950"
              >
                Proceed to Checkout
              </Link>

              <p className="text-xs text-white/40 text-center mt-4">
                Secure checkout powered by Elevora
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}