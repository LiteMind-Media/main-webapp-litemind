"use client"
import { CheckIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import ContactFormModal from "@/components/ui/ContactFormModal";

const Pricing = () => {
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);
    const [isEnterpriseModalOpen, setIsEnterpriseModalOpen] = useState(false);

    const handleEnterpriseContact = () => {
        setIsEnterpriseModalOpen(true);
    };

    return (
        <div className="text-white my-24 relative py-10" id="pricing" style={{ zIndex: 1 }}>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-amber-900/20 z-0 rounded-2xl"></div>
            <div className="p-4 mx-auto relative z-1 w-full pt-10 md:pt-20 px-2">
                <div className="text-3xl pb-5 md:text-6xl px-6 text-center bg-clip-text text-transparent bg-gradient-to-b from-amber-200 to bg-amber-50 bg-opacity-50">
                    Simple, Transparent <br /> Pricing
                </div>
                <p className="mt-4 mb-12 text-lg font-normal text-center text-neutral-300 max-w-2xl mx-auto px-4">
                    Choose the perfect plan for your business needs. All plans include our core features with varying levels of support and customization.
                </p>
            </div>

            <div className="container mx-auto px-4 relative z-1">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {/* Starter Plan */}
                    <div className="relative bg-gradient-to-b from-black/60 to-amber-950/30 rounded-2xl p-1">
                        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/20 to-transparent opacity-30 rounded-2xl"></div>
                        <div className="bg-black/80 rounded-2xl p-8 h-full flex flex-col relative z-1">
                            <h3 className="text-2xl font-bold text-amber-200 mb-2">Starter</h3>
                            <div className="flex items-baseline mb-6">
                                <span className="text-4xl font-bold text-white">$999</span>
                                <span className="text-gray-400 ml-2">/month</span>
                            </div>
                            <p className="text-gray-300 mb-6">Perfect for small businesses looking to establish their online presence.</p>

                            <div className="space-y-4 mb-8 flex-grow">
                                <div className="flex items-start">
                                    <CheckIcon className="h-5 w-5 text-amber-400 mt-0.5 mr-2 flex-shrink-0" />
                                    <span>Custom website design (5 pages)</span>
                                </div>
                                <div className="flex items-start">
                                    <CheckIcon className="h-5 w-5 text-amber-400 mt-0.5 mr-2 flex-shrink-0" />
                                    <span>Basic SEO optimization</span>
                                </div>
                                <div className="flex items-start">
                                    <CheckIcon className="h-5 w-5 text-amber-400 mt-0.5 mr-2 flex-shrink-0" />
                                    <span>Monthly content updates</span>
                                </div>
                                <div className="flex items-start">
                                    <CheckIcon className="h-5 w-5 text-amber-400 mt-0.5 mr-2 flex-shrink-0" />
                                    <span>Social media setup</span>
                                </div>
                                <div className="flex items-start">
                                    <CheckIcon className="h-5 w-5 text-amber-400 mt-0.5 mr-2 flex-shrink-0" />
                                    <span>Email support</span>
                                </div>
                            </div>

                            <a
                                href="https://app.litemindmedia.com/sign-up?plan=starter"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full py-3 px-4 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium transition-colors duration-300 text-center"
                            >
                                Get Started
                            </a>
                        </div>
                    </div>

                    {/* Growth Plan - Featured */}
                    <div className="relative bg-gradient-to-b from-amber-400/30 to-amber-600/20 rounded-2xl p-1.5 transform md:-translate-y-4 scale-105">
                        <div className="absolute inset-0 bg-gradient-to-b from-amber-400/40 to-amber-600/10 blur-sm rounded-2xl"></div>
                        <div className="absolute -top-5 left-0 right-0 mx-auto w-fit bg-amber-400 text-black px-4 py-1 rounded-full text-sm font-bold">
                            MOST POPULAR
                        </div>
                        <div className="bg-black/80 rounded-2xl p-8 h-full flex flex-col relative z-1">
                            <h3 className="text-2xl font-bold text-amber-300 mb-2">Growth</h3>
                            <div className="flex items-baseline mb-6">
                                <span className="text-4xl font-bold text-white">$2,499</span>
                                <span className="text-gray-400 ml-2">/month</span>
                            </div>
                            <p className="text-gray-300 mb-6">Ideal for businesses looking to scale their online presence and reach.</p>

                            <div className="space-y-4 mb-8 flex-grow">
                                <div className="flex items-start">
                                    <CheckIcon className="h-5 w-5 text-amber-400 mt-0.5 mr-2 flex-shrink-0" />
                                    <span>Custom website design (10 pages)</span>
                                </div>
                                <div className="flex items-start">
                                    <CheckIcon className="h-5 w-5 text-amber-400 mt-0.5 mr-2 flex-shrink-0" />
                                    <span>Advanced SEO optimization</span>
                                </div>
                                <div className="flex items-start">
                                    <CheckIcon className="h-5 w-5 text-amber-400 mt-0.5 mr-2 flex-shrink-0" />
                                    <span>Weekly content updates</span>
                                </div>
                                <div className="flex items-start">
                                    <CheckIcon className="h-5 w-5 text-amber-400 mt-0.5 mr-2 flex-shrink-0" />
                                    <span>Social media management</span>
                                </div>
                                <div className="flex items-start">
                                    <CheckIcon className="h-5 w-5 text-amber-400 mt-0.5 mr-2 flex-shrink-0" />
                                    <span>Google & Meta ads management</span>
                                </div>
                                <div className="flex items-start">
                                    <CheckIcon className="h-5 w-5 text-amber-400 mt-0.5 mr-2 flex-shrink-0" />
                                    <span>Email marketing setup</span>
                                </div>
                                <div className="flex items-start">
                                    <CheckIcon className="h-5 w-5 text-amber-400 mt-0.5 mr-2 flex-shrink-0" />
                                    <span>Priority support</span>
                                </div>
                            </div>

                            <a
                                href="https://app.litemindmedia.com/sign-up?plan=growth"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full py-3 px-4 bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-black font-semibold rounded-lg transition-colors duration-300 text-center"
                            >
                                Get Started
                            </a>
                        </div>
                    </div>

                    {/* Pro Plan */}
                    <div className="relative bg-gradient-to-b from-black/60 to-amber-950/30 rounded-2xl p-1">
                        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/20 to-transparent opacity-30 rounded-2xl"></div>
                        <div className="bg-black/80 rounded-2xl p-8 h-full flex flex-col relative z-1">
                            <h3 className="text-2xl font-bold text-amber-200 mb-2">Enterprise</h3>
                            <div className="flex items-baseline mb-6">
                                <span className="text-4xl font-bold text-white">Custom</span>
                            </div>
                            <p className="text-gray-300 mb-6">Comprehensive solution for established businesses with complex needs.</p>

                            <div className="space-y-4 mb-8 flex-grow">
                                <div className="flex items-start">
                                    <CheckIcon className="h-5 w-5 text-amber-400 mt-0.5 mr-2 flex-shrink-0" />
                                    <span>Custom website with unlimited pages</span>
                                </div>
                                <div className="flex items-start">
                                    <CheckIcon className="h-5 w-5 text-amber-400 mt-0.5 mr-2 flex-shrink-0" />
                                    <span>Enterprise-level SEO strategy</span>
                                </div>
                                <div className="flex items-start">
                                    <CheckIcon className="h-5 w-5 text-amber-400 mt-0.5 mr-2 flex-shrink-0" />
                                    <span>Dedicated content team</span>
                                </div>
                                <div className="flex items-start">
                                    <CheckIcon className="h-5 w-5 text-amber-400 mt-0.5 mr-2 flex-shrink-0" />
                                    <span>Full funnel campaign management</span>
                                </div>
                                <div className="flex items-start">
                                    <CheckIcon className="h-5 w-5 text-amber-400 mt-0.5 mr-2 flex-shrink-0" />
                                    <span>Advanced analytics & reporting</span>
                                </div>
                                <div className="flex items-start">
                                    <CheckIcon className="h-5 w-5 text-amber-400 mt-0.5 mr-2 flex-shrink-0" />
                                    <span>Dedicated account manager</span>
                                </div>
                            </div>

                            <button
                                onClick={handleEnterpriseContact}
                                className="w-full py-3 px-4 bg-transparent border border-amber-500 hover:bg-amber-900/30 text-amber-400 rounded-lg font-medium transition-colors duration-300"
                            >
                                Contact Us
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mt-16 text-center">
                    <p className="text-lg text-neutral-300 mb-6">Need a custom solution? Let&apos;s talk about your specific requirements.</p>
                    <button
                        onClick={() => setIsContactModalOpen(true)}
                        className="px-8 py-3 bg-white/10 hover:bg-white/20 transition-colors duration-300 rounded-lg text-white font-medium border border-white/20"
                    >
                        Schedule a Consultation
                    </button>
                </div>
            </div>

            {/* Regular Contact Form Modal */}
            {isContactModalOpen && (
                <div className="relative z-[9999]">
                    <ContactFormModal
                        isOpen={isContactModalOpen}
                        onClose={() => setIsContactModalOpen(false)}
                        formType="contact"
                    />
                </div>
            )}

            {/* Enterprise Plan Modal */}
            {isEnterpriseModalOpen && (
                <div className="relative z-[9999]">
                    <ContactFormModal
                        isOpen={isEnterpriseModalOpen}
                        onClose={() => setIsEnterpriseModalOpen(false)}
                        formType="enterprise"
                    />
                </div>
            )}
        </div>
    );
}

export default Pricing;