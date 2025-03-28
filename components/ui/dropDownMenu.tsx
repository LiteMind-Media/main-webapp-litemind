"use client"
import { motion } from "framer-motion";
import { useState } from "react";
import ContactFormModal from "./ContactFormModal";
import Link from "next/link";

interface DropDownMenuProps {
    onClose: () => void;
    currentPath?: string;
}

const DropDownMenu: React.FC<DropDownMenuProps> = ({ onClose, currentPath = '/' }) => {
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);

    const handleClick = (sectionId: string) => {
        onClose();

        // If not on home page, navigate to home with hash
        if (currentPath !== '/') {
            window.location.href = `/#${sectionId}`;
            return;
        }

        // Add slight delay to allow animation to complete
        setTimeout(() => {
            const element = document.getElementById(sectionId);
            if (element) {
                const headerOffset = 80; // Adjust based on your header height
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        }, 300);
    };

    const handleContactClick = () => {
        // Important: First set the modal to open, then close the dropdown
        setIsContactModalOpen(true);
        onClose();
    };

    return (
        <>
            <motion.div
                className="fixed inset-0 bg-black/50 z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            />

            <motion.div
                className="
                w-full
                max-h-[80vh]
                overflow-y-auto
                bg-gradient-to-b
                from-neutral-50
                to-neutral-400
                bg-opacity-50
                text-slate-300
                p-6 space-y-4
                fixed
                top-28
                left-0
                right-0
                z-50
                rounded-t-3xl"
                initial={{ opacity: 0, y: '-80%' }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: '-100%' }}
                transition={{ duration: 0.5 }}
            >
                <div className="flex flex-col space-y-10">
                    <button
                        onClick={() => handleClick('website-design')}
                        className="text-black text-2xl cursor-pointer text-left hover:text-gray-700 transition-colors"
                    >
                        Website Design
                    </button>

                    <button
                        onClick={() => handleClick('sales-funnel')}
                        className="text-black text-2xl cursor-pointer text-left hover:text-gray-700 transition-colors"
                    >
                        Sales Funnel
                    </button>

                    <button
                        onClick={() => handleClick('paid-ads')}
                        className="text-black text-2xl cursor-pointer text-left hover:text-gray-700 transition-colors"
                    >
                        Paid Ads
                    </button>

                    <button
                        onClick={() => handleClick('content-creation')}
                        className="text-black text-2xl cursor-pointer text-left hover:text-gray-700 transition-colors"
                    >
                        Content Creation
                    </button>

                    <button
                        onClick={() => handleClick('business-automation')}
                        className="text-black text-2xl cursor-pointer text-left hover:text-gray-700 transition-colors"
                    >
                        Business Automation
                    </button>

                    <Link
                        href="/pricing"
                        onClick={onClose}
                        className="text-black text-2xl cursor-pointer text-left hover:text-gray-700 transition-colors"
                    >
                        Pricing
                    </Link>

                    <button onClick={handleContactClick} className="text-black text-2xl cursor-pointer text-left hover:text-gray-700 transition-colors">
                        Contact
                    </button>
                </div>
            </motion.div>

            {/* Contact Form Modal - having it rendered here ensures it shows properly */}
            {isContactModalOpen && (
                <ContactFormModal
                    isOpen={isContactModalOpen}
                    onClose={() => setIsContactModalOpen(false)}
                    formType="contact"
                />
            )}
        </>
    );
}

export default DropDownMenu;