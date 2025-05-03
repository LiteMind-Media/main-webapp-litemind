"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import { Id } from "@/convex/_generated/dataModel";

// Define a Contact interface that matches your Convex schema
interface Contact {
    _id: Id<"contacts">;
    _creationTime: number;
    name: string;
    email: string;
    phone?: string;
    businessName?: string;
    consultationType?: string;
    message?: string;
    companySize?: string;
    budget?: string;
    timeframe?: string;
    formType?: string;
    source?: string;
    createdAt: number;
    isRead: boolean;
}

export default function ContactsAdminPage() {
    const contacts = useQuery(api.contacts.getAll);
    const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

    return (
        <div className="min-h-screen bg-black text-white p-8">
            <div className="container mx-auto">
                <h1 className="text-3xl font-bold mb-6">Contact Form Submissions</h1>

                {contacts === undefined ? (
                    <div className="flex items-center justify-center h-64">
                        <div className="text-xl">Loading submissions...</div>
                    </div>
                ) : contacts.length === 0 ? (
                    <div className="bg-gray-800 rounded-lg p-8 text-center">
                        <p className="text-lg text-gray-400">No contact form submissions yet.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="md:col-span-1 bg-gray-900 rounded-lg p-4 h-fit">
                            <h2 className="text-xl font-bold mb-4 text-amber-300">All Submissions</h2>
                            <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
                                {contacts.map((contact) => (
                                    <div
                                        key={contact._id}
                                        className={`p-3 rounded-lg cursor-pointer transition-all ${selectedContact?._id === contact._id
                                                ? "bg-amber-900/50 border border-amber-500/50"
                                                : "bg-gray-800 hover:bg-gray-700"
                                            }`}
                                        onClick={() => setSelectedContact(contact)}
                                    >
                                        <p className="font-medium">{contact.name}</p>
                                        <p className="text-sm text-gray-400">{contact.email}</p>
                                        <p className="text-xs text-gray-500 mt-1">
                                            {new Date(contact._creationTime).toLocaleDateString()}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="md:col-span-2">
                            {selectedContact ? (
                                <div className="bg-gray-900 rounded-lg p-6">
                                    <h2 className="text-xl font-bold mb-4 text-amber-300">Contact Details</h2>
                                    <div className="space-y-4">
                                        <div>
                                            <h3 className="text-sm text-gray-400">Name</h3>
                                            <p className="text-lg">{selectedContact.name}</p>
                                        </div>
                                        <div>
                                            <h3 className="text-sm text-gray-400">Email</h3>
                                            <p className="text-lg">{selectedContact.email}</p>
                                        </div>
                                        <div>
                                            <h3 className="text-sm text-gray-400">Phone</h3>
                                            <p className="text-lg">{selectedContact.phone || "Not provided"}</p>
                                        </div>
                                        <div>
                                            <h3 className="text-sm text-gray-400">Business Name</h3>
                                            <p className="text-lg">{selectedContact.businessName || "Not provided"}</p>
                                        </div>
                                        <div>
                                            <h3 className="text-sm text-gray-400">Consultation Type</h3>
                                            <p className="text-lg">{selectedContact.consultationType || "General"}</p>
                                        </div>
                                        <div>
                                            <h3 className="text-sm text-gray-400">Message</h3>
                                            <p className="text-lg whitespace-pre-wrap">{selectedContact.message || "No message"}</p>
                                        </div>
                                        {selectedContact.companySize && (
                                            <div>
                                                <h3 className="text-sm text-gray-400">Company Size</h3>
                                                <p className="text-lg">{selectedContact.companySize}</p>
                                            </div>
                                        )}
                                        {selectedContact.budget && (
                                            <div>
                                                <h3 className="text-sm text-gray-400">Budget</h3>
                                                <p className="text-lg">{selectedContact.budget}</p>
                                            </div>
                                        )}
                                        {selectedContact.timeframe && (
                                            <div>
                                                <h3 className="text-sm text-gray-400">Timeframe</h3>
                                                <p className="text-lg">{selectedContact.timeframe}</p>
                                            </div>
                                        )}
                                        <div>
                                            <h3 className="text-sm text-gray-400">Submission Date</h3>
                                            <p className="text-lg">{new Date(selectedContact._creationTime).toLocaleString()}</p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-gray-900 rounded-lg p-8 flex items-center justify-center h-full">
                                    <p className="text-gray-400">Select a contact to view details</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
