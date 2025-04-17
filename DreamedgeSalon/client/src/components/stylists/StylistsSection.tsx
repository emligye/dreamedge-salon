import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

type Stylist = {
  id: number;
  name: string;
  title: string;
  specialties: string;
  imageUrl: string;
};

export default function StylistsSection() {
  const { data: stylists, isLoading } = useQuery<Stylist[]>({
    queryKey: ["/api/stylists"],
  });

  return (
    <section id="stylists" className="py-10 px-4 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold font-heading text-[#333333] mb-2">
            Meet Our Stylists
          </h2>
          <p className="text-gray-600">
            Experienced professionals ready to transform your look
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {isLoading
            ? Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="rounded-lg overflow-hidden bg-[#F7F9FC] shadow-sm"
                >
                  <div className="h-48 overflow-hidden">
                    <Skeleton className="w-full h-full" />
                  </div>
                  <div className="p-3 text-center">
                    <Skeleton className="h-4 w-16 mx-auto mb-2" />
                    <Skeleton className="h-3 w-24 mx-auto mb-2" />
                    <div className="flex justify-center">
                      <Skeleton className="h-4 w-16 rounded-full mr-1" />
                      <Skeleton className="h-4 w-16 rounded-full" />
                    </div>
                  </div>
                </div>
              ))
            : stylists?.map((stylist) => (
                <div
                  key={stylist.id}
                  className="rounded-lg overflow-hidden bg-[#F7F9FC] shadow-sm"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={stylist.imageUrl}
                      alt={stylist.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3 text-center">
                    <h3 className="font-semibold text-[#333333]">
                      {stylist.name}
                    </h3>
                    <p className="text-xs text-gray-600 mb-2">{stylist.title}</p>
                    <div className="flex justify-center flex-wrap gap-1">
                      {stylist.specialties.split(",").map((specialty) => (
                        <Badge
                          key={specialty}
                          className="text-xs bg-[#FF6B6B] bg-opacity-10 text-[#FF6B6B] px-2 py-0.5 rounded-full"
                        >
                          {specialty.trim()}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
}
