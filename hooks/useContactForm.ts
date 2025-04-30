"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { FormData } from "@/components/ui/ContactFormModal";

export type SubmissionSource = "website" | "app";

export function useContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Get the mutation function from Convex
  // Use optional chaining to handle possible undefined API during initialization
  const submitForm = useMutation(api?.contacts?.submitContactForm);

  // Function to handle form submission
  const handleSubmit = async (
    formData: FormData,
    formType: "contact" | "enterprise" | "demo",
    source: SubmissionSource = "website"
  ) => {
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      // Make sure submitForm is available
      if (!submitForm) {
        throw new Error(
          "Form submission service is not available. Please try again later."
        );
      }

      // Check if any required fields are missing
      if (
        !formData.name ||
        !formData.email ||
        !formData.phone ||
        !formData.businessName
      ) {
        throw new Error("Please fill in all required fields");
      }

      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error("Please enter a valid email address");
      }

      // Submit the form data to Convex
      await submitForm({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        businessName: formData.businessName,
        consultationType: formData.consultationType || undefined,
        message: formData.message || undefined,
        companySize: formData.companySize || undefined,
        budget: formData.budget || undefined,
        timeframe: formData.timeframe || undefined,
        formType,
        source,
      });

      setSuccess(true);
      return true;
    } catch (err) {
      console.error("Form submission error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while submitting the form"
      );
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    handleSubmit,
    isSubmitting,
    error,
    success,
  };
}
