import { useState } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Check, Sparkles } from "lucide-react";
import { Button } from "../ui/button";
import { ScrollReveal } from "./ScrollReveal";
import { fadeUp } from "./animations";
import { cn } from "../ui/utils";

const plans = [
  {
    name: "Starter",
    price: { monthly: 990, yearly: 790 },
    description: "Perfekt för mindre flottor som precis börjar elektrifiera.",
    features: [
      "Upp till 10 fordon",
      "Realtids dashboard",
      "Batteri- & larmövervakning",
      "E-postsupport",
      "7 dagars historik",
    ],
    cta: "Starta gratis provperiod",
    popular: false,
  },
  {
    name: "Professional",
    price: { monthly: 2490, yearly: 1990 },
    description: "För växande transportbolag med daglig operativ styrning.",
    features: [
      "Upp till 50 fordon",
      "Allt i Starter",
      "Underhållscenter",
      "Förarinsikter & rapporter",
      "API-access",
      "Prioriterad support",
      "90 dagars historik",
    ],
    cta: "Öppna dashboard",
    popular: true,
  },
  {
    name: "Enterprise",
    price: { monthly: null, yearly: null },
    description: "Skräddarsytt för stora flottor med avancerade krav.",
    features: [
      "Obegränsat antal fordon",
      "Allt i Professional",
      "Dedikerad account manager",
      "SLA 99.99%",
      "On-premise alternativ",
      "Custom integrationer",
      "Obegränsad historik",
    ],
    cta: "Kontakta sälj",
    popular: false,
  },
];

export function PricingSection() {
  const [yearly, setYearly] = useState(true);

  return (
    <section id="pricing" className="py-32 bg-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_100%,rgba(59,130,246,0.15),transparent)]" />

      <div className="relative max-w-7xl mx-auto px-6">
        <ScrollReveal className="text-center max-w-3xl mx-auto mb-12">
          <motion.span
            variants={fadeUp}
            className="text-sm font-semibold text-cyan-400 uppercase tracking-wider"
          >
            Priser
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="mt-4 text-4xl sm:text-5xl font-bold text-white tracking-tight"
          >
            Transparent prissättning som växer med dig
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-6 text-lg text-slate-400">
            14 dagars gratis provperiod. Ingen bindningstid.
          </motion.p>
        </ScrollReveal>

        <ScrollReveal variants={fadeUp} className="flex justify-center mb-16">
          <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 rounded-full p-1.5">
            <button
              type="button"
              onClick={() => setYearly(false)}
              className={cn(
                "px-5 py-2 rounded-full text-sm font-medium transition-all duration-300",
                !yearly ? "bg-white text-slate-900" : "text-slate-400 hover:text-white"
              )}
            >
              Månadsvis
            </button>
            <button
              type="button"
              onClick={() => setYearly(true)}
              className={cn(
                "px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2",
                yearly ? "bg-white text-slate-900" : "text-slate-400 hover:text-white"
              )}
            >
              Årsvis
              <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">
                -20%
              </span>
            </button>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8 }}
              className={cn(
                "relative rounded-2xl p-8 border transition-shadow duration-500",
                plan.popular
                  ? "bg-gradient-to-b from-blue-600/20 to-slate-900/80 border-blue-500/40 shadow-2xl shadow-blue-500/20"
                  : "bg-white/5 border-white/10 hover:border-white/20"
              )}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xs font-semibold px-4 py-1.5 rounded-full shadow-lg">
                    <Sparkles className="w-3 h-3" />
                    Mest populär
                  </span>
                </div>
              )}

              <h3 className="text-xl font-semibold text-white">{plan.name}</h3>
              <p className="mt-2 text-sm text-slate-400">{plan.description}</p>

              <div className="mt-8 h-16">
                <AnimatePresence mode="wait">
                  {plan.price.monthly !== null ? (
                    <motion.div
                      key={yearly ? "yearly" : "monthly"}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="text-5xl font-bold text-white">
                        {yearly ? plan.price.yearly : plan.price.monthly}
                      </span>
                      <span className="text-slate-400 ml-1">kr/mån</span>
                    </motion.div>
                  ) : (
                    <span className="text-3xl font-bold text-white">Offert</span>
                  )}
                </AnimatePresence>
              </div>

              <ul className="mt-8 space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-slate-300">
                    <Check className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link to="/app" className="block mt-10">
                <Button
                  className={cn(
                    "w-full h-11",
                    plan.popular
                      ? "bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white border-0"
                      : "bg-white/10 hover:bg-white/20 text-white border-white/10"
                  )}
                >
                  {plan.cta}
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
