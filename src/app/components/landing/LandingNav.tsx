import { useEffect, useState } from "react";
import { Link } from "react-router";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { TrendingUp, Menu, X } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "../ui/utils";

const navLinks = [
  { href: "#features", label: "Funktioner" },
  { href: "#pricing", label: "Priser" },
  { href: "#how-it-works", label: "Så funkar det" },
  { href: "#faq", label: "FAQ" },
];

export function LandingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 24);
  });

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-slate-950/80 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-blue-500/5"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between py-4">
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 3 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30"
            >
              <TrendingUp className="w-5 h-5 text-white" />
            </motion.div>
            <div>
              <span className="text-lg font-semibold text-white tracking-tight">
                FleetPulse
              </span>
              <span className="hidden sm:block text-xs text-slate-400">
                Electric Fleet Intelligence
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-slate-300 hover:text-white transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-blue-400 to-cyan-400 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <Link to="/app">
              <Button
                variant="ghost"
                className="text-slate-300 hover:text-white hover:bg-white/10"
              >
                Logga in
              </Button>
            </Link>
            <Link to="/app">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white border-0 shadow-lg shadow-blue-500/25">
                  Öppna dashboard
                </Button>
              </motion.div>
            </Link>
          </div>

          <button
            type="button"
            className="lg:hidden text-white p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Meny"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.header>

      <motion.div
        initial={false}
        animate={mobileOpen ? "open" : "closed"}
        variants={{
          open: { opacity: 1, pointerEvents: "auto" as const },
          closed: { opacity: 0, pointerEvents: "none" as const },
        }}
        className="fixed inset-0 z-40 lg:hidden bg-slate-950/95 backdrop-blur-xl pt-24 px-6"
      >
        <nav className="flex flex-col gap-6">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              initial={{ opacity: 0, x: -20 }}
              animate={mobileOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ delay: i * 0.08 }}
              className="text-2xl font-medium text-white"
            >
              {link.label}
            </motion.a>
          ))}
          <Link to="/app" onClick={() => setMobileOpen(false)}>
            <Button className="w-full mt-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
              Öppna dashboard
            </Button>
          </Link>
        </nav>
      </motion.div>
    </>
  );
}
