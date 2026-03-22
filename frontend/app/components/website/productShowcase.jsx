export default function ProductShowcase() {
  const products = [
    {
      name: "Espresso Dark Roast",
      description:
        "Bold and intense dark roast perfect for espresso. Sourced from organic farms in Palpa district.",
      image: "coffee-beans-bowl.jpg", // replace with real path or URL
    },
    {
      name: "Coffee Grinder",
      description:
        "Grinder perfect for small-batch fresh grinding. Durable cast iron body.",
      image: "coffee-grinder.jpg",
    },
    {
      name: "Roasted Beans",
      description:
        "Hand-roasted single origin beans from the highlands of Gulmi. Medium roast with notes of chocolate and citrus.",
      image: "roasted-coffee-beans.jpg",
    },
    {
      name: "Green Coffee Beans",
      description:
        "Unroasted specialty-grade green beans. Perfect for home roasting or wholesale buyers. 1kg pack.",
      image: "green-coffee-cherries.jpg",
    },
  ];

  return (
    <section className="py-16 px-5 md:px-10 lg:px-16 bg-gradient-to-b from-stone-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full bg-amber-100 text-amber-800 text-sm font-medium tracking-wide uppercase mb-4">
            Featured Products
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Discover Local
            <span className="text-emerald-700"> Coffee Products</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore Finished Coffee Products and Farming Tools From Verified
            Nepali Vendors.
          </p>
        </div>

        {/* Category buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button className="px-6 py-3 bg-emerald-700 text-white font-medium rounded-lg hover:bg-emerald-800 transition-colors shadow-sm">
            All Products
          </button>
          <button className="px-6 py-3 bg-white text-gray-700 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
            Coffee Beans
          </button>
          <button className="px-6 py-3 bg-white text-gray-700 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
            Tools
          </button>
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {products.map((product, idx) => (
            <div
              key={idx}
              className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-stone-100 to-stone-50">
                {/* You can replace with next/image or img */}
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow">
                  {product.description}
                </p>

                <button className="mt-auto w-full py-3 px-6 bg-emerald-700 hover:bg-emerald-800 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View all */}
        <div className="text-center mt-14">
          <a
            href="#"
            className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-700 hover:bg-emerald-800 text-white font-medium rounded-xl transition-colors shadow-md hover:shadow-lg text-lg"
          >
            View All Products
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
