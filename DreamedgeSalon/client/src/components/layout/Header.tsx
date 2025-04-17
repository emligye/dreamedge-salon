import { useState } from "react";
import { Link } from "wouter";
import { MenuIcon } from "@/lib/icons";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="relative">
      <div className="bg-white shadow-sm fixed top-0 left-0 right-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold font-heading text-[#333333]">
            <Link href="/" className="cursor-pointer">
              <span className="text-primary">Dream</span>Edge Unisex
            </Link>
          </h1>
          <button
            className="text-[#333333] focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <MenuIcon className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-16 right-0 bg-white shadow-md w-64 h-screen z-20 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="py-4 px-6">
          <nav>
            <ul>
              <li className="mb-4">
                <a
                  href="#home"
                  className="text-[#333333] hover:text-primary block py-2"
                  onClick={closeMenu}
                >
                  Home
                </a>
              </li>
              <li className="mb-4">
                <a
                  href="#services"
                  className="text-[#333333] hover:text-primary block py-2"
                  onClick={closeMenu}
                >
                  Services
                </a>
              </li>
              <li className="mb-4">
                <a
                  href="#stylists"
                  className="text-[#333333] hover:text-primary block py-2"
                  onClick={closeMenu}
                >
                  Our Stylists
                </a>
              </li>
              <li className="mb-4">
                <a
                  href="#gallery"
                  className="text-[#333333] hover:text-primary block py-2"
                  onClick={closeMenu}
                >
                  Gallery
                </a>
              </li>
              <li className="mb-4">
                <a
                  href="#booking"
                  className="text-[#333333] hover:text-primary block py-2"
                  onClick={closeMenu}
                >
                  Book Appointment
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-[#333333] hover:text-primary block py-2"
                  onClick={closeMenu}
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
