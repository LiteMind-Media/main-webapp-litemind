import Navbar from "@/components/ui/Navbar";
import SliderOne from "@/components/ui/Slider";
import { Spotlight } from "@/components/ui/SpotlightNew";
import Link from "next/link";


export default function Home() {
  return (
    <div className="w-full h-screen md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white[0.02] relative overflow-hidden">
      <Navbar />
      <Spotlight
        gradientFirst="radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(50, 100%, 85%, .08) 0, hsla(50, 100%, 55%, .02) 50%, hsla(50, 100%, 45%, 0) 80%)"
        gradientSecond="radial-gradient(50% 50% at 50% 50%, hsla(50, 100%, 85%, .06) 0, hsla(50, 100%, 55%, .02) 80%, transparent 100%)"
        gradientThird="radial-gradient(50% 50% at 50% 50%, hsla(50, 100%, 85%, .04) 0, hsla(50, 100%, 45%, .02) 80%, transparent 100%)"
      />
      <div className="p-4 mx-auto relative z-10 w-full pt-10 md:pt-20 px-2">
        <div className="text-4xl pb-5 md:text-7xl px-6 text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to bg-neutral-400 bg-opacity-50">
          Create, Grow and <br /> Automate your Business
        </div>
        <p className="mt-4 text-lg font-normal text-center text-neutral-300 max-w-lg mx-auto px-4">
          Transforming businesses into fully automated online businesses using our Business Auto+ platform.
        </p>
        <Link href="/about" className="cursor-pointer flex items-center justify-center border rounded-full w-48 p-2 mx-auto my-6 text-white">
          Get Started! </Link>

        <div className="w-full pt-20">
          <SliderOne />0
        </div>


      </div>
    </div >
  );
}
