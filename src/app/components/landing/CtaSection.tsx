import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { ScrollReveal } from "./ScrollReveal";
import { fadeUp, scaleIn } from "./animations";

export function CtaSection() {
  return (
    <section className="py-32 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <ScrollReveal variants={scaleIn}>
          <motion.div
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.4 }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 p-12 sm:p-20 text-center"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.3),transparent_60%)]" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />

            <div className="relative">
              <motion.h2
                variants={fadeUp}
                className="text-4xl sm:text-5xl font-bold text-white tracking-tight"
              >
                Redo att maximera era transportmarginaler?
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="mt-6 text-lg text-slate-400 max-w-2xl mx-auto"
              >
                Koppla samman era system på några minuter och låt FleetPulse AI Advisor identifiera olönsamma rutter, kunder och dolda kostnader direkt.
              </motion.p>
              <motion.div variants={fadeUp} className="mt-10">
                <Link to="/app">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-block"
                  >
                    <Button
                      size="lg"
                      className="h-14 px-10 text-base bg-white text-slate-900 hover:bg-slate-100 shadow-2xl"
                    >
                      Öppna dashboard nu
                      <ArrowRight className="w-5 h-5 ml-1" />
                    </Button>
                  </motion.div>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
}
