"use client"

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { createPortal } from "react-dom";

// Define and export the FormData interface so it can be imported elsewhere
export interface FormData {
    name: string;
    email: string;
    phone: string;
    businessName: string;
    consultationType: string;
    message: string;
    companySize: string;
    budget: string;
    timeframe: string;
}

interface ContactFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    consultationType?: string;
    customTitle?: string;
    customDescription?: string;
    submitButtonText?: string;
    onSubmitSuccess?: (formData: FormData) => void;
    formType?: 'contact' | 'enterprise' | 'demo';  // Add a form type prop
}

const ContactFormModal: React.FC<ContactFormModalProps> = ({
    isOpen,
    onClose,
    consultationType = "",
    customTitle,
    customDescription,
    submitButtonText,
    onSubmitSuccess,
    formType = 'contact'  // Default to contact form
}) => {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        phone: "",
        businessName: "",
        consultationType: consultationType,
        message: "",
        companySize: formType === 'enterprise' ? "10-50" : "",
        budget: formType === 'enterprise' ? "5000-10000" : "",
        timeframe: formType === 'enterprise' ? "1-3 months" : "",
    });

    const [mounted, setMounted] = useState(false);

    // Set mounted only after component has been mounted on the client
    useEffect(() => {
        setMounted(true);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // If we have a custom submit handler (for demo requests), use it
        if (onSubmitSuccess) {
            onSubmitSuccess(formData);
        } else {
            // Regular form submission logic
            console.log("Form submitted:", formData);

            // Different success messages based on form type
            if (formType === 'enterprise') {
                alert("Thank you for your enterprise inquiry! Our team will review your needs and get back to you within 24 hours.");
            } else {
                alert("Thank you for your submission! We will contact you shortly.");
            }
        }

        // Close the modal after submission
        onClose();
    };

    if (!isOpen || !mounted) return null;

    // Set the correct title and button text based on form type
    const title = customTitle ||
        (formType === 'enterprise' ? "Enterprise Plan Inquiry" :
            formType === 'demo' ? "Watch Our Demo" :
                "Let's Connect");

    const description = customDescription ||
        (formType === 'enterprise' ? "Tell us about your enterprise needs and requirements" :
            formType === 'demo' ? "Enter your information to access our exclusive demo video" :
                "Fill out the form below to schedule a consultation or inquire about our services");

    const buttonText = submitButtonText ||
        (formType === 'enterprise' ? "Submit Enterprise Inquiry" :
            formType === 'demo' ? "Access Demo Video" :
                "Schedule Consultation");

    // Use createPortal to render the modal at the document level
    return createPortal(
        <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto z-[9999]"
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="bg-gradient-to-b from-gray-900 to-black border border-orange-500/20 rounded-2xl max-w-lg w-full p-6 relative overflow-y-auto max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-gray-400 hover:text-white"
                >
                    <X size={24} />
                </button>

                <div className="mb-6">
                    <h2 className="text-3xl font-bold mb-2 text-center bg-clip-text text-transparent bg-gradient-to-r from-orange-300 to-amber-200">
                        {title}
                    </h2>
                    <p className="text-center text-gray-300">
                        {description}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Common fields for all form types */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                            Full Name <span className="text-orange-400">*</span>
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 bg-black/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white"
                            placeholder="Your name"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                            Email <span className="text-orange-400">*</span>
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 bg-black/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white"
                            placeholder="your.email@example.com"
                        />
                    </div>

                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
                            Phone Number <span className="text-orange-400">*</span>
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 bg-black/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white"
                            placeholder="(123) 456-7890"
                        />
                    </div>

                    <div>
                        <label htmlFor="businessName" className="block text-sm font-medium text-gray-300 mb-1">
                            Business Name <span className="text-orange-400">*</span>
                        </label>
                        <input
                            type="text"
                            id="businessName"
                            name="businessName"
                            value={formData.businessName}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 bg-black/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white"
                            placeholder="Your business name"
                        />
                    </div>

                    {/* Enterprise-specific fields */}
                    {formType === 'enterprise' && (
                        <>
                            <div>
                                <label htmlFor="companySize" className="block text-sm font-medium text-gray-300 mb-1">
                                    Company Size <span className="text-orange-400">*</span>
                                </label>
                                <select
                                    id="companySize"
                                    name="companySize"
                                    value={formData.companySize}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 bg-black/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white"
                                >
                                    <option value="">Select company size</option>
                                    <option value="1-9">1-9 employees</option>
                                    <option value="10-50">10-50 employees</option>
                                    <option value="51-200">51-200 employees</option>
                                    <option value="201-1000">201-1000 employees</option>
                                    <option value="1000+">1000+ employees</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="budget" className="block text-sm font-medium text-gray-300 mb-1">
                                    Monthly Budget <span className="text-orange-400">*</span>
                                </label>
                                <select
                                    id="budget"
                                    name="budget"
                                    value={formData.budget}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 bg-black/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white"
                                >
                                    <option value="">Select budget range</option>
                                    <option value="5000-10000">$5,000 - $10,000</option>
                                    <option value="10001-25000">$10,001 - $25,000</option>
                                    <option value="25001-50000">$25,001 - $50,000</option>
                                    <option value="50000+">$50,000+</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="timeframe" className="block text-sm font-medium text-gray-300 mb-1">
                                    Desired Timeframe <span className="text-orange-400">*</span>
                                </label>
                                <select
                                    id="timeframe"
                                    name="timeframe"
                                    value={formData.timeframe}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 bg-black/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white"
                                >
                                    <option value="">Select timeframe</option>
                                    <option value="immediate">Immediate</option>
                                    <option value="1-3 months">1-3 months</option>
                                    <option value="3-6 months">3-6 months</option>
                                    <option value="6+ months">6+ months</option>
                                </select>
                            </div>
                        </>
                    )}

                    {/* Service type selection for contact form */}
                    {formType === 'contact' && (
                        <div>
                            <label htmlFor="consultationType" className="block text-sm font-medium text-gray-300 mb-1">
                                What can we help you with? <span className="text-orange-400">*</span>
                            </label>
                            <select
                                id="consultationType"
                                name="consultationType"
                                value={formData.consultationType}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 bg-black/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white"
                            >
                                <option value="" disabled>Select a service</option>
                                <option value="website-design">Website Design</option>
                                <option value="sales-funnel">Sales Funnel</option>
                                <option value="paid-ads">Paid Advertising</option>
                                <option value="content-creation">Content Creation</option>
                                <option value="business-automation">Business Automation</option>
                                <option value="general">General Inquiry</option>
                            </select>
                        </div>
                    )}

                    {/* Message field for contact and enterprise forms */}
                    {formType !== 'demo' && (
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                                {formType === 'enterprise' ? 'Tell us about your enterprise needs' : 'Additional Information'}
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows={3}
                                className="w-full px-4 py-2 bg-black/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white resize-none"
                                placeholder={formType === 'enterprise'
                                    ? "Please share your specific requirements, challenges, or goals for your enterprise solution"
                                    : "Tell us more about your project or questions"}
                            ></textarea>
                        </div>
                    )}

                    <div className="pt-4">
                        <button
                            type="submit"
                            className="w-full py-3 px-4 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-lg font-medium transition-all duration-300"
                        >
                            {buttonText}
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>,
        document.body
    );
};

export default ContactFormModal;
