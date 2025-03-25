import Image from "next/image";

const PaidAds = () => {
    return (
        <div id="paid-ads" className="text-white my-24 relative pb-12">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-orange-900/20 z-0 rounded-2xl"></div>
            <div className="p-4 mx-auto relative z-10 w-full pt-10 md:pt-20 px-2">
                <div className="text-3xl pb-5 md:text-6xl px-6 text-center bg-clip-text text-transparent bg-gradient-to-b from-orange-300 to bg-amber-100 bg-opacity-50">
                    Paid Advertising <br /> That Delivers Results
                </div>
                <p className="mt-4 mb-12 text-lg font-normal text-center text-neutral-300 max-w-lg mx-auto px-4">
                    Strategic, targeted paid campaigns that maximize ROI and drive qualified traffic to your business
                </p>
            </div>

            <div className="container mx-auto px-4 relative z-10 mb-16">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    {/* Left side - Cards */}
                    <div className="lg:w-1/2 space-y-6 order-2 lg:order-1">
                        {/* Google Ads */}
                        <div className="flex items-start space-x-4 bg-gradient-to-r from-black/40 to-orange-900/20 p-6 rounded-xl border border-orange-500/10 hover:border-orange-500/30 transition-all duration-300">
                            <div className="flex-shrink-0 mt-1">
                                <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center">
                                    <svg className="w-6 h-6 text-orange-400" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M22.18 10.382L12.844 2.3a1.5 1.5 0 00-1.989 0L1.82 10.382a1.5 1.5 0 00-.32 1.952l9 13.037A1.5 1.5 0 0012 26a1.5 1.5 0 001.5-1.63l9-13.036a1.5 1.5 0 00-.32-1.952z" />
                                    </svg>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-orange-300 mb-2">Search & Display Ads</h3>
                                <p className="text-gray-300">Target users actively searching for your products or services with strategic keyword targeting and compelling ad creative.</p>
                                <div className="mt-3 flex flex-wrap gap-2">
                                    <span className="text-xs bg-orange-900/20 text-orange-300 px-2 py-1 rounded-full">Google Ads</span>
                                    <span className="text-xs bg-orange-900/20 text-orange-300 px-2 py-1 rounded-full">Bing Ads</span>
                                    <span className="text-xs bg-orange-900/20 text-orange-300 px-2 py-1 rounded-full">Display Networks</span>
                                </div>
                            </div>
                        </div>

                        {/* Social Media Ads */}
                        <div className="flex items-start space-x-4 bg-gradient-to-r from-black/40 to-amber-900/20 p-6 rounded-xl border border-amber-500/10 hover:border-amber-500/30 transition-all duration-300">
                            <div className="flex-shrink-0 mt-1">
                                <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center">
                                    <svg className="w-6 h-6 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10z" />
                                    </svg>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-amber-300 mb-2">Social Media Advertising</h3>
                                <p className="text-gray-300">Reach your ideal audience with precision targeting across major social platforms, driving engagement and conversions.</p>
                                <div className="mt-3 flex flex-wrap gap-2">
                                    <span className="text-xs bg-amber-900/20 text-amber-300 px-2 py-1 rounded-full">Meta Ads</span>
                                    <span className="text-xs bg-amber-900/20 text-amber-300 px-2 py-1 rounded-full">Instagram</span>
                                    <span className="text-xs bg-amber-900/20 text-amber-300 px-2 py-1 rounded-full">LinkedIn</span>
                                </div>
                            </div>
                        </div>

                        {/* Remarketing */}
                        <div className="flex items-start space-x-4 bg-gradient-to-r from-black/40 to-yellow-900/20 p-6 rounded-xl border border-yellow-500/10 hover:border-yellow-500/30 transition-all duration-300">
                            <div className="flex-shrink-0 mt-1">
                                <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center">
                                    <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M9 12l2 2 4-4M20 12a8 8 0 11-16 0 8 8 0 0116 0z" />
                                    </svg>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-yellow-300 mb-2">Retargeting Campaigns</h3>
                                <p className="text-gray-300">Re-engage visitors who have shown interest in your business with strategic remarketing campaigns that drive conversions.</p>
                                <div className="mt-3 flex flex-wrap gap-2">
                                    <span className="text-xs bg-yellow-900/20 text-yellow-300 px-2 py-1 rounded-full">Dynamic Retargeting</span>
                                    <span className="text-xs bg-yellow-900/20 text-yellow-300 px-2 py-1 rounded-full">Cross-Platform</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right side - 3D illustration */}
                    <div className="lg:w-1/2 order-1 lg:order-2">
                        <div className="bg-gradient-to-r from-orange-500/20 to-amber-500/20 p-0.5 rounded-2xl">
                            <Image
                                src="/images/paid-ads-illustration.webp"
                                alt="Paid Advertising Services"
                                width={600}
                                height={600}
                                className="rounded-xl"
                                priority
                            />
                        </div>
                        <div className="mt-8 bg-orange-900/20 p-4 rounded-xl border border-orange-500/10">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center">
                                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                                    </svg>
                                </div>
                                <p className="font-medium text-orange-300">93% of our clients see ROI within 30 days</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center">
                                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                                    </svg>
                                </div>
                                <p className="font-medium text-amber-300">Data-driven optimization for maximum returns</p>
                            </div>
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

export default PaidAds;