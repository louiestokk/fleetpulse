import { motion } from "motion/react";
import {
  Battery,
  Wrench,
  Users,
  Bell,
  BarChart3,
  MapPin,
} from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";
import { fadeUp, staggerContainer } from "./animations";

const features = [
  {
    icon: Battery,
    title: "Realtids batteriövervakning",
    description:
      "Se laddningsnivå, räckvidd och temperatur för varje fordon — med färgkodade varningar innan batteriet tar slut.",
    gradient: "from-green-500/20 to-emerald-500/5",
    iconColor: "text-green-400",
    span: "lg:col-span-2",
  },
  {
    icon: Bell,
    title: "Smart larmhantering",
    description:
      "Prioriterade varningar som hjärnan tolkar 60 000× snabbare än text. Kritiska händelser först.",
    gradient: "from-red-500/20 to-orange-500/5",
    iconColor: "text-red-400",
    span: "",
  },
  {
    icon: Wrench,
    title: "Underhållscenter",
    description:
      "Planera service, följ upp reparationer och undvik oväntade driftstopp med prediktiv schemaläggning.",
    gradient: "from-orange-500/20 to-amber-500/5",
    iconColor: "text-orange-400",
    span: "",
  },
  {
    icon: Users,
    title: "Förarinsikter",
    description:
      "Effektivitet, säkerhetspoäng och körbeteende — coacha teamet mot bättre resultat och lägre energiförbrukning.",
    gradient: "from-purple-500/20 to-violet-500/5",
    iconColor: "text-purple-400",
    span: "",
  },
  {
    icon: BarChart3,
    title: "Analys & rapporter",
    description:
      "Energiförbrukning, effektivitetstrender och KPI:er i realtid. Exportera till ditt BI-verktyg.",
    gradient: "from-blue-500/20 to-cyan-500/5",
    iconColor: "text-blue-400",
    span: "lg:col-span-2",
  },
  {
    icon: MapPin,
    title: "Live positionering",
    description:
      "GPS-position och hastighet per fordon. Se var flottan befinner sig just nu.",
    gradient: "from-cyan-500/20 to-teal-500/5",
    iconColor: "text-cyan-400",
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
            Allt du behöver för att styra en modern elflotta
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-6 text-lg text-slate-600">
            Byggd för operatörer som behöver svara snabbt — med UX som minskar
            kognitiv belastning vid hög arbetsbelastning.
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
