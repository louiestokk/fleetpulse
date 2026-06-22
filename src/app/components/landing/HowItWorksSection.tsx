import { motion } from "motion/react";
import { Link2, Database, Sparkles } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";
import { fadeUp, staggerContainer } from "./animations";

const steps = [
  {
    icon: Link2,
    step: "01",
    title: "Anslut system på 5 min",
    description:
      "Integrera era befintliga telematiksystem (Geotab, Samsara, Volvo Connect) och affärssystem (Fortnox, SAP) med några enkla klick.",
  },
  {
    icon: Database,
    step: "02",
    title: "Skapa en enhetlig transportgraf",
    description:
      "FleetPulse kopplar samman fordon, förare, rutter, order och kostnader till en gemensam och strukturerad sanningskälla.",
  },
  {
    icon: Sparkles,
    step: "03",
    title: "Optimera med AI Advisor",
    description:
      "AI:n analyserar din transportdata i realtid för att hitta olönsamma kunder, minimera tomkörningar och förutsäga kassaflöde.",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal className="text-center max-w-3xl mx-auto mb-20">
          <motion.span
            variants={fadeUp}
            className="text-sm font-semibold text-blue-600 uppercase tracking-wider"
          >
            Så funkar det
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="mt-4 text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight"
          >
            Från installation till insikt på tre steg
          </motion.h2>
        </ScrollReveal>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-8 relative"
        >
          <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-px bg-gradient-to-r from-blue-200 via-cyan-300 to-blue-200" />

          {steps.map((step, i) => (
            <motion.div
              key={step.step}
              variants={fadeUp}
              className="relative text-center"
            >
              <motion.div
                whileHover={{ scale: 1.08, rotate: 5 }}
                className="relative z-10 w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/25 mb-8"
              >
                <step.icon className="w-7 h-7 text-white" />
              </motion.div>
              <span className="text-xs font-mono text-blue-600 font-semibold">
                STEG {step.step}
              </span>
              <h3 className="mt-3 text-xl font-semibold text-slate-900">
                {step.title}
              </h3>
              <p className="mt-3 text-slate-600 leading-relaxed">
                {step.description}
              </p>
              {i < steps.length - 1 && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.2, duration: 0.6 }}
                  className="md:hidden mt-8 h-px bg-slate-200 origin-left"
                />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
