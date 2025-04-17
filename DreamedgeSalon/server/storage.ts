import { 
  users, type User, type InsertUser,
  services, type Service, type InsertService,
  stylists, type Stylist, type InsertStylist,
  gallery, type Gallery, type InsertGallery,
  appointments, type Appointment, type InsertAppointment,
  contactMessages, type ContactMessage, type InsertContact
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Service methods
  getAllServices(): Promise<Service[]>;
  getServicesByCategory(category: string): Promise<Service[]>;
  getService(id: number): Promise<Service | undefined>;
  createService(service: InsertService): Promise<Service>;
  
  // Stylist methods
  getAllStylists(): Promise<Stylist[]>;
  getStylist(id: number): Promise<Stylist | undefined>;
  createStylist(stylist: InsertStylist): Promise<Stylist>;
  
  // Gallery methods
  getAllGalleryItems(): Promise<Gallery[]>;
  getGalleryItemsByCategory(category: string): Promise<Gallery[]>;
  createGalleryItem(galleryItem: InsertGallery): Promise<Gallery>;
  
  // Appointment methods
  createAppointment(appointment: InsertAppointment): Promise<Appointment>;
  getAppointmentsByDate(date: string): Promise<Appointment[]>;
  
  // Contact methods
  createContactMessage(message: InsertContact): Promise<ContactMessage>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private services: Map<number, Service>;
  private stylists: Map<number, Stylist>;
  private galleryItems: Map<number, Gallery>;
  private appointments: Map<number, Appointment>;
  private contactMessages: Map<number, ContactMessage>;
  
  private userCurrentId: number;
  private serviceCurrentId: number;
  private stylistCurrentId: number;
  private galleryCurrentId: number;
  private appointmentCurrentId: number;
  private contactMessageCurrentId: number;

  constructor() {
    this.users = new Map();
    this.services = new Map();
    this.stylists = new Map();
    this.galleryItems = new Map();
    this.appointments = new Map();
    this.contactMessages = new Map();
    
    this.userCurrentId = 1;
    this.serviceCurrentId = 1;
    this.stylistCurrentId = 1;
    this.galleryCurrentId = 1;
    this.appointmentCurrentId = 1;
    this.contactMessageCurrentId = 1;
    
    // Initialize with sample data
    this.initSampleData();
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Service methods
  async getAllServices(): Promise<Service[]> {
    return Array.from(this.services.values());
  }
  
  async getServicesByCategory(category: string): Promise<Service[]> {
    return Array.from(this.services.values()).filter(
      (service) => service.category === category
    );
  }
  
  async getService(id: number): Promise<Service | undefined> {
    return this.services.get(id);
  }
  
  async createService(insertService: InsertService): Promise<Service> {
    const id = this.serviceCurrentId++;
    const service: Service = { ...insertService, id };
    this.services.set(id, service);
    return service;
  }
  
  // Stylist methods
  async getAllStylists(): Promise<Stylist[]> {
    return Array.from(this.stylists.values());
  }
  
  async getStylist(id: number): Promise<Stylist | undefined> {
    return this.stylists.get(id);
  }
  
  async createStylist(insertStylist: InsertStylist): Promise<Stylist> {
    const id = this.stylistCurrentId++;
    const stylist: Stylist = { ...insertStylist, id };
    this.stylists.set(id, stylist);
    return stylist;
  }
  
  // Gallery methods
  async getAllGalleryItems(): Promise<Gallery[]> {
    return Array.from(this.galleryItems.values());
  }
  
  async getGalleryItemsByCategory(category: string): Promise<Gallery[]> {
    return Array.from(this.galleryItems.values()).filter(
      (item) => item.category === category
    );
  }
  
  async createGalleryItem(insertGalleryItem: InsertGallery): Promise<Gallery> {
    const id = this.galleryCurrentId++;
    const galleryItem: Gallery = { ...insertGalleryItem, id };
    this.galleryItems.set(id, galleryItem);
    return galleryItem;
  }
  
  // Appointment methods
  async createAppointment(insertAppointment: InsertAppointment): Promise<Appointment> {
    const id = this.appointmentCurrentId++;
    const appointment: Appointment = { ...insertAppointment, id, status: "pending" };
    this.appointments.set(id, appointment);
    return appointment;
  }
  
  async getAppointmentsByDate(date: string): Promise<Appointment[]> {
    return Array.from(this.appointments.values()).filter(
      (appointment) => appointment.date === date
    );
  }
  
  // Contact methods
  async createContactMessage(insertMessage: InsertContact): Promise<ContactMessage> {
    const id = this.contactMessageCurrentId++;
    const message: ContactMessage = { 
      ...insertMessage, 
      id, 
      createdAt: new Date() 
    };
    this.contactMessages.set(id, message);
    return message;
  }
  
  // Initialize sample data
  private initSampleData() {
    // Services
    const services: InsertService[] = [
      {
        name: "Haircut & Styling",
        description: "Professional cut with styling",
        price: 499,
        duration: 45,
        category: "Haircuts"
      },
      {
        name: "Hair Coloring",
        description: "Full head color with premium products",
        price: 1499,
        duration: 120,
        category: "Coloring"
      },
      {
        name: "Keratin Treatment",
        description: "Smoothing treatment for frizz control",
        price: 3999,
        duration: 180,
        category: "Treatments"
      },
      {
        name: "Facial & Cleanup",
        description: "Deep cleansing facial with massage",
        price: 899,
        duration: 60,
        category: "Facial"
      },
      {
        name: "Men's Haircut",
        description: "Classic or modern haircut for men",
        price: 399,
        duration: 30,
        category: "Haircuts"
      },
      {
        name: "Hair Spa",
        description: "Rejuvenating treatment for damaged hair",
        price: 1299,
        duration: 90,
        category: "Treatments"
      }
    ];
    
    services.forEach(service => {
      this.createService(service);
    });
    
    // Stylists
    const stylists: InsertStylist[] = [
      {
        name: "Anaya",
        title: "Senior Stylist",
        specialties: "Coloring,Styling",
        imageUrl: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=869&q=80"
      },
      {
        name: "Rohan",
        title: "Creative Director",
        specialties: "Cuts,Styling",
        imageUrl: "https://images.unsplash.com/photo-1534308143481-c55f00be8bd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
      },
      {
        name: "Priya",
        title: "Color Expert",
        specialties: "Coloring,Treatments",
        imageUrl: "https://images.unsplash.com/photo-1599842057874-37393e9342df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      },
      {
        name: "Vihaan",
        title: "Junior Stylist",
        specialties: "Cuts,Grooming",
        imageUrl: "https://images.unsplash.com/photo-1553521306-d67a2e3b8a04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      }
    ];
    
    stylists.forEach(stylist => {
      this.createStylist(stylist);
    });
    
    // Gallery
    const galleryItems: InsertGallery[] = [
      {
        imageUrl: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
        category: "Women's Styles",
        description: "Modern bob cut"
      },
      {
        imageUrl: "https://images.unsplash.com/photo-1594839688520-9c35098a95b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80",
        category: "Colors",
        description: "Pastel pink coloring"
      },
      {
        imageUrl: "https://images.unsplash.com/photo-1565538420870-da08ff96a207?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        category: "Men's Styles",
        description: "Classic fade"
      },
      {
        imageUrl: "https://images.unsplash.com/photo-1562322140-8baeececf3df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80",
        category: "Women's Styles",
        description: "Long layers with highlights"
      },
      {
        imageUrl: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
        category: "Colors",
        description: "Blonde balayage"
      },
      {
        imageUrl: "https://images.unsplash.com/photo-1584297091679-c78c6d163033?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
        category: "Men's Styles",
        description: "Modern textured crop"
      }
    ];
    
    galleryItems.forEach(item => {
      this.createGalleryItem(item);
    });
  }
}

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }
  
  // Service methods
  async getAllServices(): Promise<Service[]> {
    return await db.select().from(services);
  }
  
  async getServicesByCategory(category: string): Promise<Service[]> {
    return await db.select().from(services).where(eq(services.category, category));
  }
  
  async getService(id: number): Promise<Service | undefined> {
    const [service] = await db.select().from(services).where(eq(services.id, id));
    return service || undefined;
  }
  
  async createService(insertService: InsertService): Promise<Service> {
    const [service] = await db.insert(services).values(insertService).returning();
    return service;
  }
  
  // Stylist methods
  async getAllStylists(): Promise<Stylist[]> {
    return await db.select().from(stylists);
  }
  
  async getStylist(id: number): Promise<Stylist | undefined> {
    const [stylist] = await db.select().from(stylists).where(eq(stylists.id, id));
    return stylist || undefined;
  }
  
  async createStylist(insertStylist: InsertStylist): Promise<Stylist> {
    const [stylist] = await db.insert(stylists).values(insertStylist).returning();
    return stylist;
  }
  
  // Gallery methods
  async getAllGalleryItems(): Promise<Gallery[]> {
    return await db.select().from(gallery);
  }
  
  async getGalleryItemsByCategory(category: string): Promise<Gallery[]> {
    return await db.select().from(gallery).where(eq(gallery.category, category));
  }
  
  async createGalleryItem(insertGalleryItem: InsertGallery): Promise<Gallery> {
    const galleryData = {
      ...insertGalleryItem,
      description: insertGalleryItem.description || null
    };
    
    const [galleryItem] = await db.insert(gallery).values(galleryData).returning();
    return galleryItem;
  }
  
  // Appointment methods
  async createAppointment(insertAppointment: InsertAppointment): Promise<Appointment> {
    const appointmentData = {
      ...insertAppointment,
      status: "pending" as const,
      stylistId: insertAppointment.stylistId || null,
      notes: insertAppointment.notes || null
    };
    
    const [appointment] = await db.insert(appointments).values(appointmentData).returning();
    return appointment;
  }
  
  async getAppointmentsByDate(date: string): Promise<Appointment[]> {
    return await db.select().from(appointments).where(eq(appointments.date, date));
  }
  
  // Contact methods
  async createContactMessage(insertMessage: InsertContact): Promise<ContactMessage> {
    const messageData = {
      ...insertMessage,
      createdAt: new Date()
    };
    
    const [message] = await db.insert(contactMessages).values(messageData).returning();
    return message;
  }
  
  // Function to initialize sample data
  async initSampleData() {
    // Check if data exists
    const existingServices = await db.select().from(services).limit(1);
    if (existingServices.length > 0) {
      return; // Data already exists
    }

    // Services
    const serviceData: InsertService[] = [
      {
        name: "Haircut & Styling",
        description: "Professional cut with styling",
        price: 499,
        duration: 45,
        category: "Haircuts"
      },
      {
        name: "Hair Coloring",
        description: "Full head color with premium products",
        price: 1499,
        duration: 120,
        category: "Coloring"
      },
      {
        name: "Keratin Treatment",
        description: "Smoothing treatment for frizz control",
        price: 3999,
        duration: 180,
        category: "Treatments"
      },
      {
        name: "Facial & Cleanup",
        description: "Deep cleansing facial with massage",
        price: 899,
        duration: 60,
        category: "Facial"
      },
      {
        name: "Men's Haircut",
        description: "Classic or modern haircut for men",
        price: 399,
        duration: 30,
        category: "Haircuts"
      },
      {
        name: "Hair Spa",
        description: "Rejuvenating treatment for damaged hair",
        price: 1299,
        duration: 90,
        category: "Treatments"
      }
    ];

    await db.insert(services).values(serviceData);
    
    // Stylists
    const stylistData: InsertStylist[] = [
      {
        name: "Anaya",
        title: "Senior Stylist",
        specialties: "Coloring,Styling",
        imageUrl: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=869&q=80"
      },
      {
        name: "Rohan",
        title: "Creative Director",
        specialties: "Cuts,Styling",
        imageUrl: "https://images.unsplash.com/photo-1534308143481-c55f00be8bd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
      },
      {
        name: "Priya",
        title: "Color Expert",
        specialties: "Coloring,Treatments",
        imageUrl: "https://images.unsplash.com/photo-1599842057874-37393e9342df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      },
      {
        name: "Vihaan",
        title: "Junior Stylist",
        specialties: "Cuts,Grooming",
        imageUrl: "https://images.unsplash.com/photo-1553521306-d67a2e3b8a04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      }
    ];

    await db.insert(stylists).values(stylistData);
    
    // Gallery
    const galleryData: InsertGallery[] = [
      {
        imageUrl: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
        category: "Women's Styles",
        description: "Modern bob cut"
      },
      {
        imageUrl: "https://images.unsplash.com/photo-1594839688520-9c35098a95b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80",
        category: "Colors",
        description: "Pastel pink coloring"
      },
      {
        imageUrl: "https://images.unsplash.com/photo-1565538420870-da08ff96a207?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        category: "Men's Styles",
        description: "Classic fade"
      },
      {
        imageUrl: "https://images.unsplash.com/photo-1562322140-8baeececf3df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80",
        category: "Women's Styles",
        description: "Long layers with highlights"
      },
      {
        imageUrl: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
        category: "Colors",
        description: "Blonde balayage"
      },
      {
        imageUrl: "https://images.unsplash.com/photo-1584297091679-c78c6d163033?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
        category: "Men's Styles",
        description: "Modern textured crop"
      }
    ];

    await db.insert(gallery).values(galleryData);
  }
}

// Use the database storage
export const storage = new DatabaseStorage();

// Initialize the sample data when the application starts
storage.initSampleData().catch(console.error);
