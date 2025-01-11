import { z } from "zod";

// Define Zod schema for validation
export const userSettingsSchema = z.object({
  name: z.string().min(1, "Name is required").max(50, "Max 50 letters allowed"),
  username: z.string().min(4, "Min 4 letters required").max(20, "Max 20 letters allowed")
    .regex(/^[A-Za-z0-9\s]+$/, "Only letters and numbers allowed"),
  about: z.string().optional(),
  role: z.enum(["student", "seller", "admin"], {
    required_error: "Role is required",
  }),
  image: z.string().optional(),
  phone: z.any().optional(),
  account: z.any().optional(),
  ifsc: z.string().optional(),
})

// Schema validation
export const ZodUserSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  username: z.string().min(2, { message: "Username must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  phone: z.number().optional(),
  image: z.string().url(),
  role: z.enum(["student", "seller", "admin"]),
  about: z.string().optional(),
})
  .superRefine((data, ctx) => {
    function addIssue(condition: unknown, path: string, message: string) {
      if (condition)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message,
          path: [path],
        });

    }
    if (data.role === "seller") {
      addIssue(!data.phone || !data.phone || !(/^[6-9]\d{9}$/).test(data.phone + ""),
        "phone", "A valid 10-digit phone number is required for sellers")
      addIssue(data.about && data.about.length > 200,
        "about", "About should be 200 characters")
    }
  });


 
export const ZodProductScema = z.object({
  title: z.string().min(1, "Name is required").max(100, "Max 100 letters allowed"),
  description: z.string().min(1, "Description is required").max(4000, "Max 4000 letters allowed"),
  price: z.number().min(1, "Price must be greater than 0"),
  tags: z.array(z.string()).min(1, "At least one tag is required"),
  thumbnail: z.string().url(),
  fileLink: z.string().url(),
  slug: z.string(),
  createdOn: z.any().optional(),
  _id: z.any().optional(),
})

export const ZodBlogSchema = z.object({
  slug: z.string(),
  title: z.string().min(1, "Title is required").max(100, "Max 100 letters allowed"),
  status: z.enum(["private", "free", "paid"]),
  description: z.string().min(1, "Description is required").max(4000, "Max 4000 letters allowed"),
  thumbnail: z.string().url(),
  content: z.string(),
  tags: z.array(z.string()).min(1, "At least one tag is required"),
  category: z.array(z.string()).min(1, "At least one category is required"),
  products: z.array(z.string()),
  author: z.any(),
  publishedAt: z.any().optional(),
  updatedAt: z.any().optional(),
  _id: z.any().optional(),
})