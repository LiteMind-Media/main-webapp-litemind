import { ConvexClient } from "convex/browser";

// Function to get the Convex URL based on environment
export function getConvexUrl() {
  // For self-hosted Convex instance
  const selfHostedUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

  if (!selfHostedUrl) {
    console.error("Missing CONVEX_URL environment variable, using fallback");
    // Fallback to a default URL if not provided (development)
    return "http://localhost:8000";
  }

  return selfHostedUrl;
}

// Function to get the admin URL
export function getConvexAdminUrl() {
  return process.env.CONVEX_ADMIN_URL || "http://localhost:8001";
}

// Create and export a singleton ConvexClient instance
let convexClient: ConvexClient | null = null;

export function getConvexClient() {
  if (!convexClient) {
    convexClient = new ConvexClient(getConvexUrl());
  }
  return convexClient;
}
