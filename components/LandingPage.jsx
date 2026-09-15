import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div>
      <div className="min-h-screen bg-neutral-950 text-white">
        {/* <!-- ================= HERO ================= --> */}
        <section className="relative overflow-hidden" aria-labelledby="hero-heading">
          {/* <!-- Background Glow --> */}
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-175 h-125 bg-indigo-500/20 blur-[140px] rounded-full" aria-hidden="true"></div>

          <div className="relative max-w-7xl mx-auto px-6 lg:px-16 py-24 lg:py-32 grid lg:grid-cols-2 gap-16 items-center">
            {/* <!-- Hero Content --> */}
            <div>
              <span className="inline-flex px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-400/20 text-indigo-300 text-sm mb-6" aria-label="New collection badge">
                ✨ New Collection 2026
              </span>

              <h1 id="hero-heading" className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
                Elevate Your
                <span className="block text-indigo-400">Everyday Style.</span>
              </h1>

              <p className="mt-7 max-w-xl text-lg leading-8 text-white/50">
                Discover premium products carefully curated for modern
                lifestyles. Shop quality products with exclusive deals and fast
                delivery.
              </p>

              <div className="flex flex-wrap gap-4 mt-9">
                <Link
                  to="/hero"
                  className="px-7 py-3.5 rounded-xl bg-indigo-500 hover:bg-indigo-400 transition font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-neutral-950"
                >
                  Shop Now →
                </Link>

                <button className="px-7 py-3.5 rounded-xl border border-white/15 hover:bg-white/10 transition font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-neutral-950">
                  Explore Collection
                </button>
              </div>

              {/* <!-- Stats --> */}
              <div className="flex gap-8 mt-12" role="list" aria-label="Trust indicators">
                <div role="listitem">
                  <p className="text-2xl font-bold">10K+</p>
                  <p className="text-sm text-white/40 mt-1">Happy Customers</p>
                </div>

                <div role="listitem">
                  <p className="text-2xl font-bold">500+</p>
                  <p className="text-sm text-white/40 mt-1">Products</p>
                </div>

                <div role="listitem">
                  <p className="text-2xl font-bold">4.9★</p>
                  <p className="text-sm text-white/40 mt-1">Customer Rating</p>
                </div>
              </div>
            </div>

            {/* <!-- Hero Product --> */}
            <div className="relative flex justify-center" aria-hidden="true">
              <div className="absolute inset-10 bg-indigo-500/20 blur-[100px] rounded-full"></div>

              <div className="relative w-full max-w-lg aspect-square rounded-4xl border border-white/10 bg-white/4 backdrop-blur-xl flex items-center justify-center">
                <div className="text-center">
                  <div className="text-[120px] mb-5" aria-hidden="true">🛍️</div>

                  <p className="text-white/40 text-sm">Featured Collection</p>
                </div>

                {/* <!-- Offer Card --> */}
                <div className="absolute -bottom-6 -left-5 bg-white text-neutral-900 rounded-2xl px-6 py-4 shadow-2xl">
                  <p className="text-xs text-neutral-500">Limited Offer</p>

                  <p className="text-xl font-bold">Up to 40% OFF</p>
                </div>

                {/* <!-- Rating Card --> */}
                <div className="absolute -top-5 -right-5 bg-neutral-900 border border-white/10 rounded-2xl px-5 py-4 shadow-2xl">
                  <p className="text-yellow-400" aria-label="5 star rating">★★★★★</p>

                  <p className="text-xs text-white/40 mt-1">
                    4.9 Customer Rating
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* <!-- ================= TRUST BAR ================= --> */}
        <section className="border-y border-white/10 bg-white/2" aria-label="Trust features">
          <div className="max-w-7xl mx-auto px-6 lg:px-16 py-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex items-center gap-4" role="listitem">
              <span className="text-2xl" aria-hidden="true">🚚</span>
              <div>
                <p className="font-semibold text-sm">Free Shipping</p>
                <p className="text-xs text-white/40 mt-1">Orders over $50</p>
              </div>
            </div>

            <div className="flex items-center gap-4" role="listitem">
              <span className="text-2xl" aria-hidden="true">↩️</span>
              <div>
                <p className="font-semibold text-sm">Easy Returns</p>
                <p className="text-xs text-white/40 mt-1">30-day returns</p>
              </div>
            </div>

            <div className="flex items-center gap-4" role="listitem">
              <span className="text-2xl" aria-hidden="true">🔒</span>
              <div>
                <p className="font-semibold text-sm">Secure Payment</p>
                <p className="text-xs text-white/40 mt-1">100% protected</p>
              </div>
            </div>

            <div className="flex items-center gap-4" role="listitem">
              <span className="text-2xl" aria-hidden="true">💬</span>
              <div>
                <p className="font-semibold text-sm">24/7 Support</p>
                <p className="text-xs text-white/40 mt-1">We're here to help</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
