"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ReactNode, useState, useEffect } from "react";

interface ConvexClientProviderProps {
    children: ReactNode;
}

export default function ConvexClientProvider({ children }: ConvexClientProviderProps) {
    // Create the client only on the client-side to avoid hydration issues
    const [client, setClient] = useState<ConvexReactClient | null>(null);

    useEffect(() => {
        // Get the URL from environment variable
        const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL || "http://localhost:8000";

        // Create a new client
        const newClient = new ConvexReactClient(convexUrl);

        // Set the client
        setClient(newClient);

        // Clean up the client on unmount
        return () => {
            newClient.close();
        };
    }, []);

    // Wait for the client to be created before rendering the provider
    if (!client) {
        return null;
    }

    return (
        <ConvexProvider client={client}>
            {children}
        </ConvexProvider>
    );
}
