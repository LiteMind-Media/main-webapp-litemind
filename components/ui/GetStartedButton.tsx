"use client"

import { useState } from 'react';
import ContactFormModal from './ContactFormModal';
import { motion } from 'framer-motion';

const GetStartedButton = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleGetStarted = () => {
        setIsModalOpen(true);
    };

    return (
        <>
            <div className="mt-8 flex justify-center items-center">
                <motion.button
                    onClick={handleGetStarted}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-lg font-medium transition-all duration-300"
                >
                    Get Started
                </motion.button>
            </div>

            {/* Contact Form Modal */}
            {isModalOpen && (
                <ContactFormModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    formType="contact"
                    customTitle="Get Started with LiteMind Media"
                    customDescription="Tell us about your business needs, and we'll help you get started with the right solution"
                    submitButtonText="Submit Request"
                />
            )}
        </>
    );
};

export default GetStartedButton;