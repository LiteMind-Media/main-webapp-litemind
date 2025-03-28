"use client"

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { AlignJustify, X } from "lucide-react"
import DropDownMenu from "./dropDownMenu";
import { AnimatePresence } from "framer-motion";
import ContactFormModal from "./ContactFormModal";
import { scrollToSection } from "@/utils/scrollUtils";
import { usePathname } from "next/navigation";

const Navbar = () => {
    const pathname = usePathname();
    const [isDropdownVisible, setIsDropDownVisible] = useState(false);
    const [useHamburger, setUseHamburger] = useState(false);
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);

    // Set mounted state after component mounts to prevent hydration issues
    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Check if navbar needs to switch to hamburger menu
    useEffect(() => {
        if (!isMounted) return;

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
    }, [isMounted]);

    // Handle scroll behavior
    useEffect(() => {
        if (!isMounted) return;

        const handleScroll = () => {
            const currentScrollPos = window.scrollY;

            // Determine if scrolling up or down
            const isScrollingDown = currentScrollPos > prevScrollPos;

            // Only hide when scrolling down and past a certain point (e.g., 100px)
            setVisible(!isScrollingDown || currentScrollPos < 100);

            setPrevScrollPos(currentScrollPos);
        };

        // Add scroll event listener
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            // Clean up event listener
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isMounted, prevScrollPos]);

    const toggleDropDown = () => {
        setIsDropDownVisible(!isDropdownVisible);
    }

    const closeDropDown = () => {
        setIsDropDownVisible(false);
    }

    const handleScrollToSection = (sectionId: string) => {
        // Close dropdown if open
        if (isDropdownVisible) setIsDropDownVisible(false);

        // If not on home page, navigate to home page first
        if (pathname !== '/') {
            window.location.href = `/#${sectionId}`;
            return;
        }

        // Use the imported utility function
        scrollToSection(sectionId);
    };

    // Calculate the height of navbar to use for layout adjustments
    const navbarHeight = 100; // Increased from 80px to 100px for more spacing

    return (
        <>
            <header
                className={`fixed top-0 w-full z-50 backdrop-blur-sm bg-transparent transition-transform duration-300 ${visible ? 'translate-y-0' : '-translate-y-full'
                    }`}
                style={{ height: `${navbarHeight}px` }} // Explicitly set height
            >
                <div className="p-8 md:py-6 flex items-center justify-between h-full">
                    <div className="flex-shrink-0 z-20">
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
                    {isMounted && !useHamburger ? (
                        <nav className="flex items-center space-x-10 relative z-20">
                            {/* Main site sections - using handleScrollToSection for home page sections */}
                            <button
                                onClick={() => handleScrollToSection('website-design')}
                                className="text-slate-300 hover:text-white cursor-pointer whitespace-nowrap transition-colors"
                            >
                                Website Design
                            </button>
                            <button
                                onClick={() => handleScrollToSection('sales-funnel')}
                                className="text-slate-300 hover:text-white cursor-pointer whitespace-nowrap transition-colors"
                            >
                                Sales Funnel
                            </button>
                            <button
                                onClick={() => handleScrollToSection('paid-ads')}
                                className="text-slate-300 hover:text-white cursor-pointer whitespace-nowrap transition-colors"
                            >
                                Paid Ads
                            </button>
                            <button
                                onClick={() => handleScrollToSection('content-creation')}
                                className="text-slate-300 hover:text-white cursor-pointer whitespace-nowrap transition-colors"
                            >
                                Content Creation
                            </button>
                            <button
                                onClick={() => handleScrollToSection('business-automation')}
                                className="text-slate-300 hover:text-white cursor-pointer whitespace-nowrap transition-colors"
                            >
                                Automation
                            </button>

                            {/* Pricing now links to separate page */}
                            <Link
                                href="/pricing"
                                className="text-slate-300 hover:text-white cursor-pointer whitespace-nowrap transition-colors"
                            >
                                Pricing
                            </Link>
                        </nav>
                    ) : null}

                    {/* Hamburger menu button - shown when there's not enough space */}
                    {isMounted && useHamburger ? (
                        <div className="flex flex-shrink-0 z-20">
                            {isDropdownVisible ? (
                                <button
                                    onClick={toggleDropDown}
                                    className="w-8 h-8 text-slate-300 cursor-pointer flex items-center justify-center"
                                    aria-label="Close menu"
                                >
                                    <X size={24} />
                                </button>
                            ) : (
                                <button
                                    onClick={toggleDropDown}
                                    className="w-8 h-8 text-slate-300 cursor-pointer flex items-center justify-center"
                                    aria-label="Open menu"
                                >
                                    <AlignJustify size={24} />
                                </button>
                            )}
                        </div>
                    ) : (
                        // Contact button - only shown when there's enough space
                        isMounted && (
                            <div className="flex-shrink-0 z-20">
                                <button
                                    onClick={() => setIsContactModalOpen(true)}
                                    className="shadow-[inset_0_0_0_2px_#F8B846] text-white px-12 py-4 rounded-full tracking-widest uppercase font-bold bg-transparent hover:bg-[#FCC843] hover:text-black hover:shadow-[inset_0_0_0_2px_#FCC843] dark:text-neutral-200 transition duration-200"
                                >
                                    Contact
                                </button>
                            </div>
                        )
                    )}
                </div>
            </header>

            {/* Add spacer div to push content below navbar with increased height */}
            <div style={{ height: `${navbarHeight + 20}px` }} aria-hidden="true"></div>

            {/* Mobile dropdown menu */}
            <AnimatePresence>
                {isDropdownVisible && <DropDownMenu onClose={closeDropDown} currentPath={pathname} />}
            </AnimatePresence>

            {/* Contact Form Modal - rendered directly in the body */}
            {isContactModalOpen && (
                <ContactFormModal
                    isOpen={isContactModalOpen}
                    onClose={() => setIsContactModalOpen(false)}
                    formType="contact"
                />
            )}
        </>
    );
};

export default Navbar;