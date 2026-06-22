import { motion } from "motion/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { ScrollReveal } from "./ScrollReveal";
import { fadeUp } from "./animations";

const faqs = [
  {
    q: "Vilka telematiksystem stöds?",
    a: "Vi stöder Geotab, Samsara, Verizon Connect, Webfleet, Masternaut, Scania Fleet Management, Volvo Connect, Fleet Complete, Motive, Platform Science och Trimble Transportation, samt övriga via REST API.",
  },
  {
    q: "Hur kopplar FleetPulse ihop ekonomi och telematik?",
    a: "Genom vårt integrationslager kan du koppla samman telematikdata med ERP och affärssystem som SAP, Fortnox och Microsoft Dynamics. Det gör att vi kan matcha bränsle, löner, tullar och slitage direkt mot specifika rutter, order och fakturor.",
  },
  {
    q: "Vad är skillnaden mellan FleetPulse och en vanlig telematik-dashboard?",
    a: "Telematiksystem visar var bilen är och hur mycket bränsle som går åt. FleetPulse skapar en Transport Intelligence Graph som berättar om kunden är lönsam, varför marginalen brister och hur ni kan spara pengar.",
  },
  {
    q: "Hur fungerar AI Advisor?",
    a: "AI Advisor fungerar som en intelligent rådgivare i form av en chatt. Istället för att gräva i Excel-ark eller bygga komplicerade BI-rapporter ställer du frågor på vanlig svenska och får omedelbara besparingsåtgärder.",
  },
  {
    q: "Var lagras vår data?",
    a: "All data lagras i EU (Sverige och Tyskland) och är GDPR-kompatibel med kryptering både i vila och under transport.",
  },
];

export function FaqSection() {
  return (
    <section id="faq" className="py-32 bg-slate-50">
      <div className="max-w-3xl mx-auto px-6">
        <ScrollReveal className="text-center mb-16">
          <motion.span
            variants={fadeUp}
            className="text-sm font-semibold text-blue-600 uppercase tracking-wider"
          >
            FAQ
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="mt-4 text-4xl font-bold text-slate-900 tracking-tight"
          >
            Vanliga frågor
          </motion.h2>
        </ScrollReveal>

        <ScrollReveal variants={fadeUp}>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={faq.q}
                value={`item-${i}`}
                className="bg-white rounded-xl border border-slate-200 px-6 data-[state=open]:shadow-md transition-shadow"
              >
                <AccordionTrigger className="text-left font-semibold text-slate-900 hover:no-underline py-5">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 pb-5 leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScrollReveal>
      </div>
    </section>
  );
}
