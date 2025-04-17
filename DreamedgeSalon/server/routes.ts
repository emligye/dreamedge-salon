import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertServiceSchema, 
  insertStylistSchema, 
  insertGallerySchema, 
  insertAppointmentSchema, 
  insertContactSchema 
} from "@shared/schema";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // API Routes
  
  // Services routes
  app.get("/api/services", async (req: Request, res: Response) => {
    try {
      const category = req.query.category as string | undefined;
      
      if (category) {
        const services = await storage.getServicesByCategory(category);
        return res.json(services);
      }
      
      const services = await storage.getAllServices();
      return res.json(services);
    } catch (error) {
      console.error("Error fetching services:", error);
      return res.status(500).json({ message: "Failed to fetch services" });
    }
  });
  
  app.get("/api/services/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid service ID" });
      }
      
      const service = await storage.getService(id);
      if (!service) {
        return res.status(404).json({ message: "Service not found" });
      }
      
      return res.json(service);
    } catch (error) {
      console.error("Error fetching service:", error);
      return res.status(500).json({ message: "Failed to fetch service" });
    }
  });
  
  // Stylists routes
  app.get("/api/stylists", async (_req: Request, res: Response) => {
    try {
      const stylists = await storage.getAllStylists();
      return res.json(stylists);
    } catch (error) {
      console.error("Error fetching stylists:", error);
      return res.status(500).json({ message: "Failed to fetch stylists" });
    }
  });
  
  app.get("/api/stylists/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid stylist ID" });
      }
      
      const stylist = await storage.getStylist(id);
      if (!stylist) {
        return res.status(404).json({ message: "Stylist not found" });
      }
      
      return res.json(stylist);
    } catch (error) {
      console.error("Error fetching stylist:", error);
      return res.status(500).json({ message: "Failed to fetch stylist" });
    }
  });
  
  // Gallery routes
  app.get("/api/gallery", async (req: Request, res: Response) => {
    try {
      const category = req.query.category as string | undefined;
      
      if (category) {
        const galleryItems = await storage.getGalleryItemsByCategory(category);
        return res.json(galleryItems);
      }
      
      const galleryItems = await storage.getAllGalleryItems();
      return res.json(galleryItems);
    } catch (error) {
      console.error("Error fetching gallery items:", error);
      return res.status(500).json({ message: "Failed to fetch gallery items" });
    }
  });
  
  // Appointments routes
  app.post("/api/appointments", async (req: Request, res: Response) => {
    try {
      const result = insertAppointmentSchema.safeParse(req.body);
      
      if (!result.success) {
        const errorMessage = fromZodError(result.error).message;
        return res.status(400).json({ message: errorMessage });
      }
      
      // Check if service exists
      const service = await storage.getService(result.data.serviceId);
      if (!service) {
        return res.status(400).json({ message: "Invalid service selected" });
      }
      
      // Check if stylist exists (if provided)
      if (result.data.stylistId) {
        const stylist = await storage.getStylist(result.data.stylistId);
        if (!stylist) {
          return res.status(400).json({ message: "Invalid stylist selected" });
        }
      }
      
      const appointment = await storage.createAppointment(result.data);
      return res.status(201).json(appointment);
    } catch (error) {
      console.error("Error creating appointment:", error);
      return res.status(500).json({ message: "Failed to create appointment" });
    }
  });
  
  // Contact routes
  app.post("/api/contact", async (req: Request, res: Response) => {
    try {
      const result = insertContactSchema.safeParse(req.body);
      
      if (!result.success) {
        const errorMessage = fromZodError(result.error).message;
        return res.status(400).json({ message: errorMessage });
      }
      
      const contactMessage = await storage.createContactMessage(result.data);
      return res.status(201).json({ 
        id: contactMessage.id,
        message: "Message sent successfully" 
      });
    } catch (error) {
      console.error("Error creating contact message:", error);
      return res.status(500).json({ message: "Failed to send message" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
