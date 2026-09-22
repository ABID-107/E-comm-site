import { Link } from "react-router-dom";

export default function OrderConfirmation({
  orderId,
  estimatedDelivery,
  backToPath = "/hero",
  children,
}) {
  const hasDetails = Boolean(orderId) || Boolean(estimatedDelivery);

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center px-6 py-24">
      <section
        className="w-full max-w-lg bg-neutral-900 border border-white/10 rounded-2xl p-8 sm:p-12 text-center"
        aria-labelledby="order-confirmed-heading"
      >
        <div
          className="w-20 h-20 mx-auto mb-6 bg-green-500/20 rounded-full flex items-center justify-center"
          aria-hidden="true"
        >
          <svg
            className="w-10 h-10 text-green-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1
          id="order-confirmed-heading"
          className="text-3xl lg:text-4xl font-bold mb-4"
        >
          Order Confirmed
        </h1>

        <p className="text-white/60 mb-8 max-w-md mx-auto">
          Your product will arrive at your doorstep very soon.
        </p>

        {children}

        {hasDetails && (
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-neutral-950 border border-white/10 rounded-xl p-5 mb-8">
            {orderId && (
              <div>
                <dt className="text-xs uppercase tracking-wide text-white/50 mb-1">
                  Order ID
                </dt>
                <dd className="font-mono text-sm font-semibold break-all">
                  {orderId}
                </dd>
              </div>
            )}
            {estimatedDelivery && (
              <div>
                <dt className="text-xs uppercase tracking-wide text-white/50 mb-1">
                  Estimated Delivery
                </dt>
                <dd className="text-sm font-semibold">{estimatedDelivery}</dd>
              </div>
            )}
          </dl>
        )}

        <Link
          to={backToPath}
          className="inline-flex px-8 py-3 bg-indigo-500 hover:bg-indigo-400 rounded-xl font-semibold transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-neutral-950"
          aria-label={`Back to shopping`}
        >
          Back to Shopping
        </Link>
      </section>
    </div>
  );
}