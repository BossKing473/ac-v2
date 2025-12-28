"use client";

import React from "react";
import Link from "next/link";
import {
  Facebook,
  Instagram,
  MapPin,
  Phone,
  Mail
} from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-20 pb-10">
      <div className="container mx-auto px-6">

        {/* Top Grid */}
        <div className="grid md:grid-cols-4 gap-12 mb-16">

          {/* Brand */}
          <div className="md:col-span-2">
            <Link
              href="/dashboard"
              className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-purple-300 bg-clip-text text-transparent inline-block mb-6"
            >
              AccessibleConnections
            </Link>

            <p className="text-gray-400 max-w-sm leading-relaxed mb-8">
              Empowering Persons with Disabilities in the Philippines through
              accessible technology, education, and community support.
            </p>

            {/* Socials */}
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/share/1D173GCgyh/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-purple-600 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-purple-600 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-white">Quick Links</h4>
            <ul className="space-y-4 text-gray-400">
              {[
                { name: "About Us", href: "/about" },
                { name: "Our Services", href: "/services" },
                { name: "Library", href: "/library" },
                { name: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-purple-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-white">Contact Info</h4>
            <ul className="space-y-4 text-gray-400">

              <li className="flex items-start gap-3">
                <MapPin className="text-purple-500 mt-1" size={18} />
                <span>
                  Makati Science Technological Institute, Manila
                </span>
              </li>

              <li className="flex items-center gap-3">
                <Phone className="text-purple-500" size={18} />
                <span>(02) 8888 9999</span>
              </li>

              <li className="flex items-center gap-3">
                <Mail className="text-purple-500" size={18} />
                <span>info@accessibleconnections.ph</span>
              </li>

            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
          <p>
            &copy; 2024 Accessible Connections. All rights reserved.
          </p>

          <div className="flex gap-6 mt-4 md:mt-0">
            {[
              "Privacy Policy",
              "Terms of Service",
              "Accessibility Statement",
            ].map((item) => (
              <Link
                key={item}
                href="#"
                className="hover:text-white transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
