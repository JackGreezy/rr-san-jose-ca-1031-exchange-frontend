"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { locationsData } from "../data/locations";
import { propertyTypesData } from "../data/property-types";
import { LOCATIONS_ROUTE } from "../lib/config";

const phoneNumberDisplay = "(408) 539-2254";
const phoneNumberHref = "tel:+14085392254";

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
};

const stagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Stats data
const stats = [
  { value: "500+", label: "Exchanges Coordinated" },
  { value: "$2.5B+", label: "Total Exchange Volume" },
  { value: "$250K-$50M", label: "Property Range" },
  { value: "100%", label: "Compliance Rate" },
];

// Property types for carousel
const propertyCategories = [
  {
    title: "Single Tenant Retail",
    description: "NNN properties with credit tenants for passive income",
    image: "/locations/san-jose-1031-exchange.jpg",
    href: "/property-types/convenience-store-gas-c-store",
  },
  {
    title: "Medical Office",
    description: "Clinics, urgent care, and dental facilities",
    image: "/locations/palo-alto-1031-exchange.jpg",
    href: "/property-types/urgent-care-medical-clinic",
  },
  {
    title: "Industrial & Logistics",
    description: "Warehouses and last-mile distribution centers",
    image: "/locations/fremont-1031-exchange.jpg",
    href: "/property-types/last-mile-logistics-flex",
  },
  {
    title: "Quick Service Restaurant",
    description: "Drive-thru QSR and coffee locations",
    image: "/locations/sunnyvale-1031-exchange.jpg",
    href: "/property-types/drive-thru-qsr",
  },
  {
    title: "Auto Service",
    description: "Oil change, tire stores, and auto parts retail",
    image: "/locations/santa-clara-1031-exchange.jpg",
    href: "/property-types/auto-service-oil-change",
  },
  {
    title: "Grocery & Discount",
    description: "Hard discount grocers and dollar stores",
    image: "/locations/mountain-view-1031-exchange.jpg",
    href: "/property-types/hard-discount-grocer",
  },
];

