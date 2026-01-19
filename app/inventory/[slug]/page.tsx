import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { inventoryCategories } from "../../../data/inventory-categories";
import { servicesData } from "../../../data/services";
import Breadcrumbs from "../../../components/Breadcrumbs";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return inventoryCategories.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = inventoryCategories.find((c) => c.slug === slug);

  if (!category) {
    return {
      title: "Property Type Not Found",
    };
  }

  return {
    title: `${category.name} Properties | San Jose 1031 Exchange`,
    description: `Browse ${category.name.toLowerCase()} properties for 1031 exchange opportunities in Silicon Valley. Tax-deferred investment options available.`,
    alternates: {
      canonical: `https://www.1031exchangesanjose.com${category.route}`,
    },
  };
}

const propertyTypeDescriptions: Record<string, { description: string; benefits: string[]; examples: string[] }> = {
  "nnn-triple-net": {
    description: "Triple Net (NNN) lease properties offer investors truly passive income with tenants responsible for all operating expenses including taxes, insurance, and maintenance. These investments feature credit-rated tenants, long-term leases, and predictable cash flows ideal for 1031 exchanges.",
    benefits: ["Passive income with no landlord responsibilities", "Credit-rated national tenants", "Long-term lease security (10-25 years)", "Built-in rent escalations"],
    examples: ["Walgreens", "CVS", "Dollar General", "Starbucks", "McDonald's", "7-Eleven"],
  },
  "retail": {
    description: "Retail properties encompass a wide range of commercial real estate from single-tenant stores to shopping centers. These investments benefit from consumer spending patterns and can include everything from neighborhood centers to power centers and lifestyle destinations.",
    benefits: ["Diverse tenant mix options", "Consumer spending exposure", "Location-driven value", "Visibility and signage benefits"],
    examples: ["Shopping Centers", "Strip Malls", "Single Tenant Retail", "Outlet Centers", "Neighborhood Centers"],
  },
  "residential": {
    description: "Residential properties for 1031 exchanges include single-family rentals, duplexes, and small apartment buildings. These investments benefit from strong rental demand, appreciation potential, and favorable financing options in the Silicon Valley market.",
    benefits: ["Strong rental demand", "Appreciation potential", "Favorable financing terms", "Diverse tenant pool"],
    examples: ["Single Family Rentals", "Duplexes", "Triplexes", "Fourplexes", "Small Apartments"],
  },
  "commercial": {
    description: "Commercial properties encompass office buildings, retail spaces, and mixed-use developments. These investments offer stable income streams from business tenants with longer lease terms and professional management opportunities.",
    benefits: ["Professional tenant relationships", "Longer lease terms", "Triple net lease options", "Business-critical locations"],
    examples: ["Office Buildings", "Retail Centers", "Business Parks", "Professional Buildings"],
  },
  "industrial": {
    description: "Industrial properties include warehouses, distribution centers, and manufacturing facilities. With the rise of e-commerce and supply chain optimization, industrial real estate has become one of the strongest performing sectors for 1031 exchanges.",
    benefits: ["E-commerce growth driver", "Low tenant turnover", "Triple net lease structures", "Mission-critical facilities"],
    examples: ["Warehouses", "Distribution Centers", "Flex Industrial", "Manufacturing", "Last Mile Logistics"],
  },
  "multifamily": {
    description: "Multifamily properties offer investors diversified income streams from multiple residential units. From garden-style apartments to mid-rise buildings, these investments benefit from strong housing demand and various value-add opportunities.",
    benefits: ["Multiple income streams", "Economies of scale", "Value-add potential", "Strong rental demand"],
    examples: ["Garden Apartments", "Mid-Rise Buildings", "Student Housing", "Senior Housing", "Workforce Housing"],
  },
  "office": {
    description: "Office properties range from single-tenant buildings to Class A high-rises. Despite evolving work patterns, well-located office investments with quality tenants continue to provide stable income and appreciation potential.",
    benefits: ["Long-term lease commitments", "Professional tenants", "Central business locations", "Amenity-rich environments"],
    examples: ["Class A Office", "Suburban Office", "Medical Office", "Creative Office", "Flex Office"],
  },
  "land": {
    description: "Land investments offer unique 1031 exchange opportunities for investors seeking development potential or long-term appreciation. Raw land, entitled parcels, and infill sites all qualify as like-kind real estate.",
    benefits: ["Development potential", "Long-term appreciation", "No depreciation recapture", "Flexible exit strategies"],
    examples: ["Raw Land", "Entitled Land", "Infill Sites", "Agricultural Land", "Development Sites"],
  },
  "mixed-use": {
    description: "Mixed-use properties combine retail, office, and residential components in single developments. These investments benefit from diversified income streams and often occupy prime urban locations with strong fundamentals.",
    benefits: ["Diversified income streams", "Prime urban locations", "Live-work-play appeal", "Reduced vacancy risk"],
    examples: ["Retail with Apartments Above", "Office over Retail", "Live-Work Spaces", "Urban Infill Projects"],
  },
  "medical": {
    description: "Medical office and healthcare properties serve the growing healthcare industry with specialized facilities for physicians, outpatient services, and specialty care. These investments benefit from aging demographics and healthcare spending growth.",
    benefits: ["Recession-resistant demand", "Aging demographics driver", "Specialized tenant improvements", "Long-term lease commitments"],
    examples: ["Medical Office Buildings", "Outpatient Clinics", "Urgent Care Centers", "Dental Practices", "Surgery Centers"],
  },
  "hospitality": {
    description: "Hospitality properties include hotels, motels, and extended-stay facilities. While more management-intensive, these investments offer unique income potential and can qualify for 1031 exchanges when held for investment purposes.",
    benefits: ["Revenue per room potential", "Brand affiliation options", "Tourism and business travel", "Operational upside"],
    examples: ["Limited Service Hotels", "Extended Stay", "Boutique Hotels", "Select Service Hotels"],
  },
  "self-storage": {
    description: "Self-storage facilities have become one of the most resilient real estate sectors with consistent demand through economic cycles. These investments offer low operating costs, minimal tenant improvements, and recession-resistant income streams.",
    benefits: ["Recession-resistant demand", "Low operating costs", "Minimal tenant improvements", "Month-to-month leases"],
    examples: ["Climate Controlled Storage", "Drive-Up Storage", "Boat & RV Storage", "Urban Self Storage"],
  },
};

