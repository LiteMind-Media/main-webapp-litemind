"use client"

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { AlignJustify, X } from "lucide-react"
import DropDownMenu from "./dropDownMenu";
import { AnimatePresence } from "framer-motion";
import ContactFormModal from "./ContactFormModal";

const Navbar = () => {
    const [isDropdownVisible, setIsDropDownVisible] = useState(false);
    const [useHamburger, setUseHamburger] = useState(false);
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);

    // Check if navbar needs to switch to hamburger menu
    useEffect(() => {
        const checkNavSpace = () => {
            // Increase the breakpoint even more to give plenty of space
            const minRequiredWidth = 1180; // Increased from 1044 to 1180 pixels

            if (window.innerWidth < minRequiredWidth) {
                setUseHamburger(true);
            } else {
                setUseHamburger(false);
            }
        };

        // Check on initial render and when window resizes
        checkNavSpace();
        window.addEventListener('resize', checkNavSpace);

        return () => {
            window.removeEventListener('resize', checkNavSpace);
        };
    }, []);

    const toggleDropDown = () => {
        setIsDropDownVisible(!isDropdownVisible);
    }

    const closeDropDown = () => {
        setIsDropDownVisible(false);
    }

    const scrollToSection = (sectionId: string) => {
        // Close dropdown if open
        if (isDropdownVisible) setIsDropDownVisible(false);

        const section = document.getElementById(sectionId);
        if (section) {
            // Use a fixed offset for consistent behavior
            const offset = 100; // Adjust this value as needed
            const topPosition = section.getBoundingClientRect().top + window.pageYOffset - offset;

            window.scrollTo({
                top: topPosition,
                behavior: "smooth"
            });
        }
    };

    return (
        <div>
            <div className="p-6 md:p-4 flex items-center justify-between z-50">
                <div className="flex-shrink-0">
                    <Link className="cursor-pointer" href="/">
                        <Image
                            priority
                            src="/logo.svg"
                            height={100}
                            width={100}
                            alt="logo"
                            className="w-20 h-20" // Fixed size, no responsive classes
                            style={{ minWidth: '80px' }} // Ensure logo never shrinks below this size
                        />
                    </Link>
                </div>

                {/* Navigation items - only shown when there's enough space */}
                {!useHamburger ? (
                    <div className="flex items-center space-x-10 text-slate-300 text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
                        <div onClick={() => scrollToSection('website-design')} className="hover:text-gray-50 cursor-pointer whitespace-nowrap">Website Design</div>
                        <div onClick={() => scrollToSection('sales-funnel')} className="hover:text-gray-50 cursor-pointer whitespace-nowrap">Sales Funnel</div>
                        <div onClick={() => scrollToSection('paid-ads')} className="hover:text-gray-50 cursor-pointer whitespace-nowrap">Paid Ads</div>
                        <div onClick={() => scrollToSection('content-creation')} className="hover:text-gray-50 cursor-pointer whitespace-nowrap">Content Creation</div>
                        <div onClick={() => scrollToSection('business-automation')} className="hover:text-gray-50 cursor-pointer whitespace-nowrap">Automation</div>
                        <div onClick={() => scrollToSection('pricing')} className="hover:text-gray-50 cursor-pointer whitespace-nowrap">Pricing</div>
                    </div>
                ) : null}

                {/* Hamburger menu - shown when there's not enough space */}
                {useHamburger ? (
                    <div className="flex flex-shrink-0">
                        {isDropdownVisible ? (
                            <div
                                onClick={toggleDropDown}
                                className="w-8 h-8 text-slate-300 cursor-pointer"
                            >
                                <X />
                                <AnimatePresence>
                                    <DropDownMenu onClose={closeDropDown} />
                                </AnimatePresence>
                            </div>
                        ) : (
                            <AlignJustify
                                onClick={toggleDropDown}
                                className="w-8 h-8 text-slate-300 cursor-pointer"
                            />
                        )}
                    </div>
                ) : (
                    // Contact button - only shown when there's enough space
                    <div className="flex-shrink-0">
                        <button
                            onClick={() => setIsContactModalOpen(true)}
                            className="shadow-[inset_0_0_0_2px_#F8B846] text-white px-12 py-4 rounded-full tracking-widest uppercase font-bold bg-transparent hover:bg-[#FCC843] hover:text-black hover:shadow-[inset_0_0_0_2px_#FCC843] dark:text-neutral-200 transition duration-200"
                        >
                            Contact
                        </button>
                    </div>
                )}
            </div>

            {/* Contact Form Modal */}
            <AnimatePresence>
                {isContactModalOpen && (
                    <ContactFormModal
                        isOpen={isContactModalOpen}
                        onClose={() => setIsContactModalOpen(false)}
                        formType="contact"
                    />
                )}
            </AnimatePresence>
        </div>
    );
}

export default Navbar;