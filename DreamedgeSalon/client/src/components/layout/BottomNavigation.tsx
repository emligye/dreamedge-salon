import { useCallback } from "react";
import { Link, useLocation } from "wouter";
import { 
  HomeIcon, 
  ServicesIcon, 
  BookingIcon, 
  GalleryIcon, 
  ContactIcon,
  GlobeIcon 
} from "@/lib/icons";

export default function BottomNavigation() {
  const [location] = useLocation();
  const isHomePage = location === "/";

  const scrollToSection = useCallback((sectionId: string) => {
    // Only scroll if we're on the home page
    if (!isHomePage) {
      window.location.href = "/#" + sectionId;
      return;
    }
    
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 70,
        behavior: "smooth",
      });
    }
  }, [isHomePage]);

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg px-2 py-3 flex justify-around items-center z-10">
      {/* Home button - shows active on home page */}
      <a
        onClick={() => scrollToSection("home")}
        className={`flex flex-col items-center cursor-pointer ${isHomePage ? "text-primary" : "text-gray-500 hover:text-primary"}`}
      >
        <HomeIcon className="w-5 h-5" />
        <span className="text-xs mt-1">Home</span>
      </a>
      
      {/* Services button */}
      <a
        onClick={() => scrollToSection("services")}
        className="flex flex-col items-center text-gray-500 hover:text-primary cursor-pointer"
      >
        <ServicesIcon className="w-5 h-5" />
        <span className="text-xs mt-1">Services</span>
      </a>
      
      {/* Book button with highlighted circle */}
      <a
        onClick={() => scrollToSection("booking")}
        className="flex flex-col items-center cursor-pointer"
      >
        <div className="bg-primary text-white rounded-full p-3 -mt-6 shadow-lg">
          <BookingIcon className="w-5 h-5" />
        </div>
        <span className="text-xs mt-1">Book</span>
      </a>
      
      {/* Location button - shows active on location page */}
      <Link
        href="/location"
        className={`flex flex-col items-center cursor-pointer ${location === "/location" ? "text-primary" : "text-gray-500 hover:text-primary"}`}
      >
        <GlobeIcon className="w-5 h-5" />
        <span className="text-xs mt-1">Location</span>
      </Link>
      
      {/* Contact button */}
      <a
        onClick={() => scrollToSection("contact")}
        className="flex flex-col items-center text-gray-500 hover:text-primary cursor-pointer"
      >
        <ContactIcon className="w-5 h-5" />
        <span className="text-xs mt-1">Contact</span>
      </a>
    </nav>
  );
}
