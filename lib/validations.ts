import { z } from "zod"

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
})

export const registrationSchema = loginSchema.extend({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  role: z.enum(["STUDENT", "INSTRUCTOR", "ADMIN", "PARENT"]),
})

export const courseSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  description: z.string().min(10, "Description must be at least 10 characters long"),
  price: z.number().min(0, "Price cannot be negative"),
})

