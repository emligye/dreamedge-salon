import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { 
  PhoneIcon, 
  MailIcon, 
  GlobeIcon, 
  InstagramIcon, 
  FacebookIcon, 
  TwitterIcon, 
  YoutubeIcon 
} from "@/lib/icons";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

type FormValues = z.infer<typeof formSchema>;

export default function ContactSection() {
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const sendMessage = useMutation({
    mutationFn: async (data: FormValues) => {
      return apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Message Sent",
        description: "We will get back to you soon.",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Sending Failed",
        description: error instanceof Error ? error.message : "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: FormValues) => {
    sendMessage.mutate(data);
  };

  return (
    <section id="contact" className="py-10 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold font-heading text-[#333333] mb-2">
            Contact Us
          </h2>
          <p className="text-gray-600">We'd love to hear from you</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <Card className="bg-white rounded-lg p-5 shadow-sm">
            <CardContent className="p-0">
              <h3 className="font-heading font-semibold text-xl mb-4">
                Send a Message
              </h3>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="block text-sm font-medium text-[#333333]">
                          Email Address
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your email"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            type="email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="block text-sm font-medium text-[#333333]">
                          Message
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter your message"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            rows={4}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-lg transition duration-300"
                    disabled={sendMessage.isPending}
                  >
                    {sendMessage.isPending ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          <div className="flex flex-col space-y-6">
            <Card className="bg-white rounded-lg p-5 shadow-sm">
              <CardContent className="p-0">
                <h3 className="font-heading font-semibold text-xl mb-4">
                  Location Map
                </h3>
                
                <div className="w-full h-64 md:h-72 mb-4 rounded-lg overflow-hidden">
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
                
                <div className="mb-4">
                  <h4 className="font-medium text-[#333333] mb-2">Address</h4>
                  <p className="text-gray-600">
                    PCFQ+W7C, Haiderpara Main Rd,
                    <br />
                    Ward 40, Hakim Para, Siliguri, West Bengal 734001
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 w-full">
                  <Button 
                    className="flex-1 bg-primary hover:bg-primary/90 text-white" 
                    onClick={() => window.open('https://goo.gl/maps/6JxZ8G7Hq6T2zs9y6', '_blank')}
                  >
                    Get Directions
                  </Button>
                  <Button 
                    className="flex-1 border-primary text-primary hover:bg-primary/10" 
                    variant="outline"
                    asChild
                  >
                    <a href="/location">View Detailed Map</a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white rounded-lg p-5 shadow-sm">
              <CardContent className="p-0">
                <h3 className="font-heading font-semibold text-xl mb-4">
                  Hours & Contact
                </h3>

                <div className="mb-6">
                  <h4 className="font-medium text-[#333333] mb-2">
                    Opening Hours
                  </h4>
                  <ul className="text-gray-600">
                    <li className="flex justify-between mb-1">
                      <span>Monday</span>
                      <span>9:00 AM - 9:00 PM</span>
                    </li>
                    <li className="flex justify-between mb-1">
                      <span>Tuesday</span>
                      <span>Closed</span>
                    </li>
                    <li className="flex justify-between mb-1">
                      <span>Wednesday - Friday</span>
                      <span>9:00 AM - 9:00 PM</span>
                    </li>
                    <li className="flex justify-between mb-1">
                      <span>Saturday</span>
                      <span>9:00 AM - 9:00 PM</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Sunday</span>
                      <span>10:00 AM - 6:00 PM</span>
                    </li>
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="font-medium text-[#333333] mb-2">
                    Contact Info
                  </h4>
                  <p className="text-gray-600 mb-1 flex items-center">
                    <PhoneIcon className="text-primary mr-2 h-4 w-4" />
                    +91 98765 43210
                  </p>
                  <p className="text-gray-600 mb-1 flex items-center">
                    <MailIcon className="text-primary mr-2 h-4 w-4" />
                    info@dreamedge.com
                  </p>
                  <p className="text-gray-600 flex items-center">
                    <GlobeIcon className="text-primary mr-2 h-4 w-4" />
                    www.dreamedgesalon.com
                  </p>
                </div>

                <div className="mb-4">
                  <h4 className="font-medium text-[#333333] mb-2">Follow Us</h4>
                  <div className="flex space-x-4">
                    <a
                      href="#"
                      className="text-primary hover:text-[#333333] transition-colors"
                    >
                      <InstagramIcon className="h-5 w-5" />
                    </a>
                    <a
                      href="#"
                      className="text-primary hover:text-[#333333] transition-colors"
                    >
                      <FacebookIcon className="h-5 w-5" />
                    </a>
                    <a
                      href="#"
                      className="text-primary hover:text-[#333333] transition-colors"
                    >
                      <TwitterIcon className="h-5 w-5" />
                    </a>
                    <a
                      href="#"
                      className="text-primary hover:text-[#333333] transition-colors"
                    >
                      <YoutubeIcon className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
