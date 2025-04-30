"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState, useEffect } from "react";
import { Id } from "@/convex/_generated/dataModel";
import Navbar from "@/components/ui/Navbar";

export default function ContactsDashboard() {
    const [view, setView] = useState<"all" | "unread">("all");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Get contacts data from Convex with proper error handling
    const allContactsQuery = useQuery(api?.contacts?.getAllContacts);
    const unreadContactsQuery = useQuery(api?.contacts?.getUnreadContacts);

    // Use safe defaults
    const allContacts = allContactsQuery || [];
    const unreadContacts = unreadContactsQuery || [];

    // Use the markAsRead mutation with error handling
    const markAsRead = useMutation(api?.contacts?.markContactAsRead);

    // Choose which contacts to display based on the view state
    const contacts = view === "all" ? allContacts : unreadContacts;

    // Track loading state
    useEffect(() => {
        if (allContactsQuery === undefined) {
            setIsLoading(true);
            setError(null);
        } else {
            setIsLoading(false);
        }
    }, [allContactsQuery]);

    // Format timestamp to readable date
    const formatDate = (timestamp: number) => {
        try {
            return new Date(timestamp).toLocaleString();
        } catch (e) {
            return "Invalid date";
        }
    };

    // Handle marking a contact as read with error handling
    const handleMarkAsRead = async (id: Id<"contacts">) => {
        try {
            if (!markAsRead) {
                throw new Error("Could not connect to the database");
            }
            await markAsRead({ id });
        } catch (err) {
            console.error("Error marking contact as read:", err);
            setError(err instanceof Error ? err.message : "An error occurred");
        }
    };

    return (
        <div className="min-h-screen bg-gray-900">
            <Navbar />
            <div className="container mx-auto px-4 py-16">
                <div className="bg-black/30 rounded-xl p-8 backdrop-blur-sm border border-amber-500/10">
                    <h1 className="text-3xl font-bold text-amber-200 mb-8">Contact Form Submissions</h1>

                    {/* Show error message if any */}
                    {error && (
                        <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded-md mb-6">
                            Error: {error}
                            <button
                                onClick={() => window.location.reload()}
                                className="ml-4 underline hover:text-red-400"
                            >
                                Retry
                            </button>
                        </div>
                    )}

                    {/* View toggle */}
                    <div className="flex gap-4 mb-6">
                        <button
                            onClick={() => setView("all")}
                            className={`px-4 py-2 rounded-lg transition-all ${view === "all"
                                ? "bg-orange-500 text-white"
                                : "bg-black/50 text-gray-300 hover:bg-black/70"
                                }`}
                        >
                            All Contacts
                        </button>
                        <button
                            onClick={() => setView("unread")}
                            className={`px-4 py-2 rounded-lg transition-all ${view === "unread"
                                ? "bg-orange-500 text-white"
                                : "bg-black/50 text-gray-300 hover:bg-black/70"
                                }`}
                        >
                            Unread ({unreadContacts?.length || 0})
                        </button>
                    </div>

                    {/* Contacts table with loading state */}
                    <div className="rounded-lg overflow-hidden">
                        {isLoading ? (
                            <div className="p-6 text-gray-400 text-center">
                                Loading contacts...
                                <div className="mt-4 flex justify-center">
                                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-orange-500"></div>
                                </div>
                            </div>
                        ) : contacts?.length === 0 ? (
                            <p className="p-6 text-gray-400 text-center">No contacts found</p>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-black/50 text-amber-200">
                                        <tr>
                                            <th className="px-6 py-3">Name</th>
                                            <th className="px-6 py-3">Business</th>
                                            <th className="px-6 py-3">Email</th>
                                            <th className="px-6 py-3">Phone</th>
                                            <th className="px-6 py-3">Type</th>
                                            <th className="px-6 py-3">Date</th>
                                            <th className="px-6 py-3">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {contacts?.map((contact) => (
                                            <tr
                                                key={contact._id.toString()}
                                                className={`border-b border-gray-800 hover:bg-black/30 transition-colors ${!contact.isRead ? "bg-amber-900/20" : ""}`}
                                            >
                                                <td className="px-6 py-4 font-medium text-white">{contact.name}</td>
                                                <td className="px-6 py-4 text-gray-300">{contact.businessName}</td>
                                                <td className="px-6 py-4 text-gray-300">{contact.email}</td>
                                                <td className="px-6 py-4 text-gray-300">{contact.phone}</td>
                                                <td className="px-6 py-4">
                                                    <span className="bg-orange-900/20 text-orange-300 text-xs font-medium px-2.5 py-1 rounded">
                                                        {contact.formType}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-gray-300">{formatDate(contact.createdAt)}</td>
                                                <td className="px-6 py-4">
                                                    {!contact.isRead && (
                                                        <button
                                                            onClick={() => handleMarkAsRead(contact._id)}
                                                            className="text-xs bg-green-900/20 hover:bg-green-900/40 text-green-300 px-2 py-1 rounded mr-2"
                                                        >
                                                            Mark as Read
                                                        </button>
                                                    )}
                                                    <button
                                                        className="text-xs bg-blue-900/20 hover:bg-blue-900/40 text-blue-300 px-2 py-1 rounded"
                                                    >
                                                        View Details
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
