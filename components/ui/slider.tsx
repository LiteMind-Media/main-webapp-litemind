"use client"
import React, { useState, useEffect } from "react"
import Slider from "react-slick"
import Image from "next/image"
import { useMediaQuery } from "react-responsive"

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const SliderOne = () => {
    const isMediumScreen = useMediaQuery({ minWidth: 768, maxWidth: 1024 })
    const isSmallScreen = useMediaQuery({ maxWidth: 767 })

    // Add state to handle client-side rendering
    const [mounted, setMounted] = useState(false)

    // Set mounted to true after component mounts
    useEffect(() => {
        setMounted(true)
    }, [])

    // Default settings for server-side rendering
    const slidesToShow = mounted ?
        (isMediumScreen ? 2 : isSmallScreen ? 1 : 3) :
        1; // Default to 1 for server rendering

    const settings = {
        dots: true,
        infinite: true,
        speed: 4000,
        slidesToShow,
        autoplay: true,
        autoplaySpeed: 1000,
        className: "w-full mx-auto cursor-pointer center-mode",
        arrows: false,
    }

    return (
        <div>
            {/* Only render slider when component is mounted */}
            {mounted ? (
                <Slider {...settings}>
                    <div>
                        <div className="rounded-md px-2 md:p-10">
                            <Image
                                priority
                                src="/images/slider/1.webp"
                                alt="Slider Image 1"
                                width={500}
                                height={500}
                                className="rounded-2xl"
                            />
                        </div>
                    </div>
                    <div>
                        <div className="rounded-md px-2 md:p-10">
                            <Image
                                priority
                                src="/images/slider/2.webp"
                                alt="Slider Image 2"
                                width={500}
                                height={500}
                                className="rounded-2xl"
                            />
                        </div>
                    </div>
                    <div>
                        <div className="rounded-md px-2 md:p-10">
                            <Image
                                priority
                                src="/images/slider/3.webp"
                                alt="Slider Image 3"
                                width={500}
                                height={500}
                                className="rounded-2xl"
                            />
                        </div>
                    </div>
                    <div>
                        <div className="rounded-md px-2 md:p-10">
                            <Image
                                priority
                                src="/images/slider/4.webp"
                                alt="Slider Image 4"
                                width={500}
                                height={500}
                                className="rounded-2xl"
                            />
                        </div>
                    </div>
                    <div>
                        <div className="rounded-md px-2 md:p-10">
                            <Image
                                priority
                                src="/images/slider/5.webp"
                                alt="Slider Image 5"
                                width={500}
                                height={500}
                                className="rounded-2xl"
                            />
                        </div>
                    </div>
                </Slider>
            ) : (
                // Placeholder content when not mounted (for server-side rendering)
                <div className="flex justify-center">
                    <div className="rounded-md px-2 md:p-10">
                        <Image
                            priority
                            src="/images/slider/1.webp"
                            alt="Slider Image 1"
                            width={500}
                            height={500}
                            className="rounded-2xl"
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

export default SliderOne;