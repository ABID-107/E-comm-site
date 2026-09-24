import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/useCart";
import { useWishlist } from "../context/useWishlist";
import { Product } from "../types";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const baseUrl = "https://dummyjson.com/products/";

function ProductSkeleton() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <Navbar searchQuery="" onSearchChange={() => {}} products={[]} />
      <div className="max-w-7xl mx-auto px-6 lg:px-16 py-12">
        <div className="grid lg:grid-cols-2 gap-12" role="status" aria-label="Loading product details">
          <div className="space-y-6">
            <div className="h-6 w-1/3 bg-neutral-800 rounded skeleton" aria-hidden="true"></div>
            <div className="h-10 w-3/4 bg-neutral-800 rounded skeleton" aria-hidden="true"></div>
            <div className="h-8 w-full bg-neutral-800 rounded skeleton" aria-hidden="true"></div>
            <div className="h-8 w-1/2 bg-neutral-800 rounded skeleton" aria-hidden="true"></div>
            <div className="h-12 w-48 bg-neutral-800 rounded skeleton" aria-hidden="true"></div>
          </div>
          <div>
            <div className="aspect-square bg-neutral-800 rounded-3xl skeleton" aria-hidden="true"></div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    let mounted = true;
    fetch(`${baseUrl}${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Product not found");
        return res.json();
      })
      .then((data) => {
        if (mounted) {
          setProduct(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (mounted) {
          setError(err.message);
          setLoading(false);
        }
      });
    return () => { mounted = false; };
  }, [id]);

  const retryFetch = () => {
    setLoading(true);
    setError(null);
    fetch(`${baseUrl}${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Product not found");
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };

  const handleBuyNow = () => {
    if (product) {
      navigate("/checkout", { state: { buyNowItem: { ...product, quantity } } });
    }
  };

  if (loading) {
    return <ProductSkeleton />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white">
        <Navbar searchQuery="" onSearchChange={() => {}} products={[]} />
        <div className="max-w-7xl mx-auto px-6 lg:px-16 py-24 text-center">
          <div className="text-6xl mb-4" aria-hidden="true">⚠️</div>
          <h2 className="text-2xl font-bold mb-2">Failed to Load Product</h2>
          <p className="text-white/50 mb-6 max-w-md mx-auto">{error}</p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={retryFetch}
              className="px-6 py-3 bg-indigo-500 hover:bg-indigo-400 rounded-xl font-semibold transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-neutral-950"
            >
              Try Again
            </button>
            <Link to="/hero" className="px-6 py-3 border border-white/10 hover:bg-white/5 rounded-xl font-semibold transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-neutral-950">
              Back to Shop
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl font-bold mb-2">Product Not Found</p>
          <Link to="/hero" className="text-indigo-400 hover:text-indigo-300 transition">
            ← Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const images = product.images?.length ? product.images : [product.thumbnail];

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <Navbar
        searchQuery=""
        onSearchChange={() => {}}
        products={[]}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-16 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-white/50 mb-8" aria-label="Breadcrumb">
          <Link to="/hero" className="hover:text-white transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-neutral-950 rounded">Home</Link>
          <span aria-hidden="true">/</span>
          <Link to="/hero" className="hover:text-white transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-neutral-950 rounded">Shop</Link>
          <span aria-hidden="true">/</span>
          <span className="text-white truncate max-w-xs" aria-current="page">{product.title}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-3xl bg-white/5 border border-white/10 overflow-hidden">
              <img
                src={images[selectedImage]}
                alt={`${product.title} - main product image`}
                className="w-full h-full object-cover"
              />
              {images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2" role="tablist" aria-label="Product images">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      role="tab"
                      aria-selected={index === selectedImage}
                      aria-label={`View image ${index + 1} of ${images.length}`}
                      className={`w-2 h-2 rounded-full transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-neutral-950 ${
                        index === selectedImage
                          ? "bg-white"
                          : "bg-white/30 hover:bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2" role="list" aria-label="Product thumbnails">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    role="listitem"
                    aria-label={`Select image ${index + 1}`}
                    aria-current={index === selectedImage ? "true" : "false"}
                    className={`shrink-0 w-20 h-20 rounded-xl border-2 overflow-hidden transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-neutral-950 ${
                      index === selectedImage
                        ? "border-indigo-500"
                        : "border-white/10 hover:border-white/30"
                    }`}
                  >
                    <img src={img} alt={`${product.title} - thumbnail ${index + 1}`} className="w-full h-full object-cover" loading="lazy" />
                  </button>
                ))}
              </div>
            )}

            {/* Rating & Stock */}
            <div className="flex items-center gap-4" role="group" aria-label="Product rating and stock">
              <div className="flex items-center gap-1">
                <span className="text-yellow-400" aria-label="5 star rating">★★★★★</span>
                <span className="text-white/50 ml-2">{product.rating} ({product.reviewCount || "120"} reviews)</span>
              </div>
              <span className="text-green-400 text-sm">In Stock: {product.stock} left</span>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <span className="text-sm text-indigo-400 uppercase tracking-wide">{product.category}</span>
              <h1 className="text-3xl lg:text-4xl font-bold mt-2">{product.title}</h1>
              <p className="mt-3 text-lg text-white/60">{product.description}</p>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-4" role="group" aria-label="Product price">
              <span className="text-4xl font-bold">${product.price}</span>
              {product.discountPercentage > 0 && (
                <span className="text-2xl text-white/40 line-through" aria-label={`Original price: $${(product.price * (1 + product.discountPercentage / 100)).toFixed(2)}`}>${(product.price * (1 + product.discountPercentage / 100)).toFixed(2)}</span>
              )}
              {product.discountPercentage > 0 && (
                <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium" aria-label={`${product.discountPercentage}% discount`}>
                  -{product.discountPercentage}%
                </span>
              )}
            </div>

            {/* Quantity Selector */}
            <div className="space-y-2">
              <label htmlFor="quantity" className="text-sm font-medium">Quantity</label>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-white/10 rounded-xl overflow-hidden" role="group" aria-label="Quantity selector">
                  <button
                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                    className="px-4 py-2 hover:bg-white/5 transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-neutral-950"
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span id="quantity" className="px-6 py-2 border-x border-white/10 text-lg font-medium min-w-15 text-center" aria-live="polite">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((prev) => Math.min(product.stock, prev + 1))}
                    className="px-4 py-2 hover:bg-white/5 transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-neutral-950"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
                <span className="text-sm text-white/40">Max: {product.stock}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 px-8 py-4 bg-indigo-500 hover:bg-indigo-400 rounded-xl font-semibold text-lg transition flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-neutral-950"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 px-8 py-4 border border-white/10 hover:bg-white/5 rounded-xl font-semibold text-lg transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-neutral-950"
              >
                Buy Now
              </button>
            </div>

            {/* Wishlist/Share */}
            <div className="flex items-center gap-4 pt-4 border-t border-white/10">
              <button
                onClick={() => toggleWishlist(product)}
                className={`w-12 h-12 rounded-xl border border-white/10 hover:bg-white/5 transition flex items-center justify-center text-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-neutral-950 ${
                  isInWishlist(product.id) ? "text-red-400 border-red-400/50" : ""
                }`}
                aria-label={isInWishlist(product.id) ? `Remove ${product.title} from wishlist` : `Add ${product.title} to wishlist`}
                aria-pressed={isInWishlist(product.id)}
              >
                {isInWishlist(product.id) ? "♥" : "♡"}
              </button>
              <button
                className="w-12 h-12 rounded-xl border border-white/10 hover:bg-white/5 transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-neutral-950"
                aria-label="Share product"
              >
                ⤴
              </button>
            </div>

            {/* Meta Info */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
              <div>
                <p className="text-xs text-white/40">SKU</p>
                <p className="font-medium">{product.sku || "N/A"}</p>
              </div>
              <div>
                <p className="text-xs text-white/40">Brand</p>
                <p className="font-medium">{product.brand || "N/A"}</p>
              </div>
              <div>
                <p className="text-xs text-white/40">Weight</p>
                <p className="font-medium">{product.weight}g</p>
              </div>
              <div>
                <p className="text-xs text-white/40">Dimensions</p>
                <p className="font-medium">{product.dimensions?.width}x{product.dimensions?.height}x{product.dimensions?.depth}cm</p>
              </div>
            </div>

            {/* Tags */}
            {product.tags?.length && (
              <div>
                <p className="text-xs text-white/40 mb-2">Tags</p>
                <div className="flex flex-wrap gap-2" role="list" aria-label="Product tags">
                  {product.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm" role="listitem">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <div className="border-b border-white/10 mb-8">
            <nav className="flex gap-8" aria-label="Product details" role="tablist">
              <button role="tab" aria-selected="true" className="pb-4 border-b-2 border-indigo-500 text-white font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-neutral-950 rounded">Description</button>
              <button role="tab" aria-selected="false" className="pb-4 border-b-2 border-transparent text-white/50 hover:text-white font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-neutral-950 rounded">Specifications</button>
              <button role="tab" aria-selected={false} className="pb-4 border-b-2 border-transparent text-white/50 hover:text-white font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-neutral-950 rounded">Reviews ({product.reviewCount || 120})</button>
              <button role="tab" aria-selected={false} className="pb-4 border-b-2 border-transparent text-white/50 hover:text-white font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-neutral-950 rounded">Shipping</button>
            </nav>
          </div>

          <div className="prose prose-invert max-w-none">
            <p className="text-white/60 leading-relaxed">{product.description}</p>

            {product.tags?.length && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">Features</h3>
                <ul className="space-y-2 text-white/60">
                  {product.tags.map((tag) => (
                    <li key={tag} className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-indigo-500 rounded-full" aria-hidden="true"></span>
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}