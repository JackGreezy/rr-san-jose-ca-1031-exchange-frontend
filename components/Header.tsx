"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { servicesData } from "../data/services";
import { locationsData } from "../data/locations";
import { LOCATIONS_ROUTE } from "../lib/config";

const phoneNumberDisplay = "(408) 539-2254";
const phoneNumberHref = "tel:+14085392254";

const topServices = servicesData.slice(0, 8).map((s) => ({
  title: s.name,
  slug: s.route,
}));

const topLocations = locationsData.slice(0, 8).map((l) => ({
  title: l.name,
  slug: l.route,
}));

const tools = [
  { name: "Boot Calculator", href: "/tools/boot-calculator" },
  { name: "Exchange Cost Estimator", href: "/tools/exchange-cost-estimator" },
  { name: "Identification Rules Checker", href: "/tools/identification-rules-checker" },
];

export default function Header() {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [locationsOpen, setLocationsOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const locationsRef = useRef<HTMLDivElement>(null);
  const toolsRef = useRef<HTMLDivElement>(null);
  const servicesTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const locationsTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const toolsTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setServicesOpen(false);
        setLocationsOpen(false);
        setToolsOpen(false);
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const handleServicesMouseEnter = () => {
    if (servicesTimeoutRef.current) clearTimeout(servicesTimeoutRef.current);
    setServicesOpen(true);
  };

  const handleServicesMouseLeave = () => {
    if (servicesTimeoutRef.current) clearTimeout(servicesTimeoutRef.current);
    servicesTimeoutRef.current = setTimeout(() => {
      setServicesOpen(false);
    }, 300);
  };

  const handleLocationsMouseEnter = () => {
    if (locationsTimeoutRef.current) clearTimeout(locationsTimeoutRef.current);
    setLocationsOpen(true);
  };

  const handleLocationsMouseLeave = () => {
    if (locationsTimeoutRef.current) clearTimeout(locationsTimeoutRef.current);
    locationsTimeoutRef.current = setTimeout(() => {
      setLocationsOpen(false);
    }, 300);
  };

  const handleToolsMouseEnter = () => {
    if (toolsTimeoutRef.current) clearTimeout(toolsTimeoutRef.current);
    setToolsOpen(true);
  };

  const handleToolsMouseLeave = () => {
    if (toolsTimeoutRef.current) clearTimeout(toolsTimeoutRef.current);
    toolsTimeoutRef.current = setTimeout(() => {
      setToolsOpen(false);
    }, 300);
  };

  return (
    <header className="sticky top-0 z-50 bg-navy">
      <nav className="max-w-7xl mx-auto px-6 lg:px-10" aria-label="Main navigation">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition">
            <div className="flex flex-col leading-tight">
              <span className="font-heading text-2xl italic text-lime">1031</span>
              <span className="text-[10px] font-medium tracking-[0.2em] text-white/90 italic">Exchange</span>
              <span className="text-xs font-semibold tracking-wider text-white uppercase">San Jose</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {/* Services Dropdown */}
            <div
              ref={servicesRef}
              className="relative"
              onMouseEnter={handleServicesMouseEnter}
              onMouseLeave={handleServicesMouseLeave}
            >
              <button
                type="button"
                className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-super-wide text-white hover:text-lime transition"
                aria-expanded={servicesOpen}
                aria-haspopup="true"
                onClick={() => setServicesOpen(!servicesOpen)}
              >
                Services
                <svg
                  className={`w-3 h-3 transition-transform ${servicesOpen ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {servicesOpen && (
                <div className="absolute top-full left-0 mt-4 w-80 bg-white shadow-elegant-lg rounded-sm py-4 border-t-2 border-lime">
                  <div className="space-y-0.5">
                    {topServices.map((service) => (
                      <Link
                        key={service.slug}
                        href={service.slug}
                        className="block px-5 py-2.5 text-sm text-navy hover:bg-cream hover:text-navy-dark transition"
                        onClick={() => setServicesOpen(false)}
                      >
                        {service.title}
                      </Link>
                    ))}
                  </div>
                  <div className="border-t border-gray-200 mt-3 pt-3 px-5">
                    <Link
                      href="/services"
                      className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-navy hover:text-lime transition"
                      onClick={() => setServicesOpen(false)}
                    >
                      View All Services
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Locations Dropdown */}
            <div
              ref={locationsRef}
              className="relative"
              onMouseEnter={handleLocationsMouseEnter}
              onMouseLeave={handleLocationsMouseLeave}
            >
              <button
                type="button"
                className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-super-wide text-white hover:text-lime transition"
                aria-expanded={locationsOpen}
                aria-haspopup="true"
                onClick={() => setLocationsOpen(!locationsOpen)}
              >
                Locations
                <svg
                  className={`w-3 h-3 transition-transform ${locationsOpen ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {locationsOpen && (
                <div className="absolute top-full left-0 mt-4 w-64 bg-white shadow-elegant-lg rounded-sm py-4 border-t-2 border-lime">
                  <div className="space-y-0.5">
                    {topLocations.map((location) => (
                      <Link
                        key={location.slug}
                        href={location.slug}
                        className="block px-5 py-2.5 text-sm text-navy hover:bg-cream hover:text-navy-dark transition"
                        onClick={() => setLocationsOpen(false)}
                      >
                        {location.title}
                      </Link>
                    ))}
                  </div>
                  <div className="border-t border-gray-200 mt-3 pt-3 px-5">
                    <Link
                      href={LOCATIONS_ROUTE}
                      className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-navy hover:text-lime transition"
                      onClick={() => setLocationsOpen(false)}
                    >
                      View All Locations
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Tools Dropdown */}
            <div
              ref={toolsRef}
              className="relative"
              onMouseEnter={handleToolsMouseEnter}
              onMouseLeave={handleToolsMouseLeave}
            >
              <button
                type="button"
                className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-super-wide text-white hover:text-lime transition"
                aria-expanded={toolsOpen}
                aria-haspopup="true"
                onClick={() => setToolsOpen(!toolsOpen)}
              >
                Tools
                <svg
                  className={`w-3 h-3 transition-transform ${toolsOpen ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {toolsOpen && (
                <div className="absolute top-full left-0 mt-4 w-72 bg-white shadow-elegant-lg rounded-sm py-4 border-t-2 border-lime">
                  <div className="space-y-0.5">
                    {tools.map((tool) => (
                      <Link
                        key={tool.href}
                        href={tool.href}
                        className="block px-5 py-2.5 text-sm text-navy hover:bg-cream hover:text-navy-dark transition"
                        onClick={() => setToolsOpen(false)}
                      >
                        {tool.name}
                      </Link>
                    ))}
                  </div>
                  <div className="border-t border-gray-200 mt-3 pt-3 px-5">
                    <Link
                      href="/tools"
                      className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-navy hover:text-lime transition"
                      onClick={() => setToolsOpen(false)}
                    >
                      View All Tools
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/property-types"
              className="text-xs font-semibold uppercase tracking-super-wide text-white hover:text-lime transition"
            >
              Property Types
            </Link>

            <Link
              href="/blog"
              className="text-xs font-semibold uppercase tracking-super-wide text-white hover:text-lime transition"
            >
              Blog
            </Link>

            <Link
              href="/contact"
              className="text-xs font-semibold uppercase tracking-super-wide text-white hover:text-lime transition"
            >
              Contact Us
            </Link>

            <a
              href={phoneNumberHref}
              className="text-xs font-semibold uppercase tracking-super-wide text-white hover:text-lime transition"
            >
              {phoneNumberDisplay}
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="lg:hidden flex items-center justify-center w-12 h-12 rounded-full bg-white text-navy hover:bg-lime transition"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-navy border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-6 space-y-4">
            <Link
              href="/services"
              className="block text-sm font-semibold uppercase tracking-wide text-white hover:text-lime transition py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              href={LOCATIONS_ROUTE}
              className="block text-sm font-semibold uppercase tracking-wide text-white hover:text-lime transition py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Locations
            </Link>
            <Link
              href="/tools"
              className="block text-sm font-semibold uppercase tracking-wide text-white hover:text-lime transition py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Tools
            </Link>
            <Link
              href="/property-types"
              className="block text-sm font-semibold uppercase tracking-wide text-white hover:text-lime transition py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Property Types
            </Link>
            <Link
              href="/blog"
              className="block text-sm font-semibold uppercase tracking-wide text-white hover:text-lime transition py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Blog
            </Link>
            <Link
              href="/contact"
              className="block text-sm font-semibold uppercase tracking-wide text-white hover:text-lime transition py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact Us
            </Link>
            <a
              href={phoneNumberHref}
              className="block text-sm font-semibold uppercase tracking-wide text-lime py-2"
            >
              {phoneNumberDisplay}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
