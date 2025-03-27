import Navbar from "@/components/ui/Navbar";
import SliderOne from "@/components/ui/Slider";
import { Spotlight } from "@/components/ui/SpotlightNew";
import dynamic from 'next/dynamic';

// Use dynamic imports to isolate potential problem components
const WebsiteDesign = dynamic(() => import('./websiteDesign'), { ssr: true });
const SalesFunnel = dynamic(() => import('./salesFunnel'), { ssr: true });
const PaidAds = dynamic(() => import('./paidAds'), { ssr: true });
const ContentCreation = dynamic(() => import('./contentCreation'), { ssr: true });
const Pricing = dynamic(() => import('./pricing'), { ssr: true });
const BusinessAutomation = dynamic(() => import('./businessAutomation'), { ssr: true });

export default function Home() {
  return (
    <div className="w-full min-h-screen md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white[0.02] relative overflow-x-hidden">
      <Navbar />
      <Spotlight
        gradientFirst="radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(30, 100%, 85%, .08) 0, hsla(30, 100%, 55%, .02) 50%, hsla(30, 100%, 45%, 0) 80%)"
        gradientSecond="radial-gradient(50% 50% at 50% 50%, hsla(30, 100%, 85%, .06) 0, hsla(30, 100%, 55%, .02) 80%, transparent 100%)"
        gradientThird="radial-gradient(50% 50% at 50% 50%, hsla(30, 100%, 85%, .04) 0, hsla(30, 100%, 45%, .02) 80%, transparent 100%)"
      />
      <div className="p-4 mx-auto relative z-10 w-full pt-10 md:pt-20 px-2">
        <div className="text-4xl pb-5 md:text-7xl px-6 text-center bg-clip-text text-transparent bg-gradient-to-b from-orange-300 to-amber-100 bg-opacity-50">
          Create, Grow and <br /> Automate your Business
        </div>
        <p className="mt-4 text-lg font-normal text-center text-neutral-300 max-w-lg mx-auto px-4">
          Transforming businesses into fully automated online businesses using our Business Auto+ platform.
        </p>
        <a
          href="https://app.litemindmedia.com"
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer flex items-center justify-center border border-orange-500/20 hover:border-orange-500/40 rounded-full w-48 p-2 mx-auto my-6 text-white hover:bg-orange-500/10 transition-all duration-300"
        >
          Get Started!
        </a>

        <div className="w-full pt-20">
          <SliderOne />

          {/* Add style to establish a proper stacking context */}
          <div className="relative" style={{ isolation: "isolate" }}>
            <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-[#0e0c0a] to-black/90 z-0"></div>

            {/* Ensure each section has a modest z-index */}
            <div className="relative z-[1]">
              <WebsiteDesign />
            </div>

            <div className="relative z-[1]">
              <SalesFunnel />
            </div>

            <div className="relative z-[1]">
              <PaidAds />
            </div>

            <div className="relative z-[1]">
              <ContentCreation />
            </div>

            <div className="relative z-[1]">
              <BusinessAutomation />
            </div>

            <div className="relative z-[1]">
              <Pricing />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
