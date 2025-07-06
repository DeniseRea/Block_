import { ContactSection } from "./ContactSection";
import { FAQSection } from "./FAQSection";
import {QuickGuideSection} from "./QuickGuideSection";

export const HelpPage = () => {
    return (
        <div>
            <h1>Ayuda</h1>
            <FAQSection />
            <h1 className="mt-5">Guías Rápidas</h1>
            <QuickGuideSection />
            <ContactSection/>
        </div>
    );
};
