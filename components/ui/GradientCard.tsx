import React from "react";

interface GradientCardProps {
    children: React.ReactNode;
    className?: string;
}

export const GradientCard: React.FC<GradientCardProps> = ({ children, className = "" }) => {
    return (
        <div className={`relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-6 border border-slate-700/50 h-full ${className}`}>
            {children}
        </div>
    );
};
