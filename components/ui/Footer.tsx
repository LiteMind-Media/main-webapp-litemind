import Link from "next/link";
import Image from "next/image";

const Footer = () => {
    return (
        <footer className="border-t border-gray-800 mt-24 py-12 px-4">
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-6 md:mb-0">
                        <Link href="/" className="flex items-center">
                            <Image
                                src="/logo.svg"
                                alt="LiteMind Media Logo"
                                width={120}
                                height={40}
                                className="h-10 w-auto"
                            />
                        </Link>
                        <p className="text-gray-400 mt-2 text-sm">
                            Transforming businesses into fully automated<br />online businesses
                        </p>
                    </div>

                    <div className="flex flex-wrap justify-center md:justify-end gap-8">
                        <div>
                            <h3 className="text-white font-medium mb-3">Solutions</h3>
                            <ul className="space-y-2 text-sm">
                                <li><Link href="/#website-design" className="text-gray-400 hover:text-orange-400">Website Design</Link></li>
                                <li><Link href="/#sales-funnel" className="text-gray-400 hover:text-orange-400">Sales Funnel</Link></li>
                                <li><Link href="/#paid-ads" className="text-gray-400 hover:text-orange-400">Paid Advertising</Link></li>
                                <li><Link href="/#content-creation" className="text-gray-400 hover:text-orange-400">Content Creation</Link></li>
                                <li><Link href="/#business-automation" className="text-gray-400 hover:text-orange-400">Business Automation</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-white font-medium mb-3">Company</h3>
                            <ul className="space-y-2 text-sm">
                                <li><Link href="/pricing" className="text-gray-400 hover:text-orange-400">Pricing</Link></li>
                                <li><a href="#" className="text-gray-400 hover:text-orange-400">About Us</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-orange-400">Contact</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-orange-400">Blog</a></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-white font-medium mb-3">Legal</h3>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#" className="text-gray-400 hover:text-orange-400">Privacy Policy</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-orange-400">Terms of Service</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
                    © {new Date().getFullYear()} LiteMind Media. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
