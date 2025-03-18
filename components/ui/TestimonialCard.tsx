import React from "react";

interface TestimonialCardProps {
    quote: string;
    name: string;
    title: string;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, name, title }) => {
    return (
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6 h-full">
            <svg className="w-8 h-8 text-blue-400 mb-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <p className="text-slate-200 mb-6">{quote}</p>
            <div>
                <p className="font-semibold text-white">{name}</p>
                <p className="text-slate-400 text-sm">{title}</p>
            </div>
        </div>
    );
};
