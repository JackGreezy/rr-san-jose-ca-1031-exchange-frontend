"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { LOCATIONS_ROUTE } from "../lib/config";

const phoneNumberDisplay = "(408) 539-2254";
const phoneNumberHref = "tel:+14085392254";

// Stats data
const stats = [
  { value: "$2.5B+", label: "Total Exchange Volume" },
  { value: "$250K-$50M", label: "Property Range" },
  { value: "100%", label: "Compliance Rate" },
];

// Property types for conveyor belt carousel - BROADER CATEGORIES
const propertyCategories = [
  {
    title: "NNN Triple Net",
    image: "/locations/san-jose-1031-exchange.jpg",
    href: "/inventory/nnn-triple-net",
  },
  {
    title: "Retail",
    image: "/locations/palo-alto-1031-exchange.jpg",
    href: "/inventory/retail",
  },
  {
    title: "Residential",
    image: "/locations/mountain-view-1031-exchange.jpg",
    href: "/inventory/residential",
  },
  {
    title: "Commercial",
    image: "/locations/sunnyvale-1031-exchange.jpg",
    href: "/inventory/commercial",
  },
  {
    title: "Industrial",
    image: "/locations/fremont-1031-exchange.jpg",
    href: "/inventory/industrial",
  },
  {
    title: "Multifamily",
    image: "/locations/santa-clara-1031-exchange.jpg",
    href: "/inventory/multifamily",
  },
];

// Featured tools
const tools = [
  {
    name: "Boot Calculator",
    description: "Calculate boot and estimate tax implications for your 1031 exchange. Understand cash and debt boot to maximize tax deferral.",
    href: "/tools/boot-calculator",
  },
  {
    name: "Exchange Cost Estimator",
    description: "Estimate QI fees, escrow costs, title insurance, and recording fees for your upcoming exchange transaction.",
    href: "/tools/exchange-cost-estimator",
  },
  {
    name: "Identification Rules Checker",
    description: "Validate your property identification against IRS rules including the 3-property, 200%, and 95% rules.",
    href: "/tools/identification-rules-checker",
  },
];

// Featured locations
const featuredLocations = [
  { name: "San Jose", slug: "/locations/san-jose-ca", image: "/locations/san-jose-1031-exchange.jpg" },
  { name: "Palo Alto", slug: "/locations/palo-alto-ca", image: "/locations/palo-alto-1031-exchange.jpg" },
  { name: "Mountain View", slug: "/locations/mountain-view-ca", image: "/locations/mountain-view-1031-exchange.jpg" },
  { name: "Sunnyvale", slug: "/locations/sunnyvale-ca", image: "/locations/sunnyvale-1031-exchange.jpg" },
  { name: "Santa Clara", slug: "/locations/santa-clara-ca", image: "/locations/santa-clara-1031-exchange.jpg" },
  { name: "Fremont", slug: "/locations/fremont-ca", image: "/locations/fremont-1031-exchange.jpg" },
];

// FAQ items
const faqItems = [
  {
    question: "What are the 45 and 180 day deadlines?",
    answer:
      "Day zero begins the moment the relinquished property closes. You receive forty-five calendar days to identify up to three replacement properties and one hundred eighty days to acquire and close on one or more of those identified assets.",
  },
  {
    question: "Which properties qualify as like-kind?",
    answer:
      "Like-kind real estate includes most real property held for investment or productive use, so an apartment tower may be exchanged for an industrial park, a medical office, or raw land. The assets must be inside the United States and held for business or investment.",
  },
  {
    question: "What is boot and how is it taxed?",
    answer:
      "Boot is any non-like-kind value received, such as cash, debt relief, or personal property. Boot is taxable up to the amount of realized gain and is reported on Form 8824.",
  },
  {
    question: "Can I perform a reverse exchange?",
    answer:
      "Yes. A reverse exchange requires a qualified exchange accommodation arrangement in which the replacement property is parked by an accommodator until the relinquished asset sells.",
  },
];

// JSON-LD for SEO
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "1031 Exchange San Jose",
  url: "https://www.1031exchangesanjose.com/",
  logo: "https://www.1031exchangesanjose.com/og-image.png",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+1-408-539-2254",
    contactType: "customer service",
    areaServed: "US-CA",
    availableLanguage: ["English"],
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "84 West Santa Clara St",
    addressLocality: "San Jose",
    addressRegion: "CA",
    postalCode: "95113",
    addressCountry: "US",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

