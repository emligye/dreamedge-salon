import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ChevronRightIcon } from "@/lib/icons";
import { Skeleton } from "@/components/ui/skeleton";

type GalleryItem = {
  id: number;
  imageUrl: string;
  category: string;
  description: string | null;
};

const galleryCategories = [
  "All Styles",
  "Haircuts",
  "Colors",
  "Men's Styles",
  "Women's Styles",
];

export default function GallerySection() {
  const [selectedCategory, setSelectedCategory] = useState("All Styles");

  const { data: galleryItems, isLoading } = useQuery<GalleryItem[]>({
    queryKey: [
      `/api/gallery${
        selectedCategory !== "All Styles" ? `?category=${selectedCategory}` : ""
      }`,
    ],
  });

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <section id="gallery" className="py-10 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold font-heading text-[#333333] mb-2">
            Our Gallery
          </h2>
          <p className="text-gray-600">Showcasing our finest work</p>
        </div>

        {/* Gallery Categories */}
        <div className="flex overflow-x-auto scroll-hidden mb-6 pb-2 no-scrollbar">
          {galleryCategories.map((category) => (
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

        {/* Gallery Images */}
        <div className="grid grid-cols-2 gap-3">
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="aspect-square overflow-hidden rounded-lg"
                >
                  <Skeleton className="w-full h-full" />
                </div>
              ))
            : galleryItems?.map((item) => (
                <div
                  key={item.id}
                  className="aspect-square overflow-hidden rounded-lg"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.description || "Hairstyle example"}
                    className="w-full h-full object-cover hover:scale-105 transition duration-300"
                  />
                </div>
              ))}
        </div>

        <div className="text-center mt-6">
          <Button
            variant="ghost"
            className="text-[#FF6B6B] font-medium flex items-center mx-auto hover:bg-transparent"
          >
            View Full Gallery
            <ChevronRightIcon className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
