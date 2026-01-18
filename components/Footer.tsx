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
  return (
    <footer className="bg-navy text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Logo & Contact Info */}
          <div className="lg:col-span-4 space-y-6">
            {/* Logo */}
            <div className="flex flex-col leading-tight">
              <span className="font-heading text-4xl italic text-lime">1031</span>
              <span className="text-sm font-medium tracking-[0.2em] text-white/90 italic">Exchange</span>
              <span className="text-lg font-semibold tracking-wider text-white uppercase mt-1">San Jose</span>
            </div>
            
            <div className="space-y-4 pt-4">
              <p className="text-sm font-semibold uppercase tracking-wider text-lime">
                1031 Exchange San Jose
              </p>
              <a
                href={phoneNumberHref}
                className="block text-lg text-white hover:text-lime transition-colors underline underline-offset-4 decoration-white/30 hover:decoration-lime"
              >
                {phoneNumberDisplay}
              </a>
              <a
                href={`mailto:${email}`}
                className="block text-lg text-white hover:text-lime transition-colors underline underline-offset-4 decoration-white/30 hover:decoration-lime"
              >
                {email}
              </a>
            </div>
            
            <div className="pt-4">
              <p className="text-sm font-semibold uppercase tracking-wider text-lime mb-3">
                Address
              </p>
              <p className="text-white/80">
                {address.split(",")[0]}
              </p>
              <p className="text-white/80">
                {address.split(",").slice(1).join(",")}
              </p>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="lg:col-span-2">
            <p className="text-sm font-semibold uppercase tracking-wider text-lime mb-6">
              Quick Links
            </p>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/80 hover:text-white transition-colors text-sm uppercase tracking-wide underline-offset-4 hover:underline decoration-lime"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Services */}
          <div className="lg:col-span-3">
            <p className="text-sm font-semibold uppercase tracking-wider text-lime mb-6">
              Services
            </p>
            <ul className="space-y-3 max-h-48 overflow-y-auto pr-2">
              {servicesData.slice(0, 8).map((service) => (
                <li key={service.slug}>
                  <Link
                    href={service.route}
                    className="text-white/80 hover:text-white transition-colors text-sm"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link
                  href="/services"
                  className="text-lime hover:text-lime-light transition-colors text-sm font-semibold uppercase tracking-wide"
                >
                  View All Services
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Tools & Social */}
          <div className="lg:col-span-3">
            <p className="text-sm font-semibold uppercase tracking-wider text-lime mb-6">
              Exchange Tools
            </p>
            <ul className="space-y-3">
              {tools.map((tool) => (
                <li key={tool.href}>
                  <Link
                    href={tool.href}
                    className="text-white/80 hover:text-white transition-colors text-sm"
                  >
                    {tool.name}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link
                  href="/tools"
                  className="text-lime hover:text-lime-light transition-colors text-sm font-semibold uppercase tracking-wide"
                >
                  View All Tools
                </Link>
              </li>
            </ul>
            
            {/* Social Icons */}
            <div className="mt-10">
              <p className="text-sm font-semibold uppercase tracking-wider text-lime mb-4">
                Follow Us
              </p>
              <div className="flex items-center gap-3">
                {/* Facebook */}
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-navy-light flex items-center justify-center text-white hover:bg-lime hover:text-navy transition-all duration-300"
                  aria-label="Facebook"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                
                {/* LinkedIn */}
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-navy-light flex items-center justify-center text-white hover:bg-lime hover:text-navy transition-all duration-300"
                  aria-label="LinkedIn"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                
                {/* YouTube */}
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-navy-light flex items-center justify-center text-white hover:bg-lime hover:text-navy transition-all duration-300"
                  aria-label="YouTube"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
                
                {/* Google */}
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-navy-light flex items-center justify-center text-white hover:bg-lime hover:text-navy transition-all duration-300"
                  aria-label="Google"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Disclaimer */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8">
          <p className="text-white/60 text-sm leading-relaxed max-w-4xl">
            All information is deemed reliable but not guaranteed and should be independently reviewed and verified.
            This site helps investors identify potential replacement properties for Section 1031 exchanges.
            This site is not a Qualified Intermediary, law firm, broker, or CPA. Users should consult a Qualified Intermediary and tax advisor before acting.
          </p>
        </div>
      </div>
      
      {/* Copyright Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/50 text-sm">
            Copyright &copy; {new Date().getFullYear()} 1031 Exchange San Jose
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-white/50 hover:text-white text-sm transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-white/50 hover:text-white text-sm transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/sitemap.xml"
              className="text-white/50 hover:text-white text-sm transition-colors"
            >
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
