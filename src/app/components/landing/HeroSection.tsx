import { Link } from "react-router";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "motion/react";
import {
  ArrowRight,
  Zap,
  Shield,
  Play,
  Link2,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

function FloatingOrb({
  className,
  delay = 0,
}: {
  className: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -30, 0],
        x: [0, 15, 0],
        scale: [1, 1.08, 1],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    />
  );
}

function DashboardPreview() {
  const integrations = [
    { name: "Samsara Telematics", sync: 98, color: "bg-green-500" },
    { name: "Fortnox ERP", sync: 85, color: "bg-blue-500" },
    { name: "Volvo Connect", sync: 92, color: "bg-green-500" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, rotateX: 8 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="relative perspective-[1200px]"
    >
      <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-purple-500/20 rounded-3xl blur-2xl" />
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="relative bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl shadow-blue-500/20"
      >
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-slate-950/50">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <span className="text-xs text-slate-500 ml-2">FleetPulse AI Advisor</span>
          <div className="ml-auto flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-green-400">Live data</span>
          </div>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Anslutna system", value: "8 st", icon: Link2 },
              { label: "AI Advisor status", value: "Aktiv", icon: Sparkles },
              { label: "Est. besparing", value: "527k kr", icon: TrendingUp },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + i * 0.15 }}
                className="bg-white/5 rounded-xl p-3 border border-white/5"
              >
                <stat.icon className="w-4 h-4 text-blue-400 mb-2" />
                <div className="text-sm font-semibold text-white">{stat.value}</div>
                <div className="text-[10px] text-slate-500">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          <div className="space-y-2">
            <div className="text-xs font-semibold text-slate-400 px-1">Integrationsnav (Sync status)</div>
            {integrations.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 + i * 0.12 }}
                className="flex items-center gap-3 bg-white/5 rounded-lg p-3 border border-white/5"
              >
                <div className={`w-2 h-2 rounded-full ${item.color}`} />
                <span className="text-xs text-slate-300 font-mono w-32 truncate">{item.name}</span>
                <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${
                      item.sync > 90
                        ? "bg-green-500"
                        : "bg-blue-500"
                    }`}
                    initial={{ width: 0 }}
                    animate={{ width: `${item.sync}%` }}
                    transition={{ delay: 1.5 + i * 0.2, duration: 0.8, ease: "easeOut" }}
                  />
                </div>
                <span className="text-xs text-white">{item.sync}%</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function HeroSection() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const springY = useSpring(y, { stiffness: 100, damping: 30 });

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-slate-950">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(59,130,246,0.35),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_80%_60%,rgba(6,182,212,0.15),transparent)]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
          }}
        />
        <FloatingOrb
          className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"
          delay={0}
        />
        <FloatingOrb
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl"
          delay={2}
        />
        <FloatingOrb
          className="absolute top-1/2 right-1/3 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl"
          delay={4}
        />
      </div>

      <motion.div style={{ y: springY, opacity }} className="relative w-full pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-6 bg-blue-500/10 text-blue-300 border-blue-500/20 hover:bg-blue-500/20">
                <Zap className="w-3 h-3 mr-1" />
                Nytt: Profit Intelligence AI
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.05]"
            >
              Hitta dolda vinster i din{" "}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-300 bg-clip-text text-transparent">
                transportdata
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-6 text-lg text-slate-400 max-w-xl leading-relaxed"
            >
              Koppla samman telematik, TMS, ERP och AI i en gemensam plattform på några minuter. Sluta fråga &quot;Var är lastbilen?&quot; och låt AI svara på vilka kunder som faktiskt är lönsamma.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <Link to="/app">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Button
                    size="lg"
                    className="h-12 px-8 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white border-0 shadow-xl shadow-blue-500/30 text-base"
                  >
                    Öppna AI Advisor
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </motion.div>
              </Link>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 px-8 border-white/20 text-white hover:bg-white/10 bg-white/5 text-base"
                  asChild
                >
                  <a href="#features">
                    <Play className="w-4 h-4 mr-1" />
                    Se funktioner
                  </a>
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-12 flex items-center gap-6 text-sm text-slate-500"
            >
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-400" />
                GDPR-kompatibel
              </div>
              <div className="w-px h-4 bg-slate-700" />
              <span>99.9% uptime SLA</span>
              <div className="w-px h-4 bg-slate-700" />
              <span>Öppet API & Webhooks</span>
            </motion.div>
          </div>

          <div className="hidden lg:block">
            <DashboardPreview />
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2"
        >
          <div className="w-1 h-2 bg-white/40 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
