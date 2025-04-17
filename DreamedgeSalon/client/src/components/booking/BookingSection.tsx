import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Skeleton } from "@/components/ui/skeleton";

type Service = {
  id: number;
  name: string;
  description: string;
  price: number;
  duration: number;
  category: string;
};

type Stylist = {
  id: number;
  name: string;
  title: string;
  specialties: string;
  imageUrl: string;
};

const timeSlots = [
  "09:00",
  "10:00",
  "11:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
];

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  serviceId: z.string().min(1, { message: "Please select a service" }),
  stylistId: z.string().optional(),
  date: z.string()
    .min(1, { message: "Please select a date" })
    .refine((date) => {
      // Check if the selected date is not a Tuesday (2 is Tuesday in JavaScript)
      const selectedDate = new Date(date);
      return selectedDate.getDay() !== 2; // 0 is Sunday, 1 is Monday, 2 is Tuesday, etc.
    }, { message: "We're closed on Tuesdays. Please select another day." }),
  time: z.string().min(1, { message: "Please select a time" }),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function BookingSection() {
  const { toast } = useToast();
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const { data: services, isLoading: isLoadingServices } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

  const { data: stylists, isLoading: isLoadingStylists } = useQuery<Stylist[]>({
    queryKey: ["/api/stylists"],
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      serviceId: "",
      stylistId: "",
      date: "",
      time: "",
      notes: "",
    },
  });

  const bookAppointment = useMutation({
    mutationFn: async (data: FormValues) => {
      return apiRequest("POST", "/api/appointments", {
        name: data.name,
        phone: data.phone,
        serviceId: parseInt(data.serviceId),
        stylistId: data.stylistId ? parseInt(data.stylistId) : undefined,
        date: data.date,
        time: data.time,
        notes: data.notes,
      });
    },
    onSuccess: () => {
      toast({
        title: "Appointment Booked",
        description: "We will contact you shortly to confirm your appointment.",
      });
      form.reset();
      setSelectedTime(null);
    },
    onError: (error) => {
      toast({
        title: "Booking Failed",
        description: error instanceof Error ? error.message : "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: FormValues) => {
    bookAppointment.mutate(data);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    form.setValue("time", time);
  };

  return (
    <section id="booking" className="py-10 px-4 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold font-heading text-[#333333] mb-2">
            Book an Appointment
          </h2>
          <p className="text-gray-600 mb-1">Schedule your salon visit today</p>
          <p className="text-primary text-sm font-medium">Note: We're closed on Tuesdays</p>
        </div>

        <div className="bg-[#F7F9FC] rounded-lg p-5 shadow-sm">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Service Selection */}
              <FormField
                control={form.control}
                name="serviceId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block text-sm font-medium text-[#333333]">
                      Select Service
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={isLoadingServices}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                          <SelectValue placeholder="Choose a service" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {isLoadingServices ? (
                          <div className="p-2">
                            <Skeleton className="h-5 w-full" />
                          </div>
                        ) : (
                          services?.map((service) => (
                            <SelectItem
                              key={service.id}
                              value={service.id.toString()}
                            >
                              {service.name} - ₹{service.price}
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Stylist Selection */}
              <FormField
                control={form.control}
                name="stylistId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block text-sm font-medium text-[#333333]">
                      Select Stylist (Optional)
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={isLoadingStylists}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                          <SelectValue placeholder="No preference" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="no-preference">No preference</SelectItem>
                        {isLoadingStylists ? (
                          <div className="p-2">
                            <Skeleton className="h-5 w-full" />
                          </div>
                        ) : (
                          stylists?.map((stylist) => (
                            <SelectItem
                              key={stylist.id}
                              value={stylist.id.toString()}
                            >
                              {stylist.name} - {stylist.title}
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Date Selection */}
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block text-sm font-medium text-[#333333]">
                      Select Date
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        min={format(new Date(), "yyyy-MM-dd")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Time Selection */}
              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block text-sm font-medium text-[#333333]">
                      Select Time
                    </FormLabel>
                    <div className="grid grid-cols-3 gap-2">
                      {timeSlots.map((time) => (
                        <Button
                          key={time}
                          type="button"
                          variant="outline"
                          className={`py-2 border rounded-lg text-sm transition-colors ${
                            selectedTime === time
                              ? "bg-primary text-white"
                              : "border-gray-300 hover:bg-primary hover:text-white"
                          }`}
                          onClick={() => handleTimeSelect(time)}
                        >
                          {time.substring(0, 2)}:
                          {time.substring(2, 4) || "00"} {parseInt(time) >= 12 ? "PM" : "AM"}
                        </Button>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Personal Information */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block text-sm font-medium text-[#333333]">
                      Your Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your name"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block text-sm font-medium text-[#333333]">
                      Phone Number
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your phone number"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block text-sm font-medium text-[#333333]">
                      Special Requests (Optional)
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Any special requests or notes"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-lg transition duration-300"
                disabled={bookAppointment.isPending}
              >
                {bookAppointment.isPending ? "Processing..." : "Confirm Booking"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}
