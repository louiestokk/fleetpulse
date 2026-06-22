import { motion } from "motion/react";
import {
  TrendingUp,
  MessageSquare,
  FileText,
  Link2,
  Plug,
  Cpu,
} from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";
import { fadeUp, staggerContainer } from "./animations";

const features = [
  {
    icon: TrendingUp,
    title: "Profit Intelligence AI",
    description:
      "Räkna ut exakta marginaler per kund, rutt och order. Se dolda kostnader som bränsle, löner, väntetider, vägavgifter och tomkörning sammanställda automatiskt.",
    gradient: "from-green-500/20 to-emerald-500/5",
    iconColor: "text-green-400",
    span: "lg:col-span-2",
  },
  {
    icon: MessageSquare,
    title: "FleetPulse AI Advisor",
    description:
      "Inga komplexa dashboards eller BI-system. Chatta direkt med din flotta: \"Vilka fordon kostar mest just nu?\" eller \"Hur sparar vi 500 000 kr nästa år?\"",
    gradient: "from-blue-500/20 to-cyan-500/5",
    iconColor: "text-blue-400",
    span: "",
  },
  {
    icon: FileText,
    title: "Contract & Tender AI",
    description:
      "Undvik felaktiga priser i upphandlingar. AI analyserar historiska risker, förseningar och rutter för att föreslå det optimala priset per kilometer.",
    gradient: "from-purple-500/20 to-violet-500/5",
    iconColor: "text-purple-400",
    span: "",
  },
  {
    icon: Link2,
    title: "Transport Intelligence Graph",
    description:
      "Koppla ihop fordon, förare, rutter, kunder, order och fakturor. AI skapar en helhetsbild av verksamheten där ingen data faller mellan stolarna.",
    gradient: "from-orange-500/20 to-amber-500/5",
    iconColor: "text-orange-400",
    span: "",
  },
  {
    icon: Plug,
    title: "Öppna Integrationer",
    description:
      "Anslut Geotab, Samsara, Volvo Connect, Scania Fleet Management, Fortnox och SAP på några minuter. Transporternas Snowflake + Stripe.",
    gradient: "from-cyan-500/20 to-teal-500/5",
    iconColor: "text-cyan-400",
    span: "lg:col-span-2",
  },
  {
    icon: Cpu,
    title: "REST API & Webhooks",
    description:
      "Robust och enhetligt API-gränssnitt för att bygga egna applikationer eller exportera strukturerad transportdata till ert ERP.",
    gradient: "from-red-500/20 to-orange-500/5",
    iconColor: "text-red-400",
    span: "",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-32 bg-white relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal className="text-center max-w-3xl mx-auto mb-20">
          <motion.span
            variants={fadeUp}
            className="text-sm font-semibold text-blue-600 uppercase tracking-wider"
          >
            Funktioner
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="mt-4 text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight"
          >
            En plattform för att driva lönsamma transporter
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-6 text-lg text-slate-600">
            Byggd för transportbolag som vill samla all sin data i en gemensam sanningskälla — och låta AI styra verksamheten mot högre marginaler.
          </motion.p>
        </ScrollReveal>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={fadeUp}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className={`group relative rounded-2xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 transition-shadow duration-500 ${feature.span}`}
            >
              <div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-slate-100 group-hover:bg-white/80 flex items-center justify-center mb-6 transition-colors">
                  <feature.icon className={`w-6 h-6 ${feature.iconColor}`} />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
