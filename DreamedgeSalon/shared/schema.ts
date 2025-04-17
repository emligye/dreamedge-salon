import { pgTable, text, serial, integer, boolean, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users schema (keeping the original)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Services schema
export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(),
  duration: integer("duration").notNull(), // in minutes
  category: text("category").notNull(),
});

export const insertServiceSchema = createInsertSchema(services).pick({
  name: true,
  description: true,
  price: true,
  duration: true,
  category: true,
});

export type InsertService = z.infer<typeof insertServiceSchema>;
export type Service = typeof services.$inferSelect;

// Stylists schema
export const stylists = pgTable("stylists", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  title: text("title").notNull(),
  specialties: text("specialties").notNull(),
  imageUrl: text("imageUrl").notNull(),
});

export const insertStylistSchema = createInsertSchema(stylists).pick({
  name: true,
  title: true,
  specialties: true,
  imageUrl: true,
});

export type InsertStylist = z.infer<typeof insertStylistSchema>;
export type Stylist = typeof stylists.$inferSelect;

// Gallery schema
export const gallery = pgTable("gallery", {
  id: serial("id").primaryKey(),
  imageUrl: text("imageUrl").notNull(),
  category: text("category").notNull(),
  description: text("description"),
});

export const insertGallerySchema = createInsertSchema(gallery).pick({
  imageUrl: true,
  category: true,
  description: true,
});

export type InsertGallery = z.infer<typeof insertGallerySchema>;
export type Gallery = typeof gallery.$inferSelect;

// Appointments schema
export const appointments = pgTable("appointments", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  serviceId: integer("serviceId").notNull(),
  stylistId: integer("stylistId"),
  date: varchar("date", { length: 10 }).notNull(), // YYYY-MM-DD
  time: varchar("time", { length: 5 }).notNull(), // HH:MM
  notes: text("notes"),
  status: text("status").default("pending"), 
});

export const insertAppointmentSchema = createInsertSchema(appointments)
  .pick({
    name: true,
    phone: true,
    serviceId: true,
    stylistId: true,
    date: true,
    time: true,
    notes: true,
  })
  .extend({
    phone: z.string().min(10).max(15),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    time: z.string().regex(/^\d{2}:\d{2}$/),
  });

export type InsertAppointment = z.infer<typeof insertAppointmentSchema>;
export type Appointment = typeof appointments.$inferSelect;

// Contact messages schema
export const contactMessages = pgTable("contactMessages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
});

export const insertContactSchema = createInsertSchema(contactMessages)
  .pick({
    name: true,
    email: true,
    message: true,
  })
  .extend({
    email: z.string().email(),
  });

export type InsertContact = z.infer<typeof insertContactSchema>;
export type ContactMessage = typeof contactMessages.$inferSelect;
