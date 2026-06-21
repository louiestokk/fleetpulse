import { Outlet, Link, useLocation } from "react-router";
import { motion } from "motion/react";
import {
  LayoutDashboard,
  Wrench,
  Users,
  TrendingUp,
  ExternalLink,
} from "lucide-react";
import { cn } from "./ui/utils";

const navItems = [
  { path: "/app", label: "Dashboard", icon: LayoutDashboard },
  { path: "/app/maintenance", label: "Underhåll", icon: Wrench },
  { path: "/app/drivers", label: "Förare", icon: Users },
];

function isNavActive(pathname: string, itemPath: string) {
  if (itemPath === "/app") {
    return (
      pathname === "/app" ||
      pathname === "/app/" ||
      pathname.startsWith("/app/vehicle")
    );
  }
  return pathname.startsWith(itemPath);
}

export function Layout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center group-hover:bg-blue-700 transition-colors">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  FleetPulse
                </h1>
                <p className="text-sm text-gray-500">
                  Fleet Control Center
                </p>
              </div>
            </Link>
            <div className="flex items-center gap-4">
              <Link
                to="/"
                className="hidden sm:flex items-center gap-1.5 text-sm text-gray-500 hover:text-blue-600 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Webbplats
              </Link>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Live Monitoring
              </div>
            </div>
          </div>
        </div>
      </header>

      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-[1600px] mx-auto px-6">
          <div className="flex gap-1">
            {navItems.map((item) => {
              const isActive = isNavActive(location.pathname, item.path);
              const Icon = item.icon;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "relative px-6 py-4 flex items-center gap-2 text-sm font-medium transition-colors",
                    isActive
                      ? "text-blue-600"
                      : "text-gray-600 hover:text-gray-900"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      <main className="max-w-[1600px] mx-auto px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
}
