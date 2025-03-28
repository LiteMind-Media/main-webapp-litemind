"use client"
import { useState } from "react";
import { CheckIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import ContactFormModal from "@/components/ui/ContactFormModal";

// Currency conversion rate (1 USD to TTD)
const TTD_CONVERSION_RATE = 6.8;

// Currency formatting function
const formatCurrency = (amount: string | number, currency: 'USD' | 'TTD'): string => {
    // If amount is "0", simply return "Free"
    if (amount === "0" || amount === 0) return "Free";

    // Handle string numbers with commas
    let numericAmount: number;
    if (typeof amount === 'string') {
        numericAmount = parseFloat(amount.replace(/,/g, ''));
    } else {
        numericAmount = amount;
    }

    // Apply conversion if TTD
    if (currency === 'TTD') {
        numericAmount = Math.round(numericAmount * TTD_CONVERSION_RATE);
    }

    // Format with thousands separator
    return numericAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const PricingComponent = () => {
    const [isAnnual, setIsAnnual] = useState(false);
    const [currency, setCurrency] = useState<'USD' | 'TTD'>('USD');
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);
    const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);

    // First row plans (3 columns) - reordered as requested
    const topRowPlans = [
        {
            name: "Free Forever",
            price: "0",
            description: "Basic features for individuals and small projects",
            features: [
                "1 project",
                "Basic website",
                "Standard support",
                "Limited content creation",
                "Basic analytics"
            ],
            highlighted: false,
            buttonText: "Get Started",
            buttonLink: "https://app.litemindmedia.com/sign-up?plan=free",
            priceLabel: "Free forever",
            badge: null
        },
        {
            name: "Pro", // Pro moved to middle position
            price: isAnnual ? "1,490" : "149",
            description: "Advanced features for established businesses",
            features: [
                "10 projects",
                "Advanced website & SEO",
                "Priority phone support",
                "Weekly content calendar",
                "Full social management",
                "Advanced funnel creation",
                "Email marketing campaigns",
                "Basic paid ads management"
            ],
            highlighted: true, // Changed back to true to enable highlighting
            buttonText: "Get Started",
            buttonLink: "https://app.litemindmedia.com/sign-up?plan=pro",
            priceLabel: isAnnual ? "/year" : "/month",
            badge: "MOST POPULAR"
        },
        {
            name: "Advanced", // Advanced moved to last position
            price: isAnnual ? "670" : "67",
            description: "Everything you need for a growing business",
            features: [
                "5 projects",
                "Professional website & SEO",
                "Priority email support",
                "Weekly content updates",
                "Social media management",
                "Basic funnel creation"
            ],
            highlighted: false,
            buttonText: "Get Started",
            buttonLink: "https://app.litemindmedia.com/sign-up?plan=advanced",
            priceLabel: isAnnual ? "/year" : "/month",
            badge: null
        }
    ];

    // Second row plans (2 columns)
    const bottomRowPlans = [
        {
            name: "Premium",
            price: isAnnual ? "6,970" : "697",
            description: "Complete solution for serious growth",
            features: [
                "Unlimited projects",
                "Custom website development",
                "Dedicated account manager",
                "Daily content calendar",
                "Full social management",
                "Advanced funnel creation",
                "Complete email automation",
                "Full paid ads management",
                "Detailed analytics & reporting"
            ],
            highlighted: false,
            buttonText: "Get Started",
            buttonLink: "https://app.litemindmedia.com/sign-up?plan=premium",
            priceLabel: isAnnual ? "/year" : "/month",
            badge: "PREMIUM"
        },
        {
            name: "Custom",
            // Now the custom price changes based on billing frequency
            price: isAnnual ? "Custom" : "8,000+",
            description: "Enterprise-grade solution tailored to your needs",
            features: [
                "Everything in Premium",
                "White-label solutions",
                "API access",
                "Custom integrations",
                "Enterprise SLA",
                "Dedicated development team"
            ],
            highlighted: false,
            buttonText: "Contact Us",
            buttonOnClick: () => setIsCustomModalOpen(true),
            // Adjust the price label based on billing frequency
            priceLabel: isAnnual ? "Annual quote" : "/month + fees",
            badge: "ENTERPRISE"
        }
    ];

    // Helper function to render plan cards
    interface Plan {
        name: string;
        price: string;
        description: string;
        features: string[];
        highlighted: boolean;
        buttonText: string;
        buttonLink?: string;
        buttonOnClick?: () => void;
        priceLabel: string;
        badge: string | null;
    }

    const renderPlanCard = (plan: Plan, index: number) => {
        return (
            <div key={index} className="relative h-full flex mt-6">
                {plan.badge && (
                    <div
                        className="absolute -top-4 left-0 right-0 mx-auto w-fit bg-amber-400 text-black px-3 py-1 rounded-full text-sm font-bold"
                        style={{
                            zIndex: 50,
                            position: 'absolute',
                            pointerEvents: 'none' // Ensures the badge doesn't interfere with clicks
                        }}
                    >
                        {plan.badge}
                    </div>
                )}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`flex flex-col w-full rounded-2xl overflow-hidden ${plan.highlighted
                        ? 'lg:scale-105 z-10 bg-gradient-to-b from-amber-400/20 to-amber-600/10 p-0.5'
                        : 'bg-gradient-to-b from-black/70 to-amber-950/20 p-0.5'
                        }`}
                >
                    <div className="bg-black/90 rounded-2xl p-6 flex flex-col h-full">
                        <div className={`mb-8 ${plan.badge ? 'pt-4' : ''}`}>
                            <h3 className="text-xl font-bold text-amber-200">{plan.name}</h3>
                            <div className="flex items-baseline mt-2">
                                {plan.price === "0" || plan.price === "Free" ? (
                                    <span className="text-3xl font-bold text-white">Free</span>
                                ) : plan.price === "Custom" ? (
                                    <span className="text-3xl font-bold text-white">Custom</span>
                                ) : (
                                    <>
                                        <span className="text-lg text-white">{currency === 'USD' ? '$' : 'TT$'}</span>
                                        <span className="text-4xl font-bold text-white">
                                            {formatCurrency(plan.price, currency)}
                                        </span>
                                    </>
                                )}
                                <span className="ml-1 text-gray-400">{plan.priceLabel}</span>
                            </div>
                            <p className="mt-3 text-gray-300 text-sm">{plan.description}</p>
                        </div>

                        <div className="space-y-3 mb-8 flex-grow">
                            {plan.features.map((feature, i) => (
                                <div key={i} className="flex items-start">
                                    <CheckIcon className="h-5 w-5 text-amber-400 mt-0.5 mr-3 flex-shrink-0" />
                                    <span className="text-sm text-white">{feature}</span>
                                </div>
                            ))}
                        </div>

                        {plan.buttonLink ? (
                            <a
                                href={plan.buttonLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-300 text-center ${plan.highlighted
                                    ? 'bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-black'
                                    : plan.name === "Free Forever"
                                        ? 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                                        : 'bg-amber-600 hover:bg-amber-700 text-white'
                                    }`}
                            >
                                {plan.buttonText}
                            </a>
                        ) : (
                            <button
                                onClick={plan.buttonOnClick}
                                className="w-full py-3 px-4 bg-transparent border border-amber-500 hover:bg-amber-900/30 text-amber-400 rounded-lg font-medium transition-colors duration-300"
                            >
                                {plan.buttonText}
                            </button>
                        )}
                    </div>
                </motion.div>
            </div>
        );
    };

    return (
        <div className="text-white relative py-10">
            {/* Toggles section with cleaner layout */}
            <div className="flex flex-col justify-center items-center mb-20">
                {/* Currency toggle - smaller and positioned above */}
                <div className="bg-black/20 p-0.5 rounded-full border border-amber-500/10 flex items-center mb-4">
                    <button
                        onClick={() => setCurrency('USD')}
                        className={`px-3 py-1 text-sm rounded-full transition-all ${currency === 'USD' ? 'bg-amber-500 text-black font-semibold' : 'text-white hover:bg-white/10'
                            }`}
                    >
                        USD ($)
                    </button>
                    <button
                        onClick={() => setCurrency('TTD')}
                        className={`px-3 py-1 text-sm rounded-full transition-all ${currency === 'TTD' ? 'bg-amber-500 text-black font-semibold' : 'text-white hover:bg-white/10'
                            }`}
                    >
                        TTD (TT$)
                    </button>
                </div>

                {/* Billing frequency toggle - larger and positioned below */}
                <div className="bg-black/30 p-1 rounded-lg border border-amber-500/20 flex items-center">
                    <button
                        onClick={() => setIsAnnual(false)}
                        className={`px-6 py-2 rounded-md transition-all ${!isAnnual ? 'bg-amber-500 text-black font-semibold' : 'text-white hover:bg-white/10'
                            }`}
                    >
                        Monthly
                    </button>
                    <button
                        onClick={() => setIsAnnual(true)}
                        className={`px-6 py-2 rounded-md transition-all ${isAnnual ? 'bg-amber-500 text-black font-semibold' : 'text-white hover:bg-white/10'
                            }`}
                    >
                        Annual (Save 16%)
                    </button>
                </div>
            </div>

            {/* Top row - 3 columns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-12">
                {topRowPlans.map((plan, index) => renderPlanCard(plan, index))}
            </div>

            {/* Divider with text */}
            <div className="relative flex items-center max-w-7xl mx-auto my-16">
                <div className="flex-grow border-t border-amber-500/20"></div>
                <span className="flex-shrink mx-4 text-amber-400 font-medium">Premium Solutions</span>
                <div className="flex-grow border-t border-amber-500/20"></div>
            </div>

            {/* Bottom row - 2 columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {bottomRowPlans.map((plan, index) => renderPlanCard(plan, index + topRowPlans.length))}
            </div>

            {/* Additional CTA */}
            <div className="mt-20 text-center">
                <p className="text-lg text-neutral-300 mb-6">Have questions about the right plan for you?</p>
                <motion.button
                    onClick={() => setIsContactModalOpen(true)}
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.2)" }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-3 bg-white/10 hover:bg-white/20 transition-all duration-300 rounded-lg text-white font-medium border border-white/20"
                >
                    Schedule a Free Consultation
                </motion.button>
            </div>

            {/* FAQ Section */}
            <div className="mt-32">
                <h2 className="text-3xl font-bold text-center mb-12 text-white">Frequently Asked Questions</h2>

                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {[
                        {
                            q: "Can I switch plans later?",
                            a: "Yes, you can upgrade or downgrade your plan at any time. Changes will be prorated based on your billing cycle."
                        },
                        {
                            q: "What payment methods do you accept?",
                            a: "We accept all major credit cards, PayPal, and bank transfers for annual plans."
                        },
                        {
                            q: "Is there a setup fee?",
                            a: "No, there are no setup fees for our standard plans. Custom enterprise solutions may have onboarding fees depending on complexity."
                        },
                        {
                            q: "Can I cancel anytime?",
                            a: "Yes, you can cancel your subscription at any time. Monthly plans can be canceled before the next billing cycle, and annual plans can be canceled with prorated refunds."
                        },
                        {
                            q: "What's included in the free plan?",
                            a: "Our free plan includes basic features to get you started, including a simple website, limited content creation, and standard email support."
                        },
                        {
                            q: "How do custom plans work?",
                            a: "Custom plans are tailored to your specific business needs. We'll work with you to understand your requirements and create a package that delivers the results you need."
                        }
                    ].map((faq, i) => (
                        <div key={i} className="bg-black/50 border border-amber-500/10 rounded-xl p-6">
                            <h3 className="text-lg font-bold text-amber-200 mb-2">{faq.q}</h3>
                            <p className="text-gray-300">{faq.a}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Contact Form Modal */}
            {isContactModalOpen && (
                <ContactFormModal
                    isOpen={isContactModalOpen}
                    onClose={() => setIsContactModalOpen(false)}
                    formType="contact"
                    customTitle="Get Pricing Help"
                    customDescription="Tell us about your business needs and we'll recommend the best plan for you"
                />
            )}

            {/* Custom Plan Modal */}
            {isCustomModalOpen && (
                <ContactFormModal
                    isOpen={isCustomModalOpen}
                    onClose={() => setIsCustomModalOpen(false)}
                    formType="enterprise"
                    customTitle="Custom Enterprise Solution"
                    customDescription="Tell us about your enterprise needs and our team will create a tailored solution"
                />
            )}
        </div>
    );
};

export default PricingComponent;
