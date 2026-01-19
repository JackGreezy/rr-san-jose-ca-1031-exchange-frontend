import Link from "next/link";
import { servicesData } from "../data/services";
import { locationsData } from "../data/locations";
import { LOCATIONS_ROUTE } from "../lib/config";

const phoneNumberDisplay = "(408) 539-2254";
const phoneNumberHref = "tel:+14085392254";
const email = "hello@1031exchangesanjose.com";
const address = "84 West Santa Clara St, San Jose, CA 95113";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Property Types", href: "/property-types" },
  { label: "Locations", href: LOCATIONS_ROUTE },
  { label: "Contact Us", href: "/contact" },
];

const tools = [
  { name: "Boot Calculator", href: "/tools/boot-calculator" },
  { name: "Exchange Cost Estimator", href: "/tools/exchange-cost-estimator" },
  { name: "Identification Rules Checker", href: "/tools/identification-rules-checker" },
];

export default function Footer() {
  const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;

  return (
    <footer className="bg-navy text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-5">
          {/* Logo & Contact Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Logo - Two lines, elegant like header */}
            <Link href="/" className="inline-block">
              <div className="flex flex-col leading-tight">
                <span className="text-[13px] font-light tracking-[0.35em] uppercase text-white">
                  1031 Exchange
                </span>
                <span className="text-[11px] font-light tracking-[0.3em] uppercase text-white/60">
                  San Jose
                </span>
              </div>
            </Link>
            
            <div className="space-y-4 pt-6">
              <a
                href={phoneNumberHref}
                className="block text-lg text-white hover:text-white/70 transition-colors"
              >
                {phoneNumberDisplay}
              </a>
              <a
                href={`mailto:${email}`}
                className="block text-lg text-white hover:text-white/70 transition-colors"
              >
                {email}
              </a>
            </div>
            
            <div className="pt-4">
              <p className="text-white/80 font-light">
                {address.split(",")[0]}
              </p>
              <p className="text-white/80 font-light">
                {address.split(",").slice(1).join(",")}
              </p>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="lg:col-span-1">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/40 mb-6">
              Quick Links
            </p>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/80 hover:text-white transition-colors text-sm font-light"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
        </div>

          {/* Services */}
          <div className="lg:col-span-1">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/40 mb-6">
              Services
            </p>
            <ul className="space-y-3">
              {servicesData.slice(0, 6).map((service) => (
              <li key={service.slug}>
                  <Link
                    href={service.route}
                    className="text-white/80 hover:text-white transition-colors text-sm font-light"
                  >
                  {service.name}
                </Link>
              </li>
            ))}
            <li className="pt-2">
                <Link
                  href="/services"
                  className="text-white hover:text-white/70 transition-colors text-xs font-medium uppercase tracking-[0.15em]"
                >
                  View All Services
              </Link>
            </li>
          </ul>
        </div>

          {/* Locations */}
          <div className="lg:col-span-1">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/40 mb-6">
              Locations
            </p>
            <ul className="space-y-3">
              {locationsData.slice(0, 8).map((location) => (
                <li key={location.slug}>
                  <Link
                    href={location.route}
                    className="text-white/80 hover:text-white transition-colors text-sm font-light"
                  >
                    {location.name}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link
                  href={LOCATIONS_ROUTE}
                  className="text-white hover:text-white/70 transition-colors text-xs font-medium uppercase tracking-[0.15em]"
                >
                  View All Locations
                </Link>
              </li>
            </ul>
          </div>

          {/* Tools */}
          <div className="lg:col-span-1">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/40 mb-6">
              Exchange Tools
            </p>
            <ul className="space-y-3">
              {tools.map((tool) => (
                <li key={tool.href}>
                  <Link
                    href={tool.href}
                    className="text-white/80 hover:text-white transition-colors text-sm font-light"
                  >
                    {tool.name}
                </Link>
              </li>
            ))}
            <li className="pt-2">
                <Link
                  href="/tools"
                  className="text-white hover:text-white/70 transition-colors text-xs font-medium uppercase tracking-[0.15em]"
                >
                  View All Tools
              </Link>
            </li>
          </ul>
            
            {/* Social Icons */}
            <div className="mt-10">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/40 mb-4">
                Follow Us
              </p>
              <div className="flex items-center gap-3">
                {/* Facebook */}
                <a
                  href="#"
                  className="w-10 h-10 border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-all duration-300"
                  aria-label="Facebook"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                
                {/* LinkedIn */}
                <a
                  href="#"
                  className="w-10 h-10 border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-all duration-300"
                  aria-label="LinkedIn"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                
                {/* YouTube */}
                <a
                  href="#"
                  className="w-10 h-10 border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-all duration-300"
                  aria-label="YouTube"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Google Maps Embed */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12">
          <div className="w-full h-64 rounded-lg overflow-hidden border border-white/20">
            <iframe
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={mapEmbedUrl}
              title="Office Location Map"
            />
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8">
          <p className="text-white/40 text-xs leading-relaxed max-w-4xl font-light">
            All information is deemed reliable but not guaranteed and should be independently reviewed and verified.
            This site helps investors identify potential replacement properties for Section 1031 exchanges.
            This site is not a Qualified Intermediary, law firm, broker, or CPA. Users should consult a Qualified Intermediary and tax advisor before acting.
          </p>
        </div>
      </div>
      
      {/* Copyright Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs font-light">
            Copyright &copy; {new Date().getFullYear()} 1031 Exchange San Jose
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-white/40 hover:text-white text-xs transition-colors font-light"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-white/40 hover:text-white text-xs transition-colors font-light"
            >
              Terms of Service
            </Link>
            <Link
              href="/sitemap.xml"
              className="text-white/40 hover:text-white text-xs transition-colors font-light"
            >
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
