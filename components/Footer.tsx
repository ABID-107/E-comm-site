export default function Footer() {
  return (
    <div>
      <footer className="bg-neutral-950 text-white border-t border-white/10" role="contentinfo">
        <div className="max-w-7xl mx-auto px-6 lg:px-16 py-16">
          {/* <!-- Main Footer --> */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
            {/* <!-- Brand --> */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center font-bold text-lg" aria-hidden="true">
                  E
                </div>
                <span className="text-xl font-bold">Elevora</span>
              </div>

              <p className="max-w-sm text-sm leading-6 text-white/50">
                Discover premium products curated for modern lifestyles.
                Quality, style, and convenience — all in one place.
              </p>

              {/* <!-- Social --> */}
              <div className="flex gap-3 mt-6" role="list" aria-label="Social media links">
                <a
                  href="#"
                  className="w-10 h-10 rounded-xl border border-white/10 hover:bg-white/10 transition flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-neutral-950"
                  role="listitem"
                  aria-label="X (Twitter)"
                >
                  𝕏
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-xl border border-white/10 hover:bg-white/10 transition flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-neutral-950"
                  role="listitem"
                  aria-label="GitHub"
                >
                  ◎
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-xl border border-white/10 hover:bg-white/10 transition flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-neutral-950"
                  role="listitem"
                  aria-label="Facebook"
                >
                  f
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-xl border border-white/10 hover:bg-white/10 transition flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-neutral-950"
                  role="listitem"
                  aria-label="LinkedIn"
                >
                  in
                </a>
              </div>
            </div>

            {/* <!-- Shop --> */}
            <div>
              <h3 className="font-semibold mb-5">Shop</h3>

              <ul className="space-y-3 text-sm text-white/50" role="list">
                <li>
                  <a href="#" className="hover:text-white transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-neutral-950 rounded">
                    All Products
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-neutral-950 rounded">
                    New Arrivals
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-neutral-950 rounded">
                    Best Sellers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-neutral-950 rounded">
                    Collections
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-neutral-950 rounded">
                    Special Offers
                  </a>
                </li>
              </ul>
            </div>

            {/* <!-- Company --> */}
            <div>
              <h3 className="font-semibold mb-5">Company</h3>

              <ul className="space-y-3 text-sm text-white/50" role="list">
                <li>
                  <a href="#" className="hover:text-white transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-neutral-950 rounded">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-neutral-950 rounded">
                    Our Story
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-neutral-950 rounded">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-neutral-950 rounded">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-neutral-950 rounded">
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            {/* <!-- Support --> */}
            <div>
              <h3 className="font-semibold mb-5">Support</h3>

              <ul className="space-y-3 text-sm text-white/50" role="list">
                <li>
                  <a href="#" className="hover:text-white transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-neutral-950 rounded">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-neutral-950 rounded">
                    Shipping & Delivery
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-neutral-950 rounded">
                    Returns & Refunds
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-neutral-950 rounded">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-neutral-950 rounded">
                    Terms & Conditions
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* <!-- Newsletter --> */}
          <div className="mt-14 pt-10 border-t border-white/10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <h3 className="font-semibold text-lg">Stay in the loop</h3>
              <p className="text-sm text-white/40 mt-1">
                Get exclusive offers and new collection updates.
              </p>
            </div>

            <div className="flex w-full lg:w-auto">
              <label htmlFor="newsletter-email" className="sr-only">Email address</label>
              <input
                type="email"
                id="newsletter-email"
                placeholder="Enter your email"
                className="w-full lg:w-72 px-5 py-3 rounded-l-xl bg-white/5 border border-white/10 outline-none focus:border-indigo-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-neutral-950"
                autoComplete="email"
              />

              <button type="button" className="px-6 py-3 rounded-r-xl bg-indigo-500 hover:bg-indigo-400 transition font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-neutral-950">
                Subscribe
              </button>
            </div>
          </div>

          {/* <!-- Bottom --> */}
          <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-3 text-xs text-white/40">
            <p>© 2026 Elevora. All rights reserved.</p>

            <div className="flex gap-5" role="list" aria-label="Legal links">
              <a href="#" className="hover:text-white transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-neutral-950 rounded" role="listitem">
                Privacy
              </a>
              <a href="#" className="hover:text-white transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-neutral-950 rounded" role="listitem">
                Terms
              </a>
              <a href="#" className="hover:text-white transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-neutral-950 rounded" role="listitem">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}