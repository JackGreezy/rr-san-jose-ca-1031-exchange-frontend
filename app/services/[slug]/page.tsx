import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { servicesData } from "../../../data/services";
import { serviceBatches01, serviceBatches02, serviceBatches03 } from "../../../data";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { locationsData } from "../../../data/locations";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = servicesData.find((s) => s.slug === slug);

  if (!service) {
    return {
      title: "Service Not Found",
    };
  }

  return {
    title: `${service.name} | San Jose 1031 Exchange Services`,
    description: service.short,
    alternates: {
      canonical: `https://www.1031exchangesanjose.com${service.route}`,
    },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = servicesData.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const batchData =
    (serviceBatches01.servicesBatch01 as Record<string, { mainDescription: string; faqs?: { question: string; answer: string }[] }>)[slug] ||
    (serviceBatches02.servicesBatch02 as Record<string, { mainDescription: string; faqs?: { question: string; answer: string }[] }>)[slug] ||
    (serviceBatches03.servicesBatch03 as Record<string, { mainDescription: string; faqs?: { question: string; answer: string }[] }>)[slug];
  const relatedServices = servicesData.filter((s) => s.slug !== slug).slice(0, 4);
  const relatedLocations = locationsData.slice(0, 4);

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: service.name },
  ];

  return (
    <div className="bg-white text-gray-900 min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <Image
          src="/locations/san-jose-1031-exchange.jpg"
          alt={service.name}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <p className="text-[11px] font-light uppercase tracking-[0.4em] text-white/60 mb-8">
            Service
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl text-white font-light tracking-[0.08em] leading-tight">
            {service.name.toUpperCase()}
          </h1>
          <p className="mt-8 text-[13px] uppercase tracking-[0.25em] text-white/70 font-light max-w-2xl mx-auto">
            {service.short}
          </p>
          <div className="mt-12">
            <Link
              href={`/contact?projectType=${encodeURIComponent(service.name)}`}
              className="inline-flex items-center justify-center border border-white/60 text-white px-12 py-4 text-[11px] font-light uppercase tracking-[0.3em] hover:bg-white hover:text-gray-900 transition-all duration-500"
            >
              Get Started
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
                  About {service.name}
                </h2>
                <div
                  className="text-gray-500 leading-relaxed font-light prose prose-lg max-w-none prose-p:text-gray-500 prose-headings:font-light"
                  dangerouslySetInnerHTML={{ __html: batchData.mainDescription }}
                />
              </div>
              <div className="relative h-80 lg:h-full lg:min-h-[400px]">
                <Image
                  src="/locations/palo-alto-1031-exchange.jpg"
                  alt={service.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          )}

          {/* FAQ Section */}
          {batchData && batchData.faqs && (
            <section className="bg-gray-50 -mx-6 md:-mx-10 px-6 md:px-10 py-16">
              <h2 className="text-2xl md:text-3xl text-gray-900 font-light tracking-wide text-center uppercase mb-12">
                Frequently Asked Questions
              </h2>
              <div className="grid lg:grid-cols-2 gap-x-16 gap-y-0 max-w-6xl mx-auto">
                {batchData.faqs.map((item: { question: string; answer: string }, index: number) => (
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

          {/* Related Services */}
          <section>
            <h2 className="text-2xl md:text-3xl text-gray-900 font-light tracking-wide uppercase mb-8">
              Related Services
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedServices.map((related, index) => (
                <Link
                  key={related.slug}
                  href={related.route}
                  className="group relative h-48 overflow-hidden"
                >
                  <Image
                    src={`/locations/${index % 2 === 0 ? 'mountain-view' : 'sunnyvale'}-1031-exchange.jpg`}
                    alt={related.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center p-4">
                    <h3 className="text-sm text-white uppercase tracking-[0.15em] font-light text-center">
                      {related.name}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                href="/services"
                className="inline-flex items-center justify-center border border-gray-900 text-gray-900 px-10 py-4 text-xs font-medium uppercase tracking-[0.2em] hover:bg-gray-900 hover:text-white transition-all duration-300"
              >
                View All {servicesData.length} Services
              </Link>
            </div>
          </section>

          {/* Featured Locations */}
          <section className="bg-gray-50 -mx-6 md:-mx-10 px-6 md:px-10 py-16">
            <h2 className="text-2xl md:text-3xl text-gray-900 font-light tracking-wide text-center uppercase mb-12">
              Service Locations
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
              {relatedLocations.map((location) => (
                <Link
                  key={location.slug}
                  href={location.route}
                  className="group relative h-40 overflow-hidden"
                >
                  <Image
                    src={location.heroImage || "/locations/san-jose-1031-exchange.jpg"}
                    alt={location.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-sm text-white uppercase tracking-[0.15em] font-light">
                      {location.name}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-navy py-16 px-8 text-center -mx-6 md:-mx-10">
            <h2 className="text-2xl md:text-3xl text-white font-light tracking-wide uppercase">
              Ready to get started?
            </h2>
            <p className="mt-6 text-white/70 font-light max-w-2xl mx-auto">
              Contact us to learn more about {service.name.toLowerCase()} and how we can help with your 1031 exchange.
            </p>
            <div className="mt-10 flex flex-wrap gap-4 justify-center">
              <Link
                href={`/contact?projectType=${encodeURIComponent(service.name)}`}
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
            "@type": "Service",
            name: service.name,
            description: service.short,
            provider: {
              "@type": "Organization",
              name: "1031 Exchange San Jose",
              url: "https://www.1031exchangesanjose.com/",
            },
            areaServed: {
              "@type": "State",
              name: "California",
            },
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