// Animated stat component with scramble effect
function AnimatedStat({ value, label }: { value: string; label: string }) {
  const [isVisible, setIsVisible] = useState(false);
  const [displayValue, setDisplayValue] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const chars = "0123456789$%+-.BKMGT";
    let iteration = 0;
    const finalValue = value;
    
    const interval = setInterval(() => {
      setDisplayValue(
        finalValue
          .split("")
          .map((char, index) => {
            if (index < iteration) {
              return finalValue[index];
            }
            if (char === " " || char === "," || char === "-") return char;
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= finalValue.length) {
        clearInterval(interval);
        setDisplayValue(finalValue);
      }

      iteration += 1 / 3;
    }, 40);

    return () => clearInterval(interval);
  }, [isVisible, value]);

  return (
    <div ref={ref} className="text-center">
      <p className="font-light text-4xl md:text-5xl lg:text-6xl text-white tracking-wide">
        {displayValue || value}
      </p>
      <p className="mt-4 text-xs uppercase tracking-[0.2em] text-white/60 font-light">
        {label}
      </p>
    </div>
  );
}

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Duplicate items for seamless infinite scroll
  const duplicatedCategories = [...propertyCategories, ...propertyCategories];

  return (
    <>
      <div className="bg-white text-gray-900">
        <main>
          {/* Hero Section with Video - Kim Bibb Style */}
          <section className="relative h-screen flex items-center justify-center overflow-hidden">
            {/* Video Background */}
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src="/49ers!.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/50" />
            
            <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
              {/* Small top text like Kim Bibb */}
              <p className="text-[11px] font-light uppercase tracking-[0.4em] text-white/60 mb-8">
                Silicon Valley&apos;s Premier Qualified Intermediary Network
              </p>
              
              {/* HUGE elegant title like KIM BIBB */}
              <h1 className="font-heading text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-white font-light tracking-[0.15em] leading-none">
                1031
              </h1>
              <h1 className="font-heading text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-white font-light tracking-[0.15em] leading-none mt-2">
                EXCHANGE
              </h1>
              
              {/* Subtitle */}
              <p className="mt-10 text-[13px] uppercase tracking-[0.35em] text-white/80 font-light">
                Tax-Deferred Real Estate Investments + San Jose
              </p>
              
              {/* CTA Button - bordered like Kim Bibb */}
              <div className="mt-14">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center border border-white/60 text-white px-14 py-5 text-[11px] font-light uppercase tracking-[0.3em] hover:bg-white hover:text-gray-900 transition-all duration-500"
                >
                  Start Your Exchange
                </Link>
              </div>
            </div>
            
            {/* Scroll indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
              <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-white/50 to-transparent animate-pulse" />
            </div>
          </section>

          {/* Action Cards Section */}
          <section className="bg-white py-20 md:py-28">
            <div className="max-w-7xl mx-auto px-6 lg:px-10">
              <div className="grid md:grid-cols-3 gap-6">
                <Link href="/services" className="group relative block h-80 overflow-hidden">
                  <Image
                    src="/locations/san-jose-1031-exchange.jpg"
                    alt="Find Properties"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg text-white uppercase tracking-[0.2em] font-light">
                      Find Properties
                    </span>
                  </div>
                </Link>
                
                <Link href="/contact" className="group relative block h-80 overflow-hidden">
                  <Image
                    src="/locations/palo-alto-1031-exchange.jpg"
                    alt="Contact Us"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg text-white uppercase tracking-[0.2em] font-light">
                      Contact Us
                    </span>
                  </div>
                </Link>
                
                <Link href="/tools" className="group relative block h-80 overflow-hidden">
                  <Image
                    src="/locations/mountain-view-1031-exchange.jpg"
                    alt="Exchange Tools"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg text-white uppercase tracking-[0.2em] font-light">
                      Exchange Tools
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          </section>

          {/* Property Types - Conveyor Belt Carousel */}
          <section className="bg-gray-50 py-20 md:py-28 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-10 mb-12">
              <h2 className="text-3xl md:text-4xl text-gray-900 font-light tracking-wide text-center uppercase">
                Property Types We Serve
              </h2>
            </div>
            
            {/* Infinite conveyor belt */}
            <div className="relative">
              <div className="flex animate-conveyor gap-6">
                {duplicatedCategories.map((category, idx) => (
                  <Link
                    key={`${category.title}-${idx}`}
                    href={category.href}
                    className="group flex-shrink-0 w-[320px]"
                  >
                    <div className="relative h-[420px] overflow-hidden">
                      <Image
                        src={category.image}
                        alt={category.title}
                        fill
                        sizes="320px"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300" />
                      <div className="absolute inset-0 flex flex-col items-center justify-end pb-10">
                        <h3 className="text-lg text-white uppercase tracking-[0.15em] font-light text-center px-4">
                          {category.title}
                        </h3>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* Featured Tools Section - Navy Background */}
          <section className="bg-navy py-20 md:py-28">
            <div className="max-w-7xl mx-auto px-6 lg:px-10">
              <h2 className="text-3xl md:text-4xl text-white font-light tracking-wide text-center uppercase mb-4">
                Exchange Tools
              </h2>
              <p className="text-center text-white/60 max-w-2xl mx-auto mb-16 font-light">
                Free calculators and resources to help you plan your 1031 exchange.
              </p>
              
              <div className="grid md:grid-cols-3 gap-10">
                {tools.map((tool) => (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    className="group block border-t border-white/20 pt-8 hover:border-white/50 transition-colors duration-300"
                  >
                    <h3 className="text-xl text-white font-normal mb-4 group-hover:text-white/80 transition-colors duration-300">
                      {tool.name}
                    </h3>
                    <p className="text-white/60 text-sm leading-relaxed mb-6 font-light">
                      {tool.description}
                    </p>
                    <span className="inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.15em] text-white group-hover:text-white/80 transition-colors duration-300">
                      Use Tool
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </Link>
                ))}
              </div>
              
              <div className="text-center mt-16">
                <Link
                  href="/tools"
                  className="inline-flex items-center justify-center border border-white/50 text-white px-10 py-4 text-xs font-medium uppercase tracking-[0.2em] hover:bg-white hover:text-navy transition-all duration-300"
                >
                  View All Tools
                </Link>
              </div>
            </div>
          </section>

          {/* Featured Locations Grid - Edge to Edge, Less Spacing */}
          <section className="bg-white">
            <div className="py-12 md:py-16">
              <h2 className="text-3xl md:text-4xl text-gray-900 font-light tracking-wide text-center uppercase px-6">
                Featured Locations
              </h2>
            </div>
            
            {/* Edge-to-edge grid - no extra padding */}
            <div className="grid grid-cols-2 lg:grid-cols-3">
              {featuredLocations.map((location) => (
                <Link
                  key={location.slug}
                  href={location.slug}
                  className="group relative h-64 lg:h-80 overflow-hidden"
                >
                  <Image
                    src={location.image}
                    alt={location.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-xl lg:text-2xl text-white uppercase tracking-[0.2em] font-light">
                      {location.name}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
            
            <div className="text-center py-12">
              <Link
                href={LOCATIONS_ROUTE}
                className="inline-flex items-center justify-center border border-gray-900 text-gray-900 px-10 py-4 text-xs font-medium uppercase tracking-[0.2em] hover:bg-gray-900 hover:text-white transition-all duration-300"
              >
                View All Locations
              </Link>
            </div>
          </section>

          {/* Stats Section with cool animation */}
          <section className="bg-navy py-24 md:py-32">
            <div className="max-w-5xl mx-auto px-6 lg:px-10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
                {stats.map((stat) => (
                  <AnimatedStat key={stat.label} value={stat.value} label={stat.label} />
                ))}
              </div>
            </div>
          </section>

          {/* FAQ Section - Full Width */}
          <section className="bg-gray-50 py-20 md:py-28">
            <div className="max-w-7xl mx-auto px-6 lg:px-10">
              <h2 className="text-3xl md:text-4xl text-gray-900 font-light tracking-wide text-center uppercase mb-16">
                Frequently Asked Questions
              </h2>
              
              <div className="grid lg:grid-cols-2 gap-x-16 gap-y-0">
                {faqItems.map((item, index) => (
                  <div key={index} className="border-t border-gray-200 last:border-b lg:last:border-b-0 lg:[&:nth-last-child(2)]:border-b">
                    <button
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      className="w-full flex items-center justify-between py-6 text-left"
                    >
                      <span className="text-base text-gray-900 pr-4 font-normal">{item.question}</span>
                      <span className={`flex-shrink-0 text-gray-400 transition-transform duration-300 ${openFaq === index ? "rotate-45" : ""}`}>
                        +
                      </span>
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        openFaq === index ? "max-h-96 pb-6" : "max-h-0"
                      }`}
                    >
                      <p className="text-gray-500 leading-relaxed font-light">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="relative min-h-[500px] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0">
              <Image
                src="/locations/fremont-1031-exchange.jpg"
                alt="Partner with our team"
                fill
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/70" />
            </div>
            
            <div className="relative z-10 max-w-4xl mx-auto px-6 text-center py-20">
              <h2 className="text-3xl md:text-4xl lg:text-5xl text-white font-light tracking-wide uppercase">
                Partner With Our Team
              </h2>
              <p className="mt-8 text-white/70 text-base max-w-2xl mx-auto font-light leading-relaxed">
                Our San Jose team delivers deep local knowledge and full-service support for your 1031 exchange. 
                Let us guide you through the process with precision and personalized care.
              </p>
              <div className="mt-12">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center bg-white text-gray-900 px-10 py-4 text-xs font-medium uppercase tracking-[0.2em] hover:bg-gray-100 transition-all duration-300"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* JSON-LD Scripts */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </>
  );
}
