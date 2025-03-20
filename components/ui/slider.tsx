import Slider from "react-slick"
import Image from "next/image"
import { useMediaQuery } from "react-responsive"

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { div } from "framer-motion/client"

const SliderOne = () => {
    const isMediumScreen = useMediaQuery({ minWidth: 768, maxWidth: 1024 })
    const isSmallScreen = useMediaQuery({ maxWidth: 767 })

    const settings = {
        dots: true,
        infinite: true,
        speed: 4000,
        slidesToShow: isMediumScreen ? 1.67 : isSmallScreen ? 1 : 3,
        autoplay: true,
        autoplaySpeed: 1000,
        className: "w-full mx-auto cursor-pointer center-mode",
        arrows: false,
    }
    return (
        <div>
            <Slider {...settings} >
                <>
                    <div className="rounded-md px-2 md:p-10 ">
                        <Image
                            priority
                            src="/images/slider/1.png"
                            alt="Slider Image 1"
                            width={500}
                            height={500}
                            className="rounded-2xl"
                        />
                    </div>
                    <div className="rounded-md px-2 md:p-10 ">
                        <Image
                            priority
                            src="/images/slider/2.png"
                            alt="Slider Image 2"
                            width={500}
                            height={500}
                            className="rounded-2xl"
                        />
                    </div>
                    <div className="rounded-md px-2 md:p-10 ">
                        <Image
                            priority
                            src="/images/slider/3.png"
                            alt="Slider Image 3"
                            width={500}
                            height={500}
                            className="rounded-2xl"
                        />
                    </div>
                </>
            </Slider>

        </div>)
}

export default SliderOne;