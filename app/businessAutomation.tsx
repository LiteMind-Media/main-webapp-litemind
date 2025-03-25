import Image from "next/image";

const BusinessAutomation = () => {
    return (
        <div id="business-automation" className="text-white my-24 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-orange-900/20 z-0 rounded-2xl"></div>
            <div className="p-4 mx-auto relative z-10 w-full pt-10 md:pt-20 px-2 mb-16">
                <div className="text-3xl pb-5 md:text-6xl px-6 text-center bg-clip-text text-transparent bg-gradient-to-b from-orange-300 to bg-amber-100 bg-opacity-50">
                    Business Auto+ <br /> Work Less, Achieve More
                </div>
                <p className="mt-4 text-lg font-normal text-center text-neutral-300 max-w-lg mx-auto px-4">
                    Our proprietary automation platform streamlines your business operations, saving you time and maximizing revenue
                </p>
            </div>

            {/* Main Content Section */}
            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col md:flex-row items-center gap-10 mb-24">
                    <div className="md:w-1/2">
                        <div className="bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 p-0.5 rounded-2xl">
                            <Image
                                src="/images/business-automation-hero.webp"
                                alt="Business Auto+ Platform"
                                width={600}
                                height={400}
                                className="rounded-2xl"
                                priority
                            />
                        </div>
                    </div>
                    <div className="md:w-1/2">
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">Transform Your Business Operations</h3>
                        <p className="text-neutral-300 mb-6">
                            Business Auto+ is LiteMind Media&apos;s proprietary automation platform designed to transform how entrepreneurs and businesses operate online. By automating repetitive tasks and streamlining workflows, we help you focus on growth and innovation.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="px-6 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white rounded-lg font-medium transition-all duration-300">
                                Get Started
                            </button>
                            <button className="px-6 py-3 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-lg font-medium transition-all duration-300">
                                Watch Demo
                            </button>
                        </div>
                    </div>
                </div>

                {/* Section Title for Features */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-white">Key Automation Features</h2>
                    <div className="h-1 w-24 bg-gradient-to-r from-orange-600 to-amber-600 mx-auto mt-4 rounded-full"></div>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
                    {/* Feature 1 */}
                    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 hover:bg-white/10 transition-all duration-300 border border-orange-500/10">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 flex items-center justify-center mb-6">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"></path>
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-orange-200 mb-3">Smart Lead Capture</h3>
                        <p className="text-gray-300">Automatically capture, qualify, and route leads to your sales pipeline without manual intervention.</p>
                    </div>

                    {/* Feature 2 */}
                    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 hover:bg-white/10 transition-all duration-300 border border-amber-500/10">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 flex items-center justify-center mb-6">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-amber-200 mb-3">Content Scheduler</h3>
                        <p className="text-gray-300">Plan, create, and automatically publish content across all your digital channels from one central hub.</p>
                    </div>

                    {/* Feature 3 */}
                    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 hover:bg-white/10 transition-all duration-300 border border-yellow-500/10">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 flex items-center justify-center mb-6">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-yellow-200 mb-3">Analytics Dashboard</h3>
                        <p className="text-gray-300">Get real-time insights and reporting on all your business metrics, with AI-powered recommendations.</p>
                    </div>

                    {/* Feature 4 */}
                    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 hover:bg-white/10 transition-all duration-300 border border-orange-500/10">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 flex items-center justify-center mb-6">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-orange-200 mb-3">Email Automation</h3>
                        <p className="text-gray-300">Trigger personalized email sequences based on customer behavior and engagement patterns.</p>
                    </div>

                    {/* Feature 5 */}
                    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 hover:bg-white/10 transition-all duration-300 border border-amber-500/10">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 flex items-center justify-center mb-6">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-amber-200 mb-3">Payment Processing</h3>
                        <p className="text-gray-300">Streamline billing, invoicing, and payment collection with automated reminders and follow-ups.</p>
                    </div>

                    {/* Feature 6 */}
                    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 hover:bg-white/10 transition-all duration-300 border border-yellow-500/10">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 flex items-center justify-center mb-6">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-yellow-200 mb-3">Workflow Automations</h3>
                        <p className="text-gray-300">Connect your tools and create custom workflows that eliminate manual processes and reduce errors.</p>
                    </div>
                </div>

                {/* Section Title for Business Impact */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-white">The Business Impact</h2>
                    <div className="h-1 w-24 bg-gradient-to-r from-orange-600 to-amber-600 mx-auto mt-4 rounded-full"></div>
                </div>

                {/* Business Impact Section */}
                <div className="mb-24">
                    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-orange-500/10">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-6">
                            <div className="text-center">
                                <div className="text-4xl md:text-5xl font-bold text-orange-400 mb-2">76%</div>
                                <p className="text-lg text-white">Reduction in operational tasks</p>
                            </div>

                            <div className="text-center">
                                <div className="text-4xl md:text-5xl font-bold text-amber-400 mb-2">3.8x</div>
                                <p className="text-lg text-white">Increase in conversion rates</p>
                            </div>

                            <div className="text-center">
                                <div className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2">58%</div>
                                <p className="text-lg text-white">More time for strategic growth</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section Title for Testimonial */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-white">Client Success Story</h2>
                    <div className="h-1 w-24 bg-gradient-to-r from-violet-600 to-fuchsia-600 mx-auto mt-4 rounded-full"></div>
                </div>

                {/* Testimonial Section */}
                <div className="mb-24">
                    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-violet-500/10">
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            <div className="md:w-1/4">
                                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-violet-400 p-1 mx-auto">
                                    <Image
                                        src="/images/testimonial-avatar.webp"
                                        alt="Client Testimonial"
                                        width={128}
                                        height={128}
                                        className="rounded-full"
                                    />
                                </div>
                            </div>

                            <div className="md:w-3/4">
                                <svg className="w-10 h-10 text-violet-500/50 mb-4" fill="currentColor" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10 8v6a4 4 0 01-4 4H4v4h4a8 8 0 008-8V8h-6zm16 0v6a4 4 0 01-4 4h-2v4h4a8 8 0 008-8V8h-6z"></path>
                                </svg>
                                <p className="text-xl text-white italic mb-6">
                                    The Business Auto+ platform transformed how we operate. We&apos;ve reduced admin time by 70% and can now focus on growing our customer base instead of managing mundane tasks. It&apos;s been a complete game-changer.
                                </p>
                                <div>
                                    <p className="font-semibold text-violet-300">Sarah Johnson</p>
                                    <p className="text-neutral-400">CEO, TechSprint Solutions</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA Section - No need for a section title here as it's the final call-to-action */}
                <div className="mt-16 mb-8 text-center">
                    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-orange-500/10">
                        <h2 className="text-2xl md:text-4xl font-bold text-white mb-6">Ready to Automate Your Business?</h2>
                        <p className="text-lg text-neutral-300 mb-8 max-w-2xl mx-auto">
                            Join thousands of businesses that have transformed their operations with LiteMind Media&apos;s Business Auto+ platform.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <button className="px-8 py-3 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white rounded-lg font-medium transition-all duration-300">
                                Get Started Now
                            </button>
                            <button className="px-8 py-3 bg-white/5 border border-orange-500/10 hover:bg-orange-900/30 text-orange-400 rounded-lg font-medium transition-all duration-300">
                                Book a Consultation
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BusinessAutomation;