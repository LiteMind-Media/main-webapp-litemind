import Image from "next/image";

const ContentCreation = () => {
    return (
        <div id="content-creation" className="text-white my-24 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-orange-900/20 z-0 rounded-2xl"></div>
            <div className="p-4 mx-auto relative z-10 w-full pt-10 md:pt-20 px-2">
                <div className="text-3xl pb-5 md:text-6xl px-6 text-center bg-clip-text text-transparent bg-gradient-to-b from-orange-300 to bg-amber-100 bg-opacity-50">
                    Content Creation <br /> That Captivates
                </div>
                <p className="mt-4 mb-12 text-lg font-normal text-center text-neutral-300 max-w-lg mx-auto px-4">
                    Engaging, strategic content that tells your brand story and drives meaningful connections
                </p>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Content Card 1 */}
                    <div className="bg-gradient-to-br from-black/40 to-orange-900/20 backdrop-blur-sm rounded-xl overflow-hidden group hover:shadow-lg hover:shadow-orange-900/20 transition-all duration-300">
                        <div className="h-48 overflow-hidden">
                            <Image
                                src="/images/content-blog.webp"
                                alt="Blog Content"
                                width={500}
                                height={300}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                priority
                            />
                        </div>
                        <div className="p-6">
                            <h3 className="text-2xl font-bold mb-3 text-orange-200">Blog & Article Writing</h3>
                            <p className="text-gray-300 mb-4">Expert-written articles that establish thought leadership and drive organic traffic through valuable, SEO-optimized content</p>
                            <div className="flex items-center space-x-3">
                                <div className="bg-orange-900/30 px-3 py-1 rounded-full text-xs text-orange-200">SEO Optimized</div>
                                <div className="bg-orange-900/30 px-3 py-1 rounded-full text-xs text-orange-200">Lead Generation</div>
                            </div>
                        </div>
                    </div>

                    {/* Content Card 2 */}
                    <div className="bg-gradient-to-br from-black/40 to-amber-900/20 backdrop-blur-sm rounded-xl overflow-hidden group hover:shadow-lg hover:shadow-amber-900/20 transition-all duration-300">
                        <div className="h-48 overflow-hidden">
                            <Image
                                src="/images/content-social.webp"
                                alt="Social Media Content"
                                width={500}
                                height={300}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                priority
                            />
                        </div>
                        <div className="p-6">
                            <h3 className="text-2xl font-bold mb-3 text-amber-200">Social Media Content</h3>
                            <p className="text-gray-300 mb-4">Engaging posts, stories, and graphics that build community and drive engagement across all social platforms</p>
                            <div className="flex items-center space-x-3">
                                <div className="bg-amber-900/30 px-3 py-1 rounded-full text-xs text-amber-200">Engagement</div>
                                <div className="bg-amber-900/30 px-3 py-1 rounded-full text-xs text-amber-200">Brand Building</div>
                            </div>
                        </div>
                    </div>

                    {/* Content Card 3 */}
                    <div className="bg-gradient-to-br from-black/40 to-yellow-900/20 backdrop-blur-sm rounded-xl overflow-hidden group hover:shadow-lg hover:shadow-yellow-900/20 transition-all duration-300">
                        <div className="h-48 overflow-hidden">
                            <Image
                                src="/images/content-video.webp"
                                alt="Video Content"
                                width={500}
                                height={300}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                priority
                            />
                        </div>
                        <div className="p-6">
                            <h3 className="text-2xl font-bold mb-3 text-yellow-200">Video Production</h3>
                            <p className="text-gray-300 mb-4">Professional video content that showcases your brand story, products, and services in a compelling visual format</p>
                            <div className="flex items-center space-x-3">
                                <div className="bg-yellow-900/30 px-3 py-1 rounded-full text-xs text-yellow-200">High Conversion</div>
                                <div className="bg-yellow-900/30 px-3 py-1 rounded-full text-xs text-yellow-200">Brand Awareness</div>
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

export default ContentCreation;