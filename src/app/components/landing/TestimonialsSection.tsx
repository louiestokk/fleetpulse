import { motion } from "motion/react";
import { Star } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";
import { fadeUp, staggerContainer } from "./animations";

const testimonials = [
  {
    quote:
      "FleetPulse gav oss full överblick över 40 el-lastbilar på en dag. Varningarna har räddat oss från flera dyra driftstopp.",
    author: "Erik Andersson",
    role: "Flottchef, Nordic Transport AB",
    avatar: "EA",
  },
  {
    quote:
      "Underhållsmodulen är genial. Vi planerar service innan problem uppstår — och förarinsikterna har sänkt energiförbrukningen med 12%.",
    author: "Anna Svensson",
    role: "Operativ chef, GreenLogistics",
    avatar: "AS",
  },
  {
    quote:
      "Bästa UX jag sett i fleet management. Operatörerna förstod systemet direkt utan utbildning.",
    author: "Lars Johansson",
    role: "IT-ansvarig, CityFreight",
    avatar: "LJ",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal className="text-center max-w-3xl mx-auto mb-20">
          <motion.span
            variants={fadeUp}
            className="text-sm font-semibold text-blue-600 uppercase tracking-wider"
          >
            Kundcase
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="mt-4 text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight"
          >
            Betrodd av transportbolag i Norden
          </motion.h2>
        </ScrollReveal>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-8"
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.author}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              className="relative bg-slate-50 rounded-2xl p-8 border border-slate-100"
            >
              <div className="flex gap-1 mb-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-slate-700 leading-relaxed italic">&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-8 flex items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white text-sm font-semibold">
                  {t.avatar}
                </div>
                <div>
                  <div className="font-semibold text-slate-900">{t.author}</div>
                  <div className="text-sm text-slate-500">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
