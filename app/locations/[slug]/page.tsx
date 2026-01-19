import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { locationsData } from "../../../data/locations";
import { locationBatches01, locationBatches02, locationBatches03 } from "../../../data";
import { servicesData } from "../../../data/services";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { LOCATIONS_ROUTE } from "../../../lib/config";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return locationsData.map((location) => ({
    slug: location.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const location = locationsData.find((l) => l.slug === slug);

  if (!location) {
    return {
      title: "Location Not Found",
    };
  }

  return {
    title: `1031 Exchange Properties in ${location.name} | San Jose Area`,
    description: `1031 exchange opportunities in ${location.name}, CA. Find replacement properties and tax-deferred investment options.`,
    alternates: {
      canonical: `https://www.1031exchangesanjose.com${location.route}`,
    },
  };
}

export default async function LocationPage({ params }: Props) {
  const { slug } = await params;
  const location = locationsData.find((l) => l.slug === slug);

  if (!location) {
    notFound();
  }

  // Convert slug to batch key format (remove "-ca" suffix)
  const batchKey = slug.replace(/-ca$/, '');
  const batchData =
    (locationBatches01.locationsBatch01 as Record<string, { mainDescription: string; popularPaths?: Array<{ type: string; slug: string; name: string; rank: number; whyPopular: string }>; faqs?: Array<{ question: string; answer: string }> }>)[batchKey] ||
    (locationBatches02.locationsBatch02 as Record<string, { mainDescription: string; popularPaths?: Array<{ type: string; slug: string; name: string; rank: number; whyPopular: string }>; faqs?: Array<{ question: string; answer: string }> }>)[batchKey] ||
    (locationBatches03.locationsBatch03 as Record<string, { mainDescription: string; popularPaths?: Array<{ type: string; slug: string; name: string; rank: number; whyPopular: string }>; faqs?: Array<{ question: string; answer: string }> }>)[batchKey];
  const relatedServices = servicesData.slice(0, 4);
  const relatedLocations = locationsData.filter((l) => l.slug !== slug).slice(0, 4);

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Locations", href: LOCATIONS_ROUTE },
    { label: location.name },
  ];

  return (
    <div className="bg-white text-gray-900 min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        {location.heroImage && (
          <Image
            src={location.heroImage}
            alt={`${location.name} skyline`}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <p className="text-[11px] font-light uppercase tracking-[0.4em] text-white/60 mb-8">
            Location
          </p>
          <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white font-light tracking-[0.1em] leading-none">
            {location.name.toUpperCase()}
          </h1>
          <p className="mt-10 text-[13px] uppercase tracking-[0.25em] text-white/70 font-light">
            1031 Exchange Properties + California
          </p>
          <div className="mt-12">
            <Link
              href={`/contact?projectType=${encodeURIComponent(`${location.name} Property Search`)}`}
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
          {/* Main Content */}
          {batchData && (
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div className="space-y-8">
                <h2 className="text-2xl md:text-3xl text-gray-900 font-light tracking-wide">
                  1031 Exchange in {location.name}
                </h2>
                <div
                  className="text-gray-500 leading-relaxed font-light prose prose-lg max-w-none prose-p:text-gray-500 prose-headings:font-light"
                  dangerouslySetInnerHTML={{ __html: batchData.mainDescription }}
                />
              </div>
              <div className="relative h-80 lg:h-full lg:min-h-[400px]">
                {location.heroImage && (
                  <Image
                    src={location.heroImage}
                    alt={location.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                )}
              </div>
            </div>
          )}

          {/* Popular Paths */}
          {batchData && batchData.popularPaths && (
            <section className="bg-gray-50 -mx-6 md:-mx-10 px-6 md:px-10 py-16">
              <h2 className="text-2xl md:text-3xl text-gray-900 font-light tracking-wide text-center uppercase mb-12">
                Popular Investment Paths
              </h2>
              <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                {batchData.popularPaths.map((path, index) => {
                  const service = path.type === "service" ? servicesData.find((s) => s.slug === path.slug) : null;
                  const href = service ? service.route : `/inventory/${path.slug}`;
                  return (
                    <Link
                      key={index}
                      href={href}
                      className="group block border-t border-gray-200 pt-6 hover:border-gray-900 transition-colors duration-300"
                    >
                      <div className="flex items-center gap-4 mb-3">
                        <span className="text-2xl font-light text-navy">#{path.rank}</span>
                        <h3 className="text-lg text-gray-900 font-normal group-hover:text-gray-600 transition-colors duration-300">
                          {path.name}
                        </h3>
                      </div>
                      <p className="text-gray-500 text-sm font-light">{path.whyPopular}</p>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}

          {/* FAQ Section */}
          {batchData && batchData.faqs && (
            <section>
              <h2 className="text-2xl md:text-3xl text-gray-900 font-light tracking-wide uppercase mb-12">
                Frequently Asked Questions
              </h2>
              <div className="grid lg:grid-cols-2 gap-x-16 gap-y-0">
                {batchData.faqs.map((item, index) => (
                  <details
                    key={index}
                    className="group border-t border-gray-200 last:border-b lg:last:border-b-0 lg:[&:nth-last-child(2)]:border-b"
                  >
                    <summary className="flex cursor-pointer items-center justify-between py-6 text-left text-base font-normal text-gray-900">
                      {item.question}
                      <span className="ml-4 flex-shrink-0 text-gray-400 transition-transform duration-300 group-open:rotate-45">
                        +
                      </span>
                    </summary>
                    <p className="pb-6 text-gray-500 leading-relaxed font-light">{item.answer}</p>
                  </details>
                ))}
              </div>
            </section>
          )}

          {/* Related Locations */}
          <section>
            <h2 className="text-2xl md:text-3xl text-gray-900 font-light tracking-wide uppercase mb-8">
              Nearby Locations
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedLocations.map((loc) => (
                <Link
                  key={loc.slug}
                  href={loc.route}
                  className="group relative h-48 overflow-hidden"
                >
                  {loc.heroImage && (
                    <Image
                      src={loc.heroImage}
                      alt={loc.name}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-sm text-white uppercase tracking-[0.15em] font-light">
                      {loc.name}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                href={LOCATIONS_ROUTE}
                className="inline-flex items-center justify-center border border-gray-900 text-gray-900 px-10 py-4 text-xs font-medium uppercase tracking-[0.2em] hover:bg-gray-900 hover:text-white transition-all duration-300"
              >
                View All {locationsData.length} Locations
              </Link>
            </div>
          </section>

          {/* Services Section */}
          <section className="bg-gray-50 -mx-6 md:-mx-10 px-6 md:px-10 py-16">
            <h2 className="text-2xl md:text-3xl text-gray-900 font-light tracking-wide text-center uppercase mb-12">
              Services for {location.name}
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

          {/* CTA Section */}
          <section className="bg-navy py-16 px-8 text-center -mx-6 md:-mx-10">
            <h2 className="text-2xl md:text-3xl text-white font-light tracking-wide uppercase">
              Ready to find properties in {location.name}?
            </h2>
            <p className="mt-6 text-white/70 font-light max-w-2xl mx-auto">
              Contact us to learn more about 1031 exchange opportunities in {location.name} and how we can help.
            </p>
            <div className="mt-10 flex flex-wrap gap-4 justify-center">
              <Link
                href={`/contact?projectType=${encodeURIComponent(`${location.name} Property Search`)}`}
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Place",
            name: `${location.name}, California`,
            description: `1031 exchange opportunities in ${location.name}, CA`,
            address: {
              "@type": "PostalAddress",
              addressLocality: location.name,
              addressRegion: "CA",
              addressCountry: "US",
            },
          }),
        }}
      />
    </div>
  );
}
