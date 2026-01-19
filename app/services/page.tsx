import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { servicesData } from "../../data/services";
import Breadcrumbs from "../../components/Breadcrumbs";

export const metadata: Metadata = {
  title: "1031 Exchange Services | San Jose Property Identification",
  description:
    "Comprehensive 1031 exchange services including replacement property identification, timeline management, and investment analysis for San Jose investors.",
  alternates: {
    canonical: "https://www.1031exchangesanjose.com/services",
  },
};

export default function ServicesPage() {
  // Split services into groups for the grid
  const topServices = servicesData.slice(0, 6);

  return (
    <div className="bg-white text-gray-900 min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <Image
          src="/locations/san-jose-1031-exchange.jpg"
          alt="1031 Exchange Services"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <p className="text-[11px] font-light uppercase tracking-[0.4em] text-white/60 mb-8">
            What We Offer
          </p>
          <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white font-light tracking-[0.1em] leading-none">
            SERVICES
          </h1>
          <p className="mt-10 text-[13px] uppercase tracking-[0.25em] text-white/70 font-light max-w-2xl mx-auto">
            Comprehensive 1031 Exchange Support for San Jose Investors
          </p>
          <div className="mt-12">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center border border-white/60 text-white px-12 py-4 text-[11px] font-light uppercase tracking-[0.3em] hover:bg-white hover:text-gray-900 transition-all duration-500"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>

      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Services" }]} />

      <main className="py-16 md:py-24">
        {/* Services Grid - Edge to Edge */}
        <div className="grid grid-cols-2 lg:grid-cols-3">
          {topServices.map((service, index) => (
            <Link
              key={service.slug}
              href={service.route}
              className="group relative h-72 lg:h-80 overflow-hidden"
            >
              <Image
                src={`/locations/${index % 2 === 0 ? 'san-jose' : index % 3 === 0 ? 'palo-alto' : 'mountain-view'}-1031-exchange.jpg`}
                alt={service.name}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors duration-300" />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                <h2 className="text-lg text-white uppercase tracking-[0.15em] font-light text-center">
                  {service.name}
                </h2>
              </div>
            </Link>
          ))}
        </div>

        {/* All Services List */}
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-20">
          <h2 className="text-2xl md:text-3xl text-gray-900 font-light tracking-wide text-center uppercase mb-16">
            All Services
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData.map((service) => (
              <Link
                key={service.slug}
                href={service.route}
                className="group block border-t border-gray-200 pt-6 hover:border-gray-900 transition-colors duration-300"
              >
                <h3 className="text-lg text-gray-900 font-normal mb-3 group-hover:text-gray-600 transition-colors duration-300">
                  {service.name}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed font-light">{service.short}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-navy py-16 px-8 text-center">
          <h2 className="text-2xl md:text-3xl text-white font-light tracking-wide uppercase">
            Need help with your exchange?
          </h2>
          <p className="mt-6 text-white/70 font-light max-w-2xl mx-auto">
            We help investors identify replacement properties and coordinate 1031 exchange timelines with precision.
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
    </div>
  );
}