// Featured tools
const tools = [
  {
    name: "Boot Calculator",
    description: "Calculate boot and estimate tax implications for your 1031 exchange. Understand cash and debt boot to maximize tax deferral.",
    href: "/tools/boot-calculator",
    badge: "Popular",
  },
  {
    name: "Exchange Cost Estimator",
    description: "Estimate QI fees, escrow costs, title insurance, and recording fees for your upcoming exchange transaction.",
    href: "/tools/exchange-cost-estimator",
    badge: "Essential",
  },
  {
    name: "Identification Rules Checker",
    description: "Validate your property identification against IRS rules including the 3-property, 200%, and 95% rules.",
    href: "/tools/identification-rules-checker",
    badge: "Compliance",
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

export default function HomePage() {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Auto-scroll carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % propertyCategories.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const scrollToIndex = (index: number) => {
    setCarouselIndex(index);
  };

  return (
    <>
      <div className="bg-white text-gray-900">
        <main>
          {/* Hero Section - Video Placeholder */}
          <section className="relative min-h-[70vh] flex items-center justify-center bg-navy overflow-hidden">
            {/* Video placeholder area - will be replaced with actual video */}
            <div className="absolute inset-0">
              <Image
                src="/san-jose-hero-1031-exchange.jpg"
                alt="San Jose skyline"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-navy/70" />
            </div>
            
            <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={stagger}
                className="space-y-8"
              >
                <motion.h1
                  variants={fadeIn}
                  className="font-heading text-4xl md:text-6xl lg:text-7xl text-white tracking-tight"
                >
                  1031 Exchange San Jose
                </motion.h1>
                <motion.p
                  variants={fadeIn}
                  className="text-sm md:text-base uppercase tracking-ultra-wide text-white/80 font-medium"
                >
                  Silicon Valley's Premier Exchange Specialists
                </motion.p>
                <motion.div variants={fadeIn} className="flex flex-wrap items-center justify-center gap-4 pt-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center bg-white text-navy px-8 py-4 text-sm font-semibold uppercase tracking-wider hover:bg-lime hover:text-navy-dark transition-all duration-300"
                  >
                    Start Your Exchange
                  </Link>
                  <a
                    href={phoneNumberHref}
                    className="inline-flex items-center justify-center border-2 border-white text-white px-8 py-4 text-sm font-semibold uppercase tracking-wider hover:bg-white hover:text-navy transition-all duration-300"
                  >
                    Call {phoneNumberDisplay}
                  </a>
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="bg-white py-20 md:py-28">
            <div className="max-w-7xl mx-auto px-6 lg:px-10">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={stagger}
                className="text-center mb-16"
              >
                <motion.h2
                  variants={fadeIn}
                  className="font-heading text-3xl md:text-4xl lg:text-5xl text-navy tracking-wide uppercase"
                >
                  Your San Jose 1031 Exchange Experts
                </motion.h2>
              </motion.div>
              
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={stagger}
                className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    variants={fadeIn}
                    className="text-center"
                  >
                    <p className="font-heading text-3xl md:text-4xl lg:text-5xl text-navy italic">
                      {stat.value}
                    </p>
                    <p className="mt-3 text-xs md:text-sm uppercase tracking-wider text-gray-600 font-medium">
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </motion.div>

              {/* Action Cards */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={stagger}
                className="grid md:grid-cols-3 gap-6 mt-20"
              >
                <motion.div variants={fadeIn}>
                  <Link
                    href="/services"
                    className="group relative block h-72 overflow-hidden"
                  >
                    <Image
                      src="/locations/san-jose-1031-exchange.jpg"
                      alt="Find Properties"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-navy/60 group-hover:bg-navy/50 transition-colors duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-heading text-2xl md:text-3xl text-white uppercase tracking-wide">
                        Find Properties
                      </span>
                    </div>
                  </Link>
                </motion.div>
                
                <motion.div variants={fadeIn}>
                  <Link
                    href="/contact"
                    className="group relative block h-72 overflow-hidden"
                  >
                    <Image
                      src="/locations/palo-alto-1031-exchange.jpg"
                      alt="Contact Us"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-navy/60 group-hover:bg-navy/50 transition-colors duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-heading text-2xl md:text-3xl text-white uppercase tracking-wide">
                        Contact Us
                      </span>
                    </div>
                  </Link>
                </motion.div>
                
                <motion.div variants={fadeIn}>
                  <Link
                    href="/tools"
                    className="group relative block h-72 overflow-hidden"
                  >
                    <Image
                      src="/locations/mountain-view-1031-exchange.jpg"
                      alt="Exchange Tools"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-navy/60 group-hover:bg-navy/50 transition-colors duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-heading text-2xl md:text-3xl text-white uppercase tracking-wide">
                        Exchange Tools
                      </span>
                    </div>
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* Property Types Carousel Section */}
          <section className="relative bg-navy">
            <div className="grid lg:grid-cols-2">
              {/* Left Panel */}
              <div className="relative min-h-[400px] lg:min-h-[600px] overflow-hidden">
                <Image
                  src={propertyCategories[carouselIndex].image}
                  alt={propertyCategories[carouselIndex].title}
                  fill
                  className="object-cover transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-navy/80 via-navy/40 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-center p-8 lg:p-16">
                  <p className="text-lime text-sm uppercase tracking-ultra-wide font-semibold mb-4">
                    Property Type
                  </p>
                  <h3 className="font-heading text-3xl md:text-4xl lg:text-5xl text-white mb-4">
                    {propertyCategories[carouselIndex].title}
                  </h3>
                  <p className="text-white/80 text-lg mb-8 max-w-md">
                    {propertyCategories[carouselIndex].description}
                  </p>
                  <Link
                    href={propertyCategories[carouselIndex].href}
                    className="inline-flex items-center gap-3 bg-white text-navy px-6 py-3 text-sm font-semibold uppercase tracking-wider w-fit hover:bg-lime transition-colors duration-300"
                  >
                    View Properties
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
              
              {/* Right Panel */}
              <div className="relative min-h-[400px] lg:min-h-[600px] overflow-hidden">
                <Image
                  src={propertyCategories[(carouselIndex + 1) % propertyCategories.length].image}
                  alt={propertyCategories[(carouselIndex + 1) % propertyCategories.length].title}
                  fill
                  className="object-cover transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-navy/80 via-navy/40 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-center items-end text-right p-8 lg:p-16">
                  <p className="text-lime text-sm uppercase tracking-ultra-wide font-semibold mb-4">
                    Property Type
                  </p>
                  <h3 className="font-heading text-3xl md:text-4xl lg:text-5xl text-white mb-4">
                    {propertyCategories[(carouselIndex + 1) % propertyCategories.length].title}
                  </h3>
                  <p className="text-white/80 text-lg mb-8 max-w-md">
                    {propertyCategories[(carouselIndex + 1) % propertyCategories.length].description}
                  </p>
                  <Link
                    href={propertyCategories[(carouselIndex + 1) % propertyCategories.length].href}
                    className="inline-flex items-center gap-3 bg-white text-navy px-6 py-3 text-sm font-semibold uppercase tracking-wider w-fit hover:bg-lime transition-colors duration-300"
                  >
                    View Properties
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Carousel Navigation */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3">
              {propertyCategories.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollToIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === carouselIndex || index === (carouselIndex + 1) % propertyCategories.length
                      ? "bg-lime scale-125"
                      : "bg-white/40 hover:bg-white/60"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </section>

          {/* Featured Tools Section */}
          <section className="bg-cream py-20 md:py-28">
            <div className="max-w-7xl mx-auto px-6 lg:px-10">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={stagger}
                className="text-center mb-16"
              >
                <motion.h2
                  variants={fadeIn}
                  className="font-heading text-3xl md:text-4xl lg:text-5xl text-navy tracking-wide uppercase"
                >
                  Featured Tools
                </motion.h2>
                <motion.p variants={fadeIn} className="mt-4 text-gray-600 max-w-2xl mx-auto">
                  Free calculators and resources to help you plan your 1031 exchange.
                </motion.p>
              </motion.div>
              
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={stagger}
                className="grid md:grid-cols-3 gap-8"
              >
                {tools.map((tool) => (
                  <motion.div key={tool.href} variants={fadeIn}>
                    <Link
                      href={tool.href}
                      className="group block bg-white shadow-elegant hover:shadow-elegant-lg transition-all duration-300 h-full"
                    >
                      <div className="relative h-48 bg-navy overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="font-heading text-6xl text-lime/20 group-hover:text-lime/30 transition-colors duration-300">
                            1031
                          </span>
                        </div>
                        <div className="absolute top-4 right-4">
                          <span className="bg-lime text-navy-dark text-xs font-bold uppercase tracking-wider px-3 py-1.5">
                            {tool.badge}
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="font-heading text-xl text-navy group-hover:text-lime-dark transition-colors duration-300">
                          {tool.name}
                        </h3>
                        <p className="mt-3 text-gray-600 text-sm leading-relaxed">
                          {tool.description}
                        </p>
                        <div className="mt-6 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-navy group-hover:text-lime-dark transition-colors duration-300">
                          Use Tool
                          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
              
              <div className="text-center mt-12">
                <Link
                  href="/tools"
                  className="inline-flex items-center justify-center bg-navy text-white px-8 py-4 text-sm font-semibold uppercase tracking-wider hover:bg-navy-light transition-colors duration-300"
                >
                  View All Tools
                </Link>
              </div>
            </div>
          </section>

          {/* Featured Locations Grid */}
          <section className="bg-white py-20 md:py-28">
            <div className="max-w-7xl mx-auto px-6 lg:px-10">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={stagger}
                className="text-center mb-16"
              >
                <motion.h2
                  variants={fadeIn}
                  className="font-heading text-3xl md:text-4xl lg:text-5xl text-navy tracking-wide uppercase"
                >
                  Featured Locations
                </motion.h2>
                <motion.p variants={fadeIn} className="mt-4 text-gray-600 max-w-2xl mx-auto">
                  Browse our areas of expertise below.
                </motion.p>
              </motion.div>
              
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-0">
                {featuredLocations.map((location, index) => (
                  <Link
                    key={location.slug}
                    href={location.slug}
                    className="group relative h-64 lg:h-80 overflow-hidden"
                  >
                    <Image
                      src={location.image}
                      alt={location.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-navy/40 group-hover:bg-navy/30 transition-colors duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <h3 className="font-heading text-2xl lg:text-3xl text-white uppercase tracking-wider">
                        {location.name}
                      </h3>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <div className="bg-navy p-4 text-center">
                        <span className="text-sm font-semibold uppercase tracking-wider text-lime">
                          Learn More
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              
              <div className="text-center mt-12">
                <Link
                  href={LOCATIONS_ROUTE}
                  className="inline-flex items-center justify-center bg-navy text-white px-8 py-4 text-sm font-semibold uppercase tracking-wider hover:bg-navy-light transition-colors duration-300"
                >
                  View All
                </Link>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="bg-cream py-20 md:py-28">
            <div className="max-w-4xl mx-auto px-6 lg:px-10">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={stagger}
                className="text-center mb-16"
              >
                <motion.h2
                  variants={fadeIn}
                  className="font-heading text-3xl md:text-4xl lg:text-5xl text-navy tracking-wide uppercase"
                >
                  Frequently Asked Questions
                </motion.h2>
              </motion.div>
              
              <div className="space-y-4">
                {faqItems.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white border border-gray-200"
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      className="w-full flex items-center justify-between p-6 text-left"
                    >
                      <span className="font-heading text-lg text-navy pr-4">{item.question}</span>
                      <span className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full border border-navy text-navy transition-transform duration-300 ${openFaq === index ? "rotate-45" : ""}`}>
                        +
                      </span>
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        openFaq === index ? "max-h-96" : "max-h-0"
                      }`}
                    >
                      <p className="px-6 pb-6 text-gray-600 leading-relaxed">
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
                className="object-cover"
              />
              <div className="absolute inset-0 bg-navy/80" />
            </div>
            
            <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={stagger}
                className="space-y-8"
              >
                <motion.h2
                  variants={fadeIn}
                  className="font-heading text-3xl md:text-4xl lg:text-5xl text-white uppercase tracking-wide"
                >
                  Partner With Our Expert Team
                </motion.h2>
                <motion.p variants={fadeIn} className="text-white/80 text-lg max-w-2xl mx-auto">
                  Our San Jose team delivers deep local knowledge and full-service support for your 1031 exchange. 
                  Let us guide you through the process with precision, compliance, and personalized care.
                </motion.p>
                <motion.div variants={fadeIn}>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center bg-white text-navy px-8 py-4 text-sm font-semibold uppercase tracking-wider hover:bg-lime hover:text-navy-dark transition-all duration-300"
                  >
                    Let's Get Started
                  </Link>
                </motion.div>
              </motion.div>
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
