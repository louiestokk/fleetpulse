import { motion } from "motion/react";
import { ScrollReveal } from "./ScrollReveal";
import { fadeUp } from "./animations";

const stats = [
  { value: "500+", label: "Elfordon övervakade" },
  { value: "99.9%", label: "Plattformens uptime" },
  { value: "34%", label: "Färre oväntade stopp" },
  { value: "<2 min", label: "Genomsnittlig responstid" },
];

export function StatsSection() {
  return (
    <section className="py-20 bg-slate-950 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15 },
            },
          }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats.map((stat) => (
            <ScrollReveal key={stat.label} variants={fadeUp} className="text-center">
              <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="mt-2 text-sm text-slate-400">{stat.label}</div>
            </ScrollReveal>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
