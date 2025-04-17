import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRightIcon, PlusIcon } from "@/lib/icons";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

type Service = {
  id: number;
  name: string;
  description: string;
  price: number;
  duration: number;
  category: string;
};

const serviceCategories = ["All Services", "Haircuts", "Coloring", "Styling", "Treatments"];

export default function ServicesSection() {
  const [selectedCategory, setSelectedCategory] = useState("All Services");

  const { data: services, isLoading } = useQuery<Service[]>({
    queryKey: [
      `/api/services${selectedCategory !== "All Services" ? `?category=${selectedCategory}` : ""}`,
    ],
  });

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <section id="services" className="py-10 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold font-heading text-[#333333] mb-2">
            Our Services
          </h2>
          <p className="text-gray-600">Professional treatments for everyone</p>
        </div>

        {/* Service Categories */}
        <div className="flex overflow-x-auto scroll-hidden mb-6 pb-2 no-scrollbar">
          {serviceCategories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className={`whitespace-nowrap mr-3 text-sm font-medium rounded-full ${
                selectedCategory === category
                  ? "bg-[#FF6B6B] text-white"
                  : "bg-white text-[#333333]"
              }`}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Service List */}
        <div className="space-y-4">
          {isLoading ? (
            // Loading skeleton
            Array.from({ length: 4 }).map((_, index) => (
              <Card key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="w-3/4">
                      <Skeleton className="h-6 w-48 mb-2" />
                      <Skeleton className="h-4 w-full mb-2" />
                      <div className="flex items-center">
                        <Skeleton className="h-5 w-16 rounded-full" />
                      </div>
                    </div>
                    <div className="text-right">
                      <Skeleton className="h-6 w-16 mb-2" />
                      <Skeleton className="h-5 w-8 ml-auto" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            services?.map((service) => (
              <Card key={service.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg text-[#333333] mb-1">
                        {service.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-2">
                        {service.description}
                      </p>
                      <div className="flex items-center">
                        <Badge className="text-xs bg-[#4ECDC4] bg-opacity-10 text-[#4ECDC4] px-2 py-1 rounded-full">
                          {service.duration} min
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-[#333333] text-lg">
                        ₹{service.price}
                      </p>
                      <Button
                        variant="ghost"
                        className="mt-2 text-[#FF6B6B] text-sm font-medium hover:bg-transparent hover:text-[#FF6B6B]/80 p-0"
                      >
                        <PlusIcon className="h-3 w-3 mr-1" /> Add
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}

          <div className="text-center mt-6">
            <Button
              variant="ghost"
              className="text-[#FF6B6B] font-medium flex items-center mx-auto hover:bg-transparent"
            >
              View All Services
              <ChevronRightIcon className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
