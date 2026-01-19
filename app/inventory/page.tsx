import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { inventoryCategories } from "../../data/inventory-categories";
import Breadcrumbs from "../../components/Breadcrumbs";

export const metadata: Metadata = {
  title: "1031 Exchange Property Types | San Jose Commercial Real Estate",
  description: "Browse property types for 1031 exchanges including NNN, Retail, Residential, Commercial, Industrial, Multifamily, and more in Silicon Valley.",
  alternates: {
    canonical: "https://www.1031exchangesanjose.com/inventory",
  },
};

export default function InventoryPage() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Property Types" },
  ];

  return (
    <div className="bg-white text-gray-900 min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <Image
          src="/locations/san-jose-1031-exchange.jpg"
          alt="1031 Exchange Property Types"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <p className="text-[11px] font-light uppercase tracking-[0.4em] text-white/60 mb-8">
            Investment Properties
          </p>
          <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white font-light tracking-[0.1em] leading-none">
            PROPERTY
          </h1>
          <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white font-light tracking-[0.1em] leading-none mt-2">
            TYPES
          </h1>
          <p className="mt-10 text-[13px] uppercase tracking-[0.25em] text-white/70 font-light">
            1031 Exchange Qualified Real Estate
          </p>
        </div>
      </section>

      <Breadcrumbs items={breadcrumbItems} />

      <main className="py-16 md:py-24">
        {/* Property Type Grid - Edge to Edge */}
        <div className="grid grid-cols-2 lg:grid-cols-3">
          {inventoryCategories.map((category) => (
            <Link
              key={category.slug}
              href={category.route}
              className="group relative h-72 lg:h-96 overflow-hidden"
            >
              <Image
                src={category.heroImage || "/locations/san-jose-1031-exchange.jpg"}
                alt={`${category.name} properties`}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300" />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                <h2 className="text-lg lg:text-xl text-white uppercase tracking-[0.15em] font-light text-center">
                  {category.name}
                </h2>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-navy py-16 px-8 text-center">
          <h2 className="text-2xl md:text-3xl text-white font-light tracking-wide uppercase">
            Looking for specific properties?
          </h2>
          <p className="mt-6 text-white/70 font-light max-w-2xl mx-auto">
            Contact us to discuss your 1031 exchange requirements. We help investors identify replacement properties across all property types.
          </p>
          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-white text-gray-900 px-10 py-4 text-xs font-medium uppercase tracking-[0.2em] hover:bg-gray-100 transition-all duration-300"
            >
              Contact Us
            </Link>
            <a
              href="tel:+14085392254"
              className="inline-flex items-center justify-center border border-white/50 text-white px-10 py-4 text-xs font-light uppercase tracking-[0.2em] hover:bg-white/10 transition-all duration-300"
            >
              Call (408) 539-2254
            </a>
          </div>
        </div>
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "1031 Exchange Property Types",
            description: "Property types for 1031 exchanges including NNN, Retail, Residential, Commercial, and more",
          }),
        }}
      />
    </div>
  );
}