export default async function InventoryPage({ params }: Props) {
  const { slug } = await params;
  const category = inventoryCategories.find((c) => c.slug === slug);

  if (!category) {
    notFound();
  }

  const typeInfo = propertyTypeDescriptions[slug] || {
    description: `${category.name} properties qualify as like-kind real estate for 1031 exchanges, offering investors stable income and tax-deferred wealth building opportunities in Silicon Valley.`,
    benefits: ["Tax-deferred exchange eligible", "Stable income potential", "Professional management options", "Appreciation opportunity"],
    examples: ["Various property subtypes available"],
  };

  // Get related property types
  const relatedTypes = inventoryCategories.filter((t) => t.slug !== slug).slice(0, 4);
  const relatedServices = servicesData.slice(0, 4);

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Property Types", href: "/property-types" },
    { label: category.name },
  ];

  const heroImage = category.heroImage || "/locations/san-jose-1031-exchange.jpg";

  return (
    <div className="bg-white text-gray-900 min-h-screen">
      {/* Hero Section - Same style as locations */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <Image
          src={heroImage}
          alt={`${category.name} properties for 1031 exchange`}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <p className="text-[11px] font-light uppercase tracking-[0.4em] text-white/60 mb-8">
            Property Type
          </p>
          <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white font-light tracking-[0.1em] leading-none">
            {category.name.toUpperCase()}
          </h1>
          <p className="mt-10 text-[13px] uppercase tracking-[0.25em] text-white/70 font-light">
            1031 Exchange Properties + California
          </p>
          <div className="mt-12">
            <Link
              href={`/contact?projectType=${encodeURIComponent(category.name)}`}
              className="inline-flex items-center justify-center border border-white/60 text-white px-12 py-4 text-[11px] font-light uppercase tracking-[0.3em] hover:bg-white hover:text-gray-900 transition-all duration-500"
            >
              Find Properties
            </Link>
          </div>
        </div>
      </section>

      <Breadcrumbs items={breadcrumbItems} />

      <main className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">
        <article className="space-y-20">
          {/* Main Content - Same layout as locations */}
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-8">
              <h2 className="text-2xl md:text-3xl text-gray-900 font-light tracking-wide">
                {category.name} for 1031 Exchanges
              </h2>
              <p className="text-gray-500 leading-relaxed font-light text-lg">
                {typeInfo.description}
              </p>
            </div>
            <div className="relative h-80 lg:h-full lg:min-h-[400px]">
              <Image
                src={heroImage}
                alt={category.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Key Benefits - Same style as locations popular paths */}
          <section className="bg-gray-50 -mx-6 md:-mx-10 px-6 md:px-10 py-16">
            <h2 className="text-2xl md:text-3xl text-gray-900 font-light tracking-wide text-center uppercase mb-12">
              Investment Benefits
            </h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {typeInfo.benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="border-t border-gray-200 pt-6"
                >
                  <div className="flex items-center gap-4 mb-3">
                    <span className="text-2xl font-light text-navy">0{index + 1}</span>
                    <p className="text-lg text-gray-900 font-normal">{benefit}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Property Examples */}
          <section>
            <h2 className="text-2xl md:text-3xl text-gray-900 font-light tracking-wide uppercase mb-12">
              Common {category.name} Types
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {typeInfo.examples.map((example, index) => (
                <div
                  key={index}
                  className="bg-gray-50 p-6 text-center"
                >
                  <p className="text-gray-900 font-normal">{example}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Related Property Types - Same grid style as locations */}
          <section>
            <h2 className="text-2xl md:text-3xl text-gray-900 font-light tracking-wide uppercase mb-8">
              Other Property Types
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedTypes.map((type) => (
                <Link
                  key={type.slug}
                  href={type.route}
                  className="group relative h-48 overflow-hidden"
                >
                  <Image
                    src={type.heroImage || "/locations/san-jose-1031-exchange.jpg"}
                    alt={type.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center p-4">
                    <h3 className="text-sm text-white uppercase tracking-[0.15em] font-light text-center">
                      {type.name}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                href="/property-types"
                className="inline-flex items-center justify-center border border-gray-900 text-gray-900 px-10 py-4 text-xs font-medium uppercase tracking-[0.2em] hover:bg-gray-900 hover:text-white transition-all duration-300"
              >
                View All Property Types
              </Link>
            </div>
          </section>

          {/* Services Section - Same as locations */}
          <section className="bg-gray-50 -mx-6 md:-mx-10 px-6 md:px-10 py-16">
            <h2 className="text-2xl md:text-3xl text-gray-900 font-light tracking-wide text-center uppercase mb-12">
              Our Services
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {relatedServices.map((service) => (
                <Link
                  key={service.slug}
                  href={service.route}
                  className="group block border-t border-gray-200 pt-6 hover:border-gray-900 transition-colors duration-300"
                >
                  <h3 className="text-base text-gray-900 font-normal mb-3 group-hover:text-gray-600 transition-colors duration-300">
                    {service.name}
                  </h3>
                  <p className="text-gray-500 text-sm font-light line-clamp-2">{service.short}</p>
                </Link>
              ))}
            </div>
          </section>

          {/* CTA Section - Same as locations */}
          <section className="bg-navy py-16 px-8 text-center -mx-6 md:-mx-10">
            <h2 className="text-2xl md:text-3xl text-white font-light tracking-wide uppercase">
              Ready to find {category.name.toLowerCase()} properties?
            </h2>
            <p className="mt-6 text-white/70 font-light max-w-2xl mx-auto">
              Contact us to learn more about {category.name.toLowerCase()} investment opportunities and how we can help with your 1031 exchange.
            </p>
            <div className="mt-10 flex flex-wrap gap-4 justify-center">
              <Link
                href={`/contact?projectType=${encodeURIComponent(category.name)}`}
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
          </section>
        </article>
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: `${category.name} Properties`,
            description: typeInfo.description,
            category: "Real Estate Investment",
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: breadcrumbItems.map((item, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: item.label,
              item: item.href ? `https://www.1031exchangesanjose.com${item.href}` : undefined,
            })),
          }),
        }}
      />
    </div>
  );
}
