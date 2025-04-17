import { Button } from "@/components/ui/button";
import { ClockIcon } from "@/lib/icons";

export default function HeroSection() {
  const scrollToBooking = () => {
    const bookingSection = document.getElementById("booking");
    if (bookingSection) {
      window.scrollTo({
        top: bookingSection.offsetTop - 70,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="home" className="relative h-[70vh] bg-[#333333] mb-8">
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
          alt="Salon interior"
          className="w-full h-full object-cover opacity-60"
        />
      </div>
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-white font-heading mb-4">
          Dream<span className="text-primary">Edge</span> Unisex Salon
        </h1>
        <p className="text-xl text-white mb-8">Where Style Meets Confidence</p>
        <Button 
          onClick={scrollToBooking}
          className="bg-primary hover:bg-primary/90 text-white font-medium py-3 px-8 rounded-full transition duration-300"
        >
          Book Appointment
        </Button>
      </div>
      <div className="absolute bottom-0 left-0 right-0 flex justify-center">
        <div className="bg-white shadow-lg rounded-t-lg px-6 py-4 flex items-center space-x-4">
          <div>
            <ClockIcon className="text-primary w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-[#333333]">Open Today</p>
            <p className="font-semibold text-[#333333]">9:00 AM - 8:00 PM</p>
          </div>
        </div>
      </div>
    </section>
  );
}
