import { z } from "zod";

export const newsletterSchema = z.object({
  email: z.string().trim().min(1, "Please enter your email address.").email("Please enter a valid email address."),
});

export type NewsletterInput = z.infer<typeof newsletterSchema>;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name."),
  email: z.string().trim().min(1, "Please enter your email address.").email("Please enter a valid email address."),
  reason: z.enum([
    "Professional enquiry",
    "Collaboration",
    "Research discussion",
    "Speaking opportunity",
    "Media enquiry",
    "Feedback",
    "Other",
  ]),
  message: z.string().trim().min(20, "Please add a little more detail (at least 20 characters)."),
});

export type ContactInput = z.infer<typeof contactSchema>;
