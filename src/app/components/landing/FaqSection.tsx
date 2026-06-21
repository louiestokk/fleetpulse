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
    q: "Fungerar FleetPulse med Volvo elfordon?",
    a: "Ja — plattformen är optimerad för Volvo FE, FL och FMX Electric med direkt telematikintegration. Andra märken stöds via API.",
  },
  {
    q: "Hur snabbt kan vi komma igång?",
    a: "De flesta kunder är live inom 15 minuter. Anslut telematik, importera fordon och börja övervaka direkt.",
  },
  {
    q: "Vad ingår i gratis provperioden?",
    a: "14 dagars full tillgång till Professional-planen — inget kreditkort krävs. Avsluta när som helst.",
  },
  {
    q: "Kan jag integrera med vårt befintliga TMS/ERP?",
    a: "Professional och Enterprise inkluderar REST API och webhooks. Enterprise erbjuder custom integrationer.",
  },
  {
    q: "Var lagras vår data?",
    a: "All data lagras i EU (Sverige/Tyskland) och är GDPR-kompatibel med kryptering i vila och under transport.",
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
