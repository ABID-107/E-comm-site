import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/useCart";
import { useWishlist } from "../context/useWishlist";
import { Product } from "../types";

export default function Navbar({ searchQuery, onSearchChange, products = [] }: { searchQuery: string; onSearchChange: (value: string) => void; products?: Product[] }) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileSearchRef = useRef<HTMLDivElement>(null);
  const mobileSearchInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        event.target !== document.querySelector('[aria-controls="mobile-menu"]')
      ) {
        setShowMobileMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Closes the mobile search bar when tapping outside it (mirrors the mobile menu's
  // outside-click behavior above).
  useEffect(() => {
    function handleClickOutsideMobileSearch(event: MouseEvent) {
      if (
        mobileSearchRef.current &&
        !mobileSearchRef.current.contains(event.target as Node) &&
        event.target !==
          document.querySelector('[aria-controls="mobile-search"]')
      ) {
        setShowMobileSearch(false);
        setShowSuggestions(false);
        setHighlightedIndex(-1);
      }
    }
    document.addEventListener("mousedown", handleClickOutsideMobileSearch);
    return () =>
      document.removeEventListener("mousedown", handleClickOutsideMobileSearch);
  }, []);

  // Autofocus the mobile search field the moment it opens.
  useEffect(() => {
    if (showMobileSearch) {
      mobileSearchInputRef.current?.focus();
    }
  }, [showMobileSearch]);

  const filteredProducts = products
    .filter(
      (p: Product) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .slice(0, 5);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
        setHighlightedIndex(-1);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || filteredProducts.length === 0) {
      if (e.key === "Escape") {
        setShowSuggestions(false);
        setHighlightedIndex(-1);
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev < filteredProducts.length - 1 ? prev + 1 : 0,
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev > 0 ? prev - 1 : filteredProducts.length - 1,
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (highlightedIndex >= 0) {
        const selected = filteredProducts[highlightedIndex];
        navigate(`/product/${selected.id}`);
      }
      setShowSuggestions(false);
      setHighlightedIndex(-1);
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
      setHighlightedIndex(-1);
      inputRef.current?.focus();
    } else if (e.key === "Tab") {
      setShowSuggestions(false);
      setHighlightedIndex(-1);
    }
  };

  const handleInputFocus = () => {
    if (searchQuery.trim() && filteredProducts.length > 0) {
      setShowSuggestions(true);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onSearchChange(value);
    if (value.trim() && filteredProducts.length > 0) {
      setShowSuggestions(true);
      setHighlightedIndex(-1);
    } else {
      setShowSuggestions(false);
      setHighlightedIndex(-1);
    }
  };

  const selectSuggestion = (product: Product) => {
    navigate(`/product/${product.id}`);
    setShowSuggestions(false);
    setHighlightedIndex(-1);
    inputRef.current?.focus();
  };

  const selectMobileSuggestion = (product: Product) => {
    navigate(`/product/${product.id}`);
    setShowSuggestions(false);
    setHighlightedIndex(-1);
    setShowMobileSearch(false);
  };

  return (
    <div>
      {/* <!-- ================= NAVBAR ================= --> */}
      {/* RESPONSIVE FIX: height is now shorter on phones (h-16) and grows to h-20
          from the sm breakpoint up, so more content fits above the fold on small screens. */}
      <nav className="w-full border-b border-white/10 bg-neutral-950/90 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
          {/* <!-- Logo --> */}
          {/* RESPONSIVE FIX: shrink-0 keeps the logo from ever being squeezed by flex siblings. */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3 shrink-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-indigo-500 flex items-center justify-center font-bold text-base sm:text-lg">
              E
            </div>
            <span className="text-lg sm:text-xl font-bold">Elevora</span>
          </Link>

          {/* <!-- Navigation --> */}
          {/* RESPONSIVE FIX: gap scales down on smaller "md" widths (e.g. 768–1024px tablets)
              instead of a flat gap-8, preventing links from feeling cramped against the actions on the right. */}
          <div className="hidden md:flex items-center gap-4 lg:gap-8 text-sm text-white/60">
            <Link
              to="/"
              className="text-white hover:text-indigo-400 transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-neutral-950 rounded-md px-2 py-1 -ml-2 -mt-1"
            >
              Home
            </Link>
            <Link
              to="/hero"
              className="hover:text-white transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-neutral-950 rounded-md px-2 py-1 -ml-2 -mt-1"
            >
              Shop
            </Link>
            <Link
              to="/collections"
              className="hover:text-white transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-neutral-950 rounded-md px-2 py-1 -ml-2 -mt-1"
            >
              Collections
            </Link>
            <Link
              to="/new-arrivals"
              className="hover:text-white transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-neutral-950 rounded-md px-2 py-1 -ml-2 -mt-1"
            >
              New Arrivals
            </Link>
            <Link
              to="/deals"
              className="hover:text-white transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-neutral-950 rounded-md px-2 py-1 -ml-2 -mt-1"
            >
              Deals
            </Link>
          </div>

          {/* <!-- Actions --> */}
          {/* RESPONSIVE FIX: gap-2 on phones, gap-3 from sm up, so icons don't crowd on narrow screens. */}
          <div className="flex items-center gap-2 sm:gap-3 relative shrink-0">
            {/* RESPONSIVE FIX: this inline field is now desktop/tablet-only (md and up).
                On mobile it's replaced by a search icon that expands a full-width search
                bar below the navbar (see the mobile search bar block after this row). */}
            <label className="hidden md:flex input rounded-2xl bg-transparent border-none relative flex-1 min-w-0 max-w-35 sm:max-w-55 md:max-w-xs">
              <svg
                className="h-[1em] opacity-50 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </g>
              </svg>
              <input
                ref={inputRef}
                type="search"
                required
                placeholder="Search products..."
                value={searchQuery}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                onKeyDown={handleKeyDown}
                className="w-full bg-transparent outline-none pl-10 pr-3 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-neutral-950 rounded-xl"
                aria-autocomplete="list"
                aria-controls="search-suggestions"
                aria-expanded={showSuggestions && filteredProducts.length > 0}
                aria-label="Search products"
                role="combobox"
              />

              {/* Dropdown Suggestions */}
              {/* RESPONSIVE FIX: dropdown now uses a viewport-relative min-width on small screens
                  (via left-0 right-auto + w-[min(90vw,20rem)]) so it doesn't get clipped or overflow
                  the screen edge when the search field itself is narrow. */}
              {showSuggestions && filteredProducts.length > 0 && (
                <div
                  ref={dropdownRef}
                  id="search-suggestions"
                  role="listbox"
                  className="absolute left-0 top-full mt-2 w-[min(90vw,20rem)] bg-neutral-900 border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50 animate-in fade-in-0 zoom-in-95 duration-150"
                  aria-label="Search suggestions"
                >
                  <ul
                    className="py-2 max-h-60 overflow-y-auto"
                    role="presentation"
                  >
                    {filteredProducts.map((product, index) => (
                      <li
                        key={product.id}
                        role="option"
                        aria-selected={index === highlightedIndex}
                        onClick={() => selectSuggestion(product)}
                        onMouseEnter={() => setHighlightedIndex(index)}
                        className={`flex items-center gap-3 px-4 py-2.5 hover:bg-white/5 transition cursor-pointer ${
                          index === highlightedIndex ? "bg-white/10" : ""
                        }`}
                        id={`search-suggestion-${index}`}
                      >
                        <img
                          src={product.thumbnail}
                          alt=""
                          aria-hidden="true"
                          className="w-10 h-10 object-cover rounded-lg shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-white truncate">
                            {product.title}
                          </p>
                          <p className="text-xs text-white/50 capitalize">
                            {product.category}
                          </p>
                        </div>
                        <span
                          className="text-sm font-semibold text-white/70 shrink-0"
                          aria-hidden="true"
                        >
                          ${product.price}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </label>

            {/* Mobile-only search icon: opens the full-width search bar below the navbar. */}
            <button
              className="md:hidden w-9 h-9 sm:w-10 sm:h-10 rounded-xl border border-white/10 hover:bg-white/10 transition flex items-center justify-center focus:outline-none focus:ring-offset-2 focus:ring-offset-neutral-950 shrink-0"
              aria-label={showMobileSearch ? "Close search" : "Open search"}
              aria-expanded={showMobileSearch}
              aria-controls="mobile-search"
              onClick={() => {
                setShowMobileSearch((prev) => !prev);
                setShowMobileMenu(false);
              }}
            >
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </g>
              </svg>
            </button>

            <Link
              to="/wishlist"
              className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl border border-white/10 hover:bg-white/10 transition flex items-center justify-center focus:outline-none focus:ring-offset-2 focus:ring-offset-neutral-950 shrink-0"
              aria-label={`Wishlist${wishlistCount > 0 ? `, ${wishlistCount} items` : ""}`}
            >
              ♡
              {wishlistCount > 0 && (
                <span
                  className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-[10px] flex items-center justify-center"
                  aria-hidden="true"
                >
                  {wishlistCount > 99 ? "99+" : wishlistCount}
                </span>
              )}
            </Link>

            <Link
              to="/cart"
              className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl border border-white/10 hover:bg-white/10 transition flex items-center justify-center focus:outline-none focus:ring-offset-2 focus:ring-offset-neutral-950 shrink-0"
              aria-label={`Shopping cart${cartCount > 0 ? `, ${cartCount} items` : ""}`}
            >
              🛒
              {cartCount > 0 && (
                <span
                  className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-indigo-500 text-[10px] flex items-center justify-center"
                  aria-hidden="true"
                >
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>

            {/* RESPONSIVE FIX: moved from "hidden sm:block" to "hidden md:block" so this button
                only appears once the full desktop nav also appears (both now switch at the same
                md breakpoint), avoiding a cramped 640–767px zone with no visible nav links. */}
            <button className="hidden md:block px-5 py-2.5 rounded-xl bg-white text-neutral-900 hover:bg-indigo-400 hover:text-white transition text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-neutral-950 shrink-0">
              Account
            </button>

            <button
              className="md:hidden w-9 h-9 sm:w-10 sm:h-10 rounded-xl border border-white/10 hover:bg-white/10 transition flex items-center justify-center focus:outline-none focus:ring-offset-2 focus:ring-offset-neutral-950 shrink-0"
              aria-label={showMobileMenu ? "Close menu" : "Open menu"}
              aria-expanded={showMobileMenu}
              aria-controls="mobile-menu"
              onClick={() => {
                setShowMobileMenu((prev) => !prev);
                setShowMobileSearch(false);
              }}
            >
              {showMobileMenu ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile search bar: expands into a full-width row below the navbar when the
            search icon is tapped. Suggestions render as a card beneath it, and the
            remaining page content is blurred behind everything (not covered by a drawer). */}
        {showMobileSearch && (
          <>
            {/* top-full anchors this to the bottom of the navbar block (row 1 + this search
                row), so it adjusts automatically to the navbar's actual height. Since the
                nav is sticky, this stays pinned in view like a fixed overlay while open. */}
            <div
              className="absolute inset-x-0 top-full h-screen z-30 bg-neutral-950/30 backdrop-blur-md md:hidden animate-in fade-in duration-200"
              onClick={() => setShowMobileSearch(false)}
              aria-hidden="true"
            />

            <div
              ref={mobileSearchRef}
              id="mobile-search"
              className="relative z-40 md:hidden border-t border-white/10 bg-neutral-950 px-4 py-3 animate-in fade-in slide-in-from-top-2 duration-200"
            >
              <label className="input outline-none rounded-2xl bg-white/5 border border-white/10 relative flex w-full">
                <svg
                  className="h-[1em] opacity-50 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.3-4.3"></path>
                  </g>
                </svg>
                <input
                  ref={mobileSearchInputRef}
                  type="search"
                  required
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  onKeyDown={handleKeyDown}
                  className="w-full bg-transparent outline-none pl-10 pr-3 py-2.5 focus:ring-offset-2 focus:ring-offset-neutral-950 rounded-xl"
                  aria-autocomplete="list"
                  aria-controls="mobile-search-suggestions"
                  aria-expanded={showSuggestions && filteredProducts.length > 0}
                  aria-label="Search products"
                  role="combobox"
                />
              </label>

              {showSuggestions && filteredProducts.length > 0 && (
                <div
                  id="mobile-search-suggestions"
                  role="listbox"
                  className="mt-2 bg-neutral-900 absolute border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in-0 zoom-in-95 duration-150"
                  aria-label="Search suggestions"
                >
                  <ul
                    className="py-2 max-h-72 overflow-y-auto"
                    role="presentation"
                  >
                    {filteredProducts.map((product, index) => (
                      <li
                        key={product.id}
                        role="option"
                        aria-selected={index === highlightedIndex}
                        onClick={() => selectMobileSuggestion(product)}
                        onMouseEnter={() => setHighlightedIndex(index)}
                        className={`flex items-center gap-3 px-4 py-2.5 hover:bg-white/5 transition cursor-pointer ${
                          index === highlightedIndex ? "bg-white/10" : ""
                        }`}
                        id={`mobile-search-suggestion-${index}`}
                      >
                        <img
                          src={product.thumbnail}
                          alt=""
                          aria-hidden="true"
                          className="w-10 h-10 object-cover rounded-lg shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-white truncate">
                            {product.title}
                          </p>
                          <p className="text-xs text-white/50 capitalize">
                            {product.category}
                          </p>
                        </div>
                        <span
                          className="text-sm font-semibold text-white/70 shrink-0"
                          aria-hidden="true"
                        >
                          ${product.price}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </>
        )}

        {/* Mobile dropdown menu: a compact card anchored under the hamburger button,
            with the page content behind it blurred rather than covered by a full drawer. */}
        {showMobileMenu && (
          <>
            {/* Blur layer sits below the navbar (top-16/sm:top-20) and blurs whatever
                content scrolls underneath it. Tapping it closes the menu. */}
            <div
              className="fixed inset-x-0 top-16 sm:top-20 bottom-0 z-30 bg-neutral-950/30 backdrop-blur-md md:hidden animate-in fade-in duration-200"
              onClick={() => setShowMobileMenu(false)}
              aria-hidden="true"
            />

            {/* Dropdown card, anchored to the navbar's right edge under the hamburger */}
            <div
              ref={mobileMenuRef}
              id="mobile-menu"
              role="navigation"
              aria-label="Mobile navigation"
              className="absolute right-4 sm:right-6 top-full mt-2 z-40 w-60 md:hidden bg-neutral-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden origin-top-right animate-in fade-in zoom-in-95 slide-in-from-top-2 duration-200"
            >
              <div className="py-2">
                {[
                  { to: "/", label: "Home", icon: "🏠", active: true },
                  { to: "/hero", label: "Shop", icon: "🛍️" },
                  { to: "/collections", label: "Collections", icon: "🗂️" },
                  { to: "/new-arrivals", label: "New Arrivals", icon: "✨" },
                  { to: "/deals", label: "Deals", icon: "🔥" },
                ].map((item, i) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setShowMobileMenu(false)}
                    className={`group relative flex items-center gap-3 px-4 py-2.5 transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 animate-in fade-in slide-in-from-top-1 ${
                      item.active
                        ? "text-white bg-white/5"
                        : "text-white/75 hover:text-white hover:bg-white/5"
                    }`}
                    style={{
                      animationDuration: "200ms",
                      animationDelay: `${i * 30}ms`,
                      animationFillMode: "backwards",
                    }}
                  >
                    <span
                      className={`absolute left-0 top-1/2 -translate-y-1/2 h-4 w-[3px] rounded-full bg-indigo-400 transition-transform origin-center ${
                        item.active
                          ? "scale-y-100"
                          : "scale-y-0 group-hover:scale-y-100"
                      }`}
                      aria-hidden="true"
                    />
                    <span className="text-base" aria-hidden="true">
                      {item.icon}
                    </span>
                    <span className="flex-1 text-sm font-medium">
                      {item.label}
                    </span>
                  </Link>
                ))}
              </div>

              <div className="border-t border-white/10 py-2">
                <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-white/75 hover:text-white hover:bg-white/5 transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="text-base" aria-hidden="true">
                    👤
                  </span>
                  Account
                </button>
              </div>
            </div>
          </>
        )}
      </nav>
    </div>
  );
}