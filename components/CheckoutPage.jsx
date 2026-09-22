import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "/context/useCart";
import Navbar from "/components/Navbar";
import Footer from "/components/Footer";
import OrderConfirmation from "/components/OrderConfirmation";

const initialFormState = {
  firstName: "",
  lastName: "",
  email: "",
  address: "",
  city: "",
  postalCode: "",
  country: "US",
  paymentMethod: "card",
  cardNumber: "",
  cardExpiry: "",
  cardCvv: "",
};

const paymentMethods = [
  { value: "card", label: "Credit/Debit Card", icon: "💳" },
  { value: "paypal", label: "PayPal", icon: "🅿️" },
  { value: "applepay", label: "Apple Pay", icon: "🍎" },
];

export default function CheckoutPage() {
  const { cartItems, subtotal, clearCart } = useCart();
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState("form");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderDetails, setOrderDetails] = useState({
    orderId: "",
    estimatedDelivery: "",
  });
  const [placedItems, setPlacedItems] = useState([]);

  const tax = subtotal * 0.1;
  const grandTotal = subtotal + tax;

  if (cartItems.length === 0 && step === "success") {
    return (
      <div className="min-h-screen bg-neutral-950 text-white">
        <div className="min-h-screen bg-neutral-950 text-white">
          <Navbar searchQuery="" onSearchChange={() => {}} products={[]} />
          <OrderConfirmation
            orderId={orderDetails.orderId}
            estimatedDelivery={orderDetails.estimatedDelivery}
            backToPath="/hero"
          >
            <div className="bg-neutral-950 border border-white/10 rounded-xl p-5 mb-8 text-left">
              <p className="font-semibold mb-2">Order Summary</p>
              <div className="space-y-2 text-sm">
                {placedItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between text-white/70"
                  >
                    <span>
                      {item.title} × {item.quantity}
                    </span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="border-t border-white/10 pt-2 flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${grandTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </OrderConfirmation>
          <Footer />
        </div>
        <Navbar searchQuery="" onSearchChange={() => {}} products={[]} />
        <div className="max-w-7xl mx-auto px-6 lg:px-16 py-24 text-center">
          <div className="text-6xl mb-6" aria-hidden="true">
            🛒
          </div>
          <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-white/50 mb-8 max-w-md mx-auto">
            Add some products to your cart before proceeding to checkout.
          </p>
          <Link
            to="/hero"
            className="inline-flex px-8 py-3 bg-indigo-500 hover:bg-indigo-400 rounded-xl font-semibold transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-neutral-950"
          >
            Continue Shopping
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const validateField = (name, value) => {
    switch (name) {
      case "firstName":
      case "lastName":
        return value.trim() ? "" : "This field is required";
      case "email":
        return value.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? ""
          : "Valid email is required";
      case "address":
      case "city":
      case "postalCode":
        return value.trim() ? "" : "This field is required";
      case "cardNumber":
        return formData.paymentMethod === "card" && value.trim()
          ? value.replace(/\s/g, "").length >= 16
            ? ""
            : "Valid card number required"
          : "";
      case "cardExpiry":
        return formData.paymentMethod === "card" && value.trim()
          ? /^\d{2}\/\d{2}$/.test(value)
            ? ""
            : "Format: MM/YY"
          : "";
      case "cardCvv":
        return formData.paymentMethod === "card" && value.trim()
          ? value.length >= 3
            ? ""
            : "Valid CVV required"
          : "";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
        isValid = false;
      }
    });
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setPlacedItems(cartItems);
    clearCart();
    const deliveryDate = new Date(Date.now() + 4 * 24 * 60 * 60 * 1000);
    setOrderDetails({
      orderId: `ORD-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
      estimatedDelivery: deliveryDate.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      }),
    });
    setStep("success");
  };

  const formatCardNumber = (value) => {
    const digits = value.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(.{4})/g, "$1 ").trim();
  };

  const formatExpiry = (value) => {
    const digits = value.replace(/\D/g, "").slice(0, 4);
    return digits.length > 2
      ? `${digits.slice(0, 2)}/${digits.slice(2)}`
      : digits;
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <Navbar searchQuery="" onSearchChange={() => {}} products={[]} />

      <div className="max-w-7xl mx-auto px-6 lg:px-16 py-12">
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold mb-2">Checkout</h1>
          <p className="text-white/50">
            Enter your details to complete your purchase
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid lg:grid-cols-3 gap-8"
          noValidate
        >
          {/* Form Section */}
          <div className="lg:col-span-2 space-y-8">
            {/* Contact Info */}
            <div className="bg-neutral-900 border border-white/10 rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span
                  className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400"
                  aria-hidden="true"
                >
                  1
                </span>
                Contact Information
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="label">
                    <span className="label-text">First Name *</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`input input-bordered w-full bg-neutral-950 border-white/10 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-neutral-950 ${errors.firstName ? "border-red-500" : ""}`}
                    placeholder="John"
                    required
                    aria-invalid={!!errors.firstName}
                    aria-describedby={
                      errors.firstName ? "firstName-error" : undefined
                    }
                    autoComplete="given-name"
                  />
                  {errors.firstName && (
                    <p
                      id="firstName-error"
                      className="text-red-400 text-sm mt-1"
                      role="alert"
                    >
                      {errors.firstName}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="lastName" className="label">
                    <span className="label-text">Last Name *</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`input input-bordered w-full bg-neutral-950 border-white/10 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-neutral-950 ${errors.lastName ? "border-red-500" : ""}`}
                    placeholder="Doe"
                    required
                    aria-invalid={!!errors.lastName}
                    aria-describedby={
                      errors.lastName ? "lastName-error" : undefined
                    }
                    autoComplete="family-name"
                  />
                  {errors.lastName && (
                    <p
                      id="lastName-error"
                      className="text-red-400 text-sm mt-1"
                      role="alert"
                    >
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>
              <div className="mt-4">
                <label htmlFor="email" className="label">
                  <span className="label-text">Email Address *</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`input input-bordered w-full bg-neutral-950 border-white/10 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-neutral-950 ${errors.email ? "border-red-500" : ""}`}
                  placeholder="john@example.com"
                  required
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  autoComplete="email"
                />
                {errors.email && (
                  <p
                    id="email-error"
                    className="text-red-400 text-sm mt-1"
                    role="alert"
                  >
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-neutral-900 border border-white/10 rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span
                  className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400"
                  aria-hidden="true"
                >
                  2
                </span>
                Shipping Address
              </h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="address" className="label">
                    <span className="label-text">Address *</span>
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`input input-bordered w-full bg-neutral-950 border-white/10 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-neutral-950 ${errors.address ? "border-red-500" : ""}`}
                    placeholder="123 Main Street"
                    required
                    aria-invalid={!!errors.address}
                    aria-describedby={
                      errors.address ? "address-error" : undefined
                    }
                    autoComplete="street-address"
                  />
                  {errors.address && (
                    <p
                      id="address-error"
                      className="text-red-400 text-sm mt-1"
                      role="alert"
                    >
                      {errors.address}
                    </p>
                  )}
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="city" className="label">
                      <span className="label-text">City *</span>
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`input input-bordered w-full bg-neutral-950 border-white/10 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-neutral-950 ${errors.city ? "border-red-500" : ""}`}
                      placeholder="New York"
                      required
                      aria-invalid={!!errors.city}
                      aria-describedby={errors.city ? "city-error" : undefined}
                      autoComplete="address-level2"
                    />
                    {errors.city && (
                      <p
                        id="city-error"
                        className="text-red-400 text-sm mt-1"
                        role="alert"
                      >
                        {errors.city}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="postalCode" className="label">
                      <span className="label-text">Postal Code *</span>
                    </label>
                    <input
                      type="text"
                      id="postalCode"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`input input-bordered w-full bg-neutral-950 border-white/10 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-neutral-950 ${errors.postalCode ? "border-red-500" : ""}`}
                      placeholder="10001"
                      required
                      aria-invalid={!!errors.postalCode}
                      aria-describedby={
                        errors.postalCode ? "postalCode-error" : undefined
                      }
                      autoComplete="postal-code"
                    />
                    {errors.postalCode && (
                      <p
                        id="postalCode-error"
                        className="text-red-400 text-sm mt-1"
                        role="alert"
                      >
                        {errors.postalCode}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <label htmlFor="country" className="label">
                    <span className="label-text">Country</span>
                  </label>
                  <select
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="select select-bordered w-full bg-neutral-950 border-white/10 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-neutral-950"
                    autoComplete="country"
                  >
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="UK">United Kingdom</option>
                    <option value="AU">Australia</option>
                    <option value="DE">Germany</option>
                    <option value="FR">France</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-neutral-900 border border-white/10 rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span
                  className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400"
                  aria-hidden="true"
                >
                  3
                </span>
                Payment Method
              </h2>
              <fieldset className="mb-4">
                <legend className="sr-only">Select payment method</legend>
                <div
                  className="grid gap-3"
                  role="radiogroup"
                  aria-label="Payment method"
                >
                  {paymentMethods.map((method) => (
                    <label
                      key={method.value}
                      className={`relative cursor-pointer flex items-center gap-4 p-4 rounded-xl border-2 transition focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-neutral-950 ${
                        formData.paymentMethod === method.value
                          ? "border-indigo-500 bg-indigo-500/10"
                          : "border-white/10 hover:border-white/20"
                      }`}
                    >
                      <input
                        type="radio"
                        id={`payment-${method.value}`}
                        name="paymentMethod"
                        value={method.value}
                        checked={formData.paymentMethod === method.value}
                        onChange={handleChange}
                        className="radio radio-primary focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-neutral-950"
                      />
                      <span className="text-2xl" aria-hidden="true">
                        {method.icon}
                      </span>
                      <span className="font-medium">{method.label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              {formData.paymentMethod === "card" && (
                <div className="space-y-4 border-t border-white/10 pt-6">
                  <div>
                    <label htmlFor="cardNumber" className="label">
                      <span className="label-text">Card Number *</span>
                    </label>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={(e) => {
                        setFormData((prev) => ({
                          ...prev,
                          cardNumber: formatCardNumber(e.target.value),
                        }));
                        const error = validateField(
                          "cardNumber",
                          formatCardNumber(e.target.value),
                        );
                        setErrors((prev) => ({ ...prev, cardNumber: error }));
                      }}
                      onBlur={handleBlur}
                      className={`input input-bordered w-full bg-neutral-950 border-white/10 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-neutral-950 ${errors.cardNumber ? "border-red-500" : ""}`}
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      required
                      aria-invalid={!!errors.cardNumber}
                      aria-describedby={
                        errors.cardNumber ? "cardNumber-error" : undefined
                      }
                      autoComplete="cc-number"
                      inputMode="numeric"
                    />
                    {errors.cardNumber && (
                      <p
                        id="cardNumber-error"
                        className="text-red-400 text-sm mt-1"
                        role="alert"
                      >
                        {errors.cardNumber}
                      </p>
                    )}
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="cardExpiry" className="label">
                        <span className="label-text">Expiry Date *</span>
                      </label>
                      <input
                        type="text"
                        id="cardExpiry"
                        name="cardExpiry"
                        value={formData.cardExpiry}
                        onChange={(e) => {
                          setFormData((prev) => ({
                            ...prev,
                            cardExpiry: formatExpiry(e.target.value),
                          }));
                          const error = validateField(
                            "cardExpiry",
                            formatExpiry(e.target.value),
                          );
                          setErrors((prev) => ({ ...prev, cardExpiry: error }));
                        }}
                        onBlur={handleBlur}
                        className={`input input-bordered w-full bg-neutral-950 border-white/10 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-neutral-950 ${errors.cardExpiry ? "border-red-500" : ""}`}
                        placeholder="MM/YY"
                        maxLength={5}
                        required
                        aria-invalid={!!errors.cardExpiry}
                        aria-describedby={
                          errors.cardExpiry ? "cardExpiry-error" : undefined
                        }
                        autoComplete="cc-exp"
                        inputMode="numeric"
                      />
                      {errors.cardExpiry && (
                        <p
                          id="cardExpiry-error"
                          className="text-red-400 text-sm mt-1"
                          role="alert"
                        >
                          {errors.cardExpiry}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="cardCvv" className="label">
                        <span className="label-text">CVV *</span>
                      </label>
                      <input
                        type="text"
                        id="cardCvv"
                        name="cardCvv"
                        value={formData.cardCvv}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`input input-bordered w-full bg-neutral-950 border-white/10 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-neutral-950 ${errors.cardCvv ? "border-red-500" : ""}`}
                        placeholder="123"
                        maxLength={4}
                        required
                        aria-invalid={!!errors.cardCvv}
                        aria-describedby={
                          errors.cardCvv ? "cardCvv-error" : undefined
                        }
                        autoComplete="cc-csc"
                        inputMode="numeric"
                      />
                      {errors.cardCvv && (
                        <p
                          id="cardCvv-error"
                          className="text-red-400 text-sm mt-1"
                          role="alert"
                        >
                          {errors.cardCvv}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-neutral-900 border border-white/10 rounded-2xl p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>

              <div
                className="space-y-3 mb-6 max-h-64 overflow-y-auto"
                role="list"
                aria-label="Order items"
              >
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3" role="listitem">
                    <img
                      src={item.thumbnail}
                      alt={`${item.title} - ${item.category} product`}
                      className="w-16 h-16 object-cover rounded-lg shrink-0"
                      loading="lazy"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {item.title}
                      </p>
                      <p className="text-xs text-white/50">
                        Qty: {item.quantity}
                      </p>
                      <p className="text-sm font-semibold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/10 pt-4 space-y-3">
                <div className="flex justify-between text-white/70">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-white/70">
                  <span>Tax (10%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-white/70">
                  <span>Shipping</span>
                  <span className="text-green-400">Free</span>
                </div>
                <div className="border-t border-white/10 pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${grandTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-6 px-6 py-4 bg-indigo-500 hover:bg-indigo-400 disabled:bg-indigo-500/50 disabled:cursor-not-allowed rounded-xl font-semibold text-lg transition flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-neutral-950"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin w-5 h-5"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Processing...
                  </>
                ) : (
                  `Place Order - $${grandTotal.toFixed(2)}`
                )}
              </button>

              <p className="text-xs text-white/40 text-center mt-4">
                Secure checkout • 256-bit encryption
              </p>
            </div>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
}
