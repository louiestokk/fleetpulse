import { Link } from "react-router";
import { TrendingUp } from "lucide-react";

const footerLinks = {
  Produkt: [
    { label: "Funktioner", href: "#features" },
    { label: "Priser", href: "#pricing" },
    { label: "Dashboard", href: "/app" },
    { label: "API", href: "#" },
  ],
  Företag: [
    { label: "Om oss", href: "#" },
    { label: "Karriär", href: "#" },
    { label: "Blogg", href: "#" },
    { label: "Kontakt", href: "#" },
  ],
  Juridiskt: [
    { label: "Integritet", href: "#" },
    { label: "Villkor", href: "#" },
    { label: "GDPR", href: "#" },
    { label: "Säkerhet", href: "#" },
  ],
};

export function LandingFooter() {
  return (
    <footer className="bg-slate-950 border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-semibold text-white">FleetPulse</span>
            </Link>
            <p className="mt-4 text-sm text-slate-500 leading-relaxed">
              Electric Fleet Intelligence för moderna transportbolag.
            </p>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-white mb-4">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith("/") ? (
                      <Link
                        to={link.href}
                        className="text-sm text-slate-500 hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className="text-sm text-slate-500 hover:text-white transition-colors"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-600">
            © {new Date().getFullYear()} FleetPulse. Alla rättigheter förbehållna.
          </p>
          <p className="text-sm text-slate-600">
            Byggd för Volvo Electric Fleet Management
          </p>
        </div>
      </div>
    </footer>
  );
}
