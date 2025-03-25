import Image from "next/image";

const SalesFunnel = () => {
    return (
        <div className="text-white my-24 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-orange-900/20 z-0 rounded-2xl"></div>
            <div className="p-4 mx-auto relative z-10 w-full pt-10 md:pt-20 px-2">
                <div className="text-3xl pb-5 md:text-6xl px-6 text-center bg-clip-text text-transparent bg-gradient-to-b from-orange-300 to bg-amber-100 bg-opacity-50">
                    Sales Funnel <br /> That Converts
                </div>
                <p className="mt-4 text-lg font-normal text-center text-neutral-300 max-w-lg mx-auto px-4">
                    Optimize your customer journey with our data-driven sales funnel strategies designed to maximize conversions
                </p>
            </div>

            <div className="container mx-auto px-4 py-12 relative z-10">
                <div className="flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-6">
                    <div className="w-full md:w-1/2">
                        <Image
                            src="/images/funnel-illustration.webp"
                            alt="Sales Funnel Illustration"
                            width={600}
                            height={500}
                            className="rounded-lg mx-auto"
                            priority
                        />
                    </div>

                    <div className="w-full md:w-1/2 space-y-6">
                        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 hover:bg-white/10 transition-all duration-300 border border-orange-500/10">
                            <h3 className="text-xl font-semibold mb-2 text-orange-200">Awareness Stage</h3>
                            <p className="text-gray-300">Attract potential customers through targeted content, social media, and SEO strategies</p>
                        </div>

                        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 hover:bg-white/10 transition-all duration-300 border border-orange-500/10">
                            <h3 className="text-xl font-semibold mb-2 text-amber-200">Consideration Stage</h3>
                            <p className="text-gray-300">Nurture prospects with valuable information, case studies, and comparison tools</p>
                        </div>

                        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 hover:bg-white/10 transition-all duration-300 border border-orange-500/10">
                            <h3 className="text-xl font-semibold mb-2 text-yellow-200">Decision Stage</h3>
                            <p className="text-gray-300">Convert leads with compelling offers, testimonials, and seamless checkout experiences</p>
                        </div>

                        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 hover:bg-white/10 transition-all duration-300 border border-orange-500/10">
                            <h3 className="text-xl font-semibold mb-2 text-amber-100">Retention Stage</h3>
                            <p className="text-gray-300">Build loyalty through excellent customer service, ongoing value, and engagement</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom padding and decorative element */}
            <div className="mt-12 container mx-auto px-4 relative z-10">
                <div className="h-1 w-32 bg-gradient-to-r from-orange-500 to-amber-500 mx-auto rounded-full opacity-30"></div>
            </div>
        </div>
    );
}

export default SalesFunnel;