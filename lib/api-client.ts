import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";
import { getConvexUrl } from "./convex";

export type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  businessName: string;
  consultationType?: string;
  message?: string;
  companySize?: string;
  budget?: string;
  timeframe?: string;
  formType: "contact" | "enterprise" | "demo";
  source: "website" | "app";
};

// Create a shared API client that can be used by both website and app
export class SharedApiClient {
  private client: ConvexHttpClient;

  constructor() {
    this.client = new ConvexHttpClient(getConvexUrl());
  }

  // Method to submit contact form data
  async submitContactForm(formData: ContactFormData): Promise<string> {
    try {
      const result = await this.client.mutation(
        api.contacts.submitContactForm,
        formData
      );
      return result;
    } catch (error) {
      console.error("Error submitting contact form:", error);
      throw error;
    }
  }

  // You can add more shared API methods here
}

// Create and export a singleton instance of the client
export const sharedApiClient = new SharedApiClient();
