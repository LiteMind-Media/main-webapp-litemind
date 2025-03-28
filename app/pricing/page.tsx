import Navbar from "@/components/ui/Navbar";
import { Spotlight } from "@/components/ui/SpotlightNew";
import PricingComponent from "@/components/pricing/PricingComponent";
import Footer from "@/components//ui/Footer";

export default function PricingPage() {
    return (
        <div className="w-full min-h-screen bg-black/[0.96] antialiased bg-grid-white[0.02] relative overflow-x-hidden">
            <Navbar />
            <Spotlight
                gradientFirst="radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(30, 100%, 85%, .08) 0, hsla(30, 100%, 55%, .02) 50%, hsla(30, 100%, 45%, 0) 80%)"
                gradientSecond="radial-gradient(50% 50% at 50% 50%, hsla(30, 100%, 85%, .06) 0, hsla(30, 100%, 55%, .02) 80%, transparent 100%)"
                gradientThird="radial-gradient(50% 50% at 50% 50%, hsla(30, 100%, 85%, .04) 0, hsla(30, 100%, 45%, .02) 80%, transparent 100%)"
            />

            <main className="p-4 mx-auto relative z-10 w-full container">
                <div className="pt-24 md:pt-32">
                    <h1 className="text-4xl md:text-7xl text-center font-bold bg-clip-text text-transparent bg-gradient-to-b from-amber-200 to-amber-50">
                        Simple, Transparent Pricing
                    </h1>
                    <p className="mt-6 text-lg text-center text-neutral-300 max-w-2xl mx-auto">
                        Choose the perfect plan for your business needs. All plans include our core features
                        with varying levels of support and customization.
                    </p>

                    <div className="mt-16">
                        <PricingComponent />
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
