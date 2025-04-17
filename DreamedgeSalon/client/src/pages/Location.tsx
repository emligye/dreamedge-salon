import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PhoneIcon, MailIcon } from "@/lib/icons";
import Header from "@/components/layout/Header";
import BottomNavigation from "@/components/layout/BottomNavigation";

export default function Location() {
  return (
    <div className="min-h-screen bg-gray-50 pt-16 pb-20">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Our Location</h1>
        
        <div className="max-w-5xl mx-auto">
          {/* Map Section */}
          <div className="w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden mb-8 shadow-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3564.7776622883316!2d88.42953807606442!3d26.695942868402856!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e444d7c0fb6695%3A0x73ee65888a0e709!2sPCFQ%2BW7C%2C%20Haiderpara%20Main%20Rd%2C%20Hakim%20Para%2C%20Siliguri%2C%20West%20Bengal%20734001!5e0!3m2!1sen!2sin!4v1713376879001!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="DreamEdge Unisex Salon Location"
            ></iframe>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Address Card */}
            <Card className="bg-white rounded-lg shadow-sm">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Salon Address</h2>
                <p className="text-gray-700 mb-4">
                  PCFQ+W7C, Haiderpara Main Rd,<br />
                  Ward 40, Hakim Para, Siliguri,<br />
                  West Bengal 734001
                </p>
                
                <h3 className="text-lg font-medium mb-2">Directions</h3>
                <p className="text-gray-600 mb-6">
                  Located in Hakim Para, our salon is easily accessible from Siliguri Junction. You can find us on Haiderpara Main Road, close to the marketplace.
                </p>
                
                <div className="flex gap-4">
                  <Button 
                    className="bg-primary hover:bg-primary/90 text-white" 
                    onClick={() => window.open('https://goo.gl/maps/6JxZ8G7Hq6T2zs9y6', '_blank')}
                  >
                    Get Directions
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="border-primary text-primary hover:bg-primary/10"
                    onClick={() => window.open('tel:+919876543210')}
                  >
                    Call Us
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Additional Info Card */}
            <Card className="bg-white rounded-lg shadow-sm">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Opening Hours</h2>
                <ul className="text-gray-700 mb-6 space-y-2">
                  <li className="flex justify-between">
                    <span>Monday</span>
                    <span>9:00 AM - 9:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Tuesday</span>
                    <span className="text-red-500 font-medium">Closed</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Wednesday - Friday</span>
                    <span>9:00 AM - 9:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Saturday</span>
                    <span>9:00 AM - 9:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Sunday</span>
                    <span>10:00 AM - 6:00 PM</span>
                  </li>
                </ul>
                
                <h3 className="text-lg font-medium mb-2">Contact Information</h3>
                <p className="flex items-center mb-2">
                  <PhoneIcon className="text-primary mr-2 h-4 w-4" />
                  <span className="text-gray-700">+91 98765 43210</span>
                </p>
                <p className="flex items-center">
                  <MailIcon className="text-primary mr-2 h-4 w-4" />
                  <span className="text-gray-700">info@dreamedge.com</span>
                </p>
              </CardContent>
            </Card>
          </div>
          
          {/* Landmark Directions */}
          <Card className="bg-white rounded-lg shadow-sm mt-6">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Nearby Landmarks</h2>
              <ul className="list-disc pl-5 text-gray-700 space-y-2">
                <li>500 meters from Siliguri Junction Railway Station</li>
                <li>Walking distance from Hakim Para Market</li>
                <li>10 minutes drive from Siliguri Bus Station</li>
                <li>Near Hakim Para Post Office</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <BottomNavigation />
    </div>
  );
}