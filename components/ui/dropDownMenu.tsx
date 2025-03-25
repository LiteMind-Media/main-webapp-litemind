import { motion } from "framer-motion";
import Link from "next/link";

interface DropDownMenuProps {
    onClose: () => void;
}

const DropDownMenu: React.FC<DropDownMenuProps> = ({ onClose }) => {
    const handleClick = (sectionId: string) => {
        onClose();

        // Add slight delay to allow animation to complete
        setTimeout(() => {
            const element = document.getElementById(sectionId);
            if (element) {
                const headerOffset = 80; // Adjust based on your header height
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        }, 300);
    };

    return (
        <motion.div className="
        w-screen
        h-screen
        bg-gradient-to-b
        from-neutral-50
        to-neutral-400
        bg-opacity-50
        text-slate-300
        p-6 space-y-4
        absolute
        top-28
        left-0
        right-0
        z-50
        rounded-t-3xl"
            initial={{ opacity: 0, y: '-80%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.5 }}
        >
            <div className="flex flex-col space-y-10">
                <a onClick={() => handleClick('website-design')} className="text-black text-2xl cursor-pointer">
                    Website Design
                </a>

                <a onClick={() => handleClick('sales-funnel')} className="text-black text-2xl cursor-pointer">
                    Sales Funnel
                </a>

                <a onClick={() => handleClick('paid-ads')} className="text-black text-2xl cursor-pointer">
                    Paid Ads
                </a>

                <a onClick={() => handleClick('content-creation')} className="text-black text-2xl cursor-pointer">
                    Content Creation
                </a>

                <a onClick={() => handleClick('business-automation')} className="text-black text-2xl cursor-pointer">
                    Business Automation
                </a>

                <a onClick={() => handleClick('pricing')} className="text-black text-2xl cursor-pointer">
                    Pricing
                </a>
            </div>
        </motion.div>
    );
}

export default DropDownMenu;