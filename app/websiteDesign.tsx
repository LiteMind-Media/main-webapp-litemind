import Image from "next/image";

const WebsiteDesign = () => {
    return (
        <div id="website-design" className="text-white my-24 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-orange-900/20 z-0 rounded-2xl"></div>
            <div className="p-4 mx-auto relative z-10 w-full pt-10 md:pt-20 px-2">
                <div className="text-3xl pb-5 md:text-6xl px-6 text-center bg-clip-text text-transparent bg-gradient-to-b from-orange-300 to bg-sky-100 bg-opacity-50">
                    Website Design <br /> that works!
                </div>
                <p className="mt-4 mb-8 text-lg font-normal text-center text-neutral-300 max-w-lg mx-auto px-4">
                    Creating, designing and developing websites that for fully automated online businesses
                </p>
            </div>

            {/* Container for the image grid with proper padding */}
            <div className="container mx-auto px-4 relative z-10 mb-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {/* First column */}
                    <div className="grid gap-4">
                        <div className="bg-gradient-to-b from-orange-500/20 to-transparent p-0.5 rounded-lg">
                            <Image width={500} height={500} priority className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg" alt="" />
                        </div>
                        <div className="bg-gradient-to-b from-orange-500/20 to-transparent p-0.5 rounded-lg">
                            <Image width={500} height={500} priority className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-1.jpg" alt="" />
                        </div>
                        <div className="bg-gradient-to-b from-orange-500/20 to-transparent p-0.5 rounded-lg">
                            <Image width={500} height={500} priority className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-2.jpg" alt="" />
                        </div>
                    </div>

                    {/* Second column */}
                    <div className="grid gap-4">
                        <div className="bg-gradient-to-b from-orange-500/20 to-transparent p-0.5 rounded-lg">
                            <Image width={500} height={500} priority className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg" alt="" />
                        </div>
                        <div className="bg-gradient-to-b from-orange-500/20 to-transparent p-0.5 rounded-lg">
                            <Image width={500} height={500} priority className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-4.jpg" alt="" />
                        </div>
                        <div className="bg-gradient-to-b from-orange-500/20 to-transparent p-0.5 rounded-lg">
                            <Image width={500} height={500} priority className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-5.jpg" alt="" />
                        </div>
                    </div>

                    {/* Third column */}
                    <div className="grid gap-4">
                        <div className="bg-gradient-to-b from-orange-500/20 to-transparent p-0.5 rounded-lg">
                            <Image width={500} height={500} priority className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-6.jpg" alt="" />
                        </div>
                        <div className="bg-gradient-to-b from-orange-500/20 to-transparent p-0.5 rounded-lg">
                            <Image width={500} height={500} priority className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-7.jpg" alt="" />
                        </div>
                        <div className="bg-gradient-to-b from-orange-500/20 to-transparent p-0.5 rounded-lg">
                            <Image width={500} height={500} priority className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-8.jpg" alt="" />
                        </div>
                    </div>

                    {/* Fourth column */}
                    <div className="grid gap-4">
                        <div className="bg-gradient-to-b from-orange-500/20 to-transparent p-0.5 rounded-lg">
                            <Image width={500} height={500} priority className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-9.jpg" alt="" />
                        </div>
                        <div className="bg-gradient-to-b from-orange-500/20 to-transparent p-0.5 rounded-lg">
                            <Image width={500} height={500} priority className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-10.jpg" alt="" />
                        </div>
                        <div className="bg-gradient-to-b from-orange-500/20 to-transparent p-0.5 rounded-lg">
                            <Image width={500} height={500} priority className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-11.jpg" alt="" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Short descriptive text and call to action */}
            <div className="container mx-auto px-4 relative z-10 mt-8 mb-8">
                <div className="flex flex-col md:flex-row items-center justify-center gap-6 bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-orange-500/10">
                    <div className="md:w-3/4 text-center md:text-left">
                        <h3 className="text-xl font-bold text-orange-200 mb-2">Beautiful Designs, Powerful Functionality</h3>
                        <p className="text-gray-300">Our custom websites are designed to captivate visitors and convert them into customers with intuitive navigation and strategic calls to action.</p>
                    </div>
                    <div className="md:w-1/4">
                        <a
                            href="https://portfolio.litemindmedia.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-3 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white rounded-lg font-medium transition-all duration-300 inline-block text-center w-full"
                        >
                            See Our Portfolio
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom padding and decorative element */}
            <div className="mt-8 container mx-auto px-4 relative z-10">
                <div className="h-1 w-32 bg-gradient-to-r from-orange-500 to-amber-500 mx-auto rounded-full opacity-30"></div>
            </div>
        </div>
    );
}

export default WebsiteDesign;