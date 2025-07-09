import React from "react";
import { ContactSection } from "./ContactSection";
import { FAQSection } from "./FAQSection";
import { QuickGuideSection } from "./QuickGuideSection";
import { useTheme } from "../../context/ThemeContext";

export const HelpPage = () => {
    const { colors } = useTheme();

    return (
        <div 
            style={{ 
                backgroundColor: colors.background,
                color: colors.text,
                minHeight: '100vh',
                padding: '2rem 0'
            }}
        >
            <div className="container">
                <h1 className="text-center mb-5" style={{ color: colors.primary }}>
                    <i className="fas fa-question-circle me-2"></i>
                    Ayuda
                </h1>
                <FAQSection />
                <h1 className="mt-5 text-center mb-4" style={{ color: colors.primary }}>
                    <i className="fas fa-book me-2"></i>
                    Guías Rápidas
                </h1>
                <QuickGuideSection />
                <ContactSection />
            </div>
        </div>
    );
};
