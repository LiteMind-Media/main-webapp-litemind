"use client"

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
//import { motion } from "framer-motion"
import { AlignJustify, X } from "lucide-react"
import DropDownMenu from "./dropDownMenu";
const Navbar = () => {

    const [isDropdownVisible, setIsDropDownVisible] = useState(false)

    const toggleDropDown = () => {
        setIsDropDownVisible(!isDropdownVisible)
    }

    const closeDropDown = () => {
        setIsDropDownVisible(false)
    }

    return (
        <div>
            <div className="p-6 md:p-4 flex items-center justify-between z-50">
                <div>
                    <Link className="cursor-pointer" href="/">
                        <Image
                            priority
                            src="/logo.svg"
                            height={100}
                            width={100}
                            alt="logo"
                            className="w-20 h-20 md:w-25 md:h-25" />
                    </Link>
                </div>

                <div>
                    <div className="cursor-pointer hidden md:flex items-center space-x-10 text-slate-300 text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to bg-neutral-400 bg-opacity-50">
                        <div className="hover:text-gray-50"> Website Design </div>
                        <div className="hover:text-gray-50"> Sales Funnel </div>
                        <div className="hover:text-gray-50"> Paid Ads</div>
                        <div className="hover:text-gray-50"> Content Creation </div>
                        <div className="hover:text-gray-50"> Automation </div>

                        <Link href="/pricing" className="hover:text-gray-50">
                            Pricing
                        </Link>
                    </div>
                </div>
                <div className="flex md:hidden">
                    {isDropdownVisible ? (
                        <div
                            onClick={toggleDropDown}
                            className="w-8 h-8 text-slate-300 cursor-pointer"
                        >
                            <X />
                            <DropDownMenu onClose={closeDropDown} />
                        </div>
                    ) : (
                        <AlignJustify
                            onClick={toggleDropDown}
                            className="w-8 h-8 text-slate-300 cursor-pointer"
                        />
                    )}

                </div >

                <div className="hidden md:flex">
                    <Link href="/contact" className="shadow-[inset_0_0_0_2px_#F8B846] text-white px-12 py-4 rounded-full tracking-widest uppercase font-bold bg-transparent hover:bg-[#FCC843] hover:text-black hover:shaow-[inset_0_0_0_2px_FCC843] dark:text-neutral-200 transition duration-200">
                        Contact
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Navbar;