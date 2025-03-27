"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

// Define a proper type for the user information
interface DemoUserInfo {
    name: string;
    email: string;
    phone: string;
    businessName: string;
    consultationType?: string;
    message?: string;
}

export default function DemoPage() {
    const [userInfo, setUserInfo] = useState<DemoUserInfo | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Check if we have the user info from the form
        const storedUserInfo = localStorage.getItem('demoUserInfo');

        if (storedUserInfo) {
            setUserInfo(JSON.parse(storedUserInfo));
        } else {
            // If no user info is found, redirect back to the main page
            router.push('/#business-automation');
        }

        setLoading(false);
    }, [router]);

    // If still loading or no user info, show loading state
    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
            </div>
        );
    }

    // If no user info after loading, this will not be seen due to the redirect
    if (!userInfo) {
        return (
            <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
                <p>Access denied. Please fill out the form to watch the demo.</p>
                <Link
                    href="/#business-automation"
                    className="mt-4 px-6 py-2 bg-orange-500 rounded-lg text-white hover:bg-orange-600"
                >
                    Go Back
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white">
            <div className="container mx-auto px-4 py-12">
                <Link
                    href="/"
                    className="inline-flex items-center text-orange-400 hover:text-orange-300 mb-8"
                >
                    <ArrowLeft size={20} className="mr-2" />
                    Back to Home
                </Link>

                <div className="bg-gradient-to-b from-gray-900 to-black border border-orange-500/20 rounded-2xl p-6 mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-orange-300 to-amber-200">
                        Business Auto+ Demo Video
                    </h1>
                    <p className="text-gray-300 mb-4">
                        Thanks for your interest, {userInfo.name}! Here&apos;s an exclusive look at our platform.
                    </p>

                    <div className="aspect-video w-full bg-black rounded-lg overflow-hidden">
                        {/* Replace with your actual video */}
                        <iframe
                            width="100%"
                            height="100%"
                            src="https://www.youtube.com/embed/your-actual-demo-video-id"
                            title="Business Auto+ Demo"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="rounded-lg"
                        ></iframe>
                    </div>
                </div>

                <div className="bg-gradient-to-b from-gray-900 to-black border border-orange-500/10 rounded-2xl p-6">
                    <h2 className="text-2xl font-bold mb-4 text-orange-300">
                        Ready to Get Started?
                    </h2>

                    <p className="text-gray-300 mb-6">
                        Now that you&apos;ve seen what Business Auto+ can do, take the next step to transform your business operations.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <a
                            href="https://app.litemindmedia.com/sign-up?source=demo"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-8 py-3 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white rounded-lg font-medium transition-all duration-300 text-center"
                        >
                            Sign Up Now
                        </a>

                        <Link
                            href="/#pricing"
                            className="px-8 py-3 bg-white/5 border border-orange-500/10 hover:bg-orange-900/30 text-orange-400 rounded-lg font-medium transition-all duration-300 text-center"
                        >
                            View Pricing
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
