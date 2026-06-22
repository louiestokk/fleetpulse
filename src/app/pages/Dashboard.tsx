import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Link } from "react-router";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";
import {
  Truck,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  DollarSign,
  MapPin,
  Clock,
  ArrowUpRight,
  ShieldCheck,
  ChevronRight,
  Percent
} from "lucide-react";
import { dataService } from "../services/dataService";
import { UXThinkingSection } from "../components/UXThinking";

const statusColors = {
  active: "bg-green-500",
  idle: "bg-gray-400",
  charging: "bg-blue-500",
  maintenance: "bg-orange-500",
  warning: "bg-red-500",
};

const statusLabels = {
  active: "Aktiv",
  idle: "Väntar",
  charging: "Laddar",
  maintenance: "Service",
  warning: "Varning",
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function Dashboard() {
  const [vehicles, setVehicles] = useState(dataService.getVehicles());
  const [customers, setCustomers] = useState(dataService.getCustomers());
  const [integrations, setIntegrations] = useState(dataService.getIntegrations());

  useEffect(() => {
    // Read from services on mount
    setVehicles(dataService.getVehicles());
    setCustomers(dataService.getCustomers());
    setIntegrations(dataService.getIntegrations());
  }, []);

  // Compute live stats based on vehicles
  const totalRevenue = vehicles.reduce((sum, v) => sum + v.revenue, 0);
  const totalCosts = vehicles.reduce(
    (sum, v) =>
      sum +
      v.costs.fuel +
      v.costs.salary +
      v.costs.tolls +
      v.costs.ferries +
      v.costs.maintenance,
    0
  );
  const avgMargin = Math.round(((totalRevenue - totalCosts) / totalRevenue) * 1000) / 10;
  const activeCount = vehicles.filter(v => v.status === "active").length;
  const warningCount = vehicles.filter(v => v.status === "warning").length;
  const connectedIntegrations = integrations.filter(i => i.status === "connected").length;

  const profitHistoryData = [
    { month: "Jan", intakter: 950000, kostnader: 820000, vinst: 130000 },
    { month: "Feb", intakter: 1020000, kostnader: 860000, vinst: 160000 },
    { month: "Mar", intakter: 1100000, kostnader: 940000, vinst: 160000 },
    { month: "Apr", intakter: 1150000, kostnader: 980000, vinst: 170000 },
    { month: "Maj", intakter: 1250000, kostnader: 1080000, vinst: 170000 },
    { month: "Jun", intakter: totalRevenue * 4, kostnader: totalCosts * 4, vinst: (totalRevenue - totalCosts) * 4 },
  ];

  // Aggregated Cost Breakdown
  const totalFuel = vehicles.reduce((sum, v) => sum + v.costs.fuel, 0);
  const totalSalary = vehicles.reduce((sum, v) => sum + v.costs.salary, 0);
  const totalTolls = vehicles.reduce((sum, v) => sum + v.costs.tolls, 0);
  const totalFerries = vehicles.reduce((sum, v) => sum + v.costs.ferries, 0);
  const totalMaint = vehicles.reduce((sum, v) => sum + v.costs.maintenance, 0);

  const costBreakdownData = [
    { name: "Löner", värde: totalSalary },
    { name: "Bränsle", värde: totalFuel },
    { name: "Vägavgifter", värde: totalTolls },
    { name: "Färjor", värde: totalFerries },
    { name: "Underhåll", värde: totalMaint },
  ];

  const getMarginBadgeVariant = (margin: number) => {
    if (margin >= 15) return "bg-green-100 text-green-800 border-green-200 font-bold";
    if (margin >= 8) return "bg-yellow-100 text-yellow-800 border-yellow-200 font-bold";
    return "bg-red-100 text-red-800 border-red-200 font-bold";
  };

  return (
    <div className="space-y-8">
      {/* UX Thinking Section */}
      {/* <UXThinkingSection
        problem="Transportchefer fattar ofta beslut baserat på enbart omsättning, vilket döljer olönsamma rutter, dyra terminalförseningar och dolda rörliga kostnader."
        uxDecisions={[
          "Ekonomiskt fokus framför allt: Dashboarden lyfter fram intäkter, kostnader och faktiska marginaler istället för bara GPS-plottar.",
          "Tydliga avvikelsevarningar: Varningar för kunder under 10% marginal drar direkt till sig operatörens blick.",
          "Färgkodade marginalnivåer: Grönt för lönsamt, gult för gränsfall, rött för olönsamt underlättar omedelbar scanning.",
          "Direkt koppling till rådgivning: Klickbara detaljer eller länkar guidar användaren från problemidentifiering till lösning."
        ]}
        motionDecisions={[
          "Laddningsstegring (Stagger): Statistikkort och fordonslistor glider mjukt in för att skapa visuell struktur.",
          "Interaktiv feedback vid hovring: Korten expanderar och lyfts fram för att bjuda in till djupdykning."
        ]}
      /> */}

      {/* Stats Overview */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <motion.div variants={item}>
          <Card className="p-6 hover:shadow-lg transition-shadow bg-white border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
              <Badge variant="secondary" className="font-semibold">Omsättning</Badge>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-gray-900">
                {(totalRevenue * 4).toLocaleString("sv-SE")} kr
              </p>
              <p className="text-xs text-gray-500">Ackumulerat innevarande kvartal</p>
            </div>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="p-6 hover:shadow-lg transition-shadow bg-white border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <TrendingDown className="w-6 h-6 text-red-600" />
              </div>
              <Badge variant="secondary" className="font-semibold">Driftskostnader</Badge>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-gray-900">
                {(totalCosts * 4).toLocaleString("sv-SE")} kr
              </p>
              <p className="text-xs text-gray-500">Lön, el/bränsle, färjor, tullar</p>
            </div>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="p-6 hover:shadow-lg transition-shadow bg-white border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                <Percent className="w-6 h-6 text-emerald-600" />
              </div>
              <Badge variant="secondary" className="font-semibold">Snittmarginal</Badge>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-gray-900">
                {avgMargin}%
              </p>
              <p className="text-xs text-gray-500">Målsättning: min. 15.0%</p>
            </div>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="p-6 hover:shadow-lg transition-shadow bg-white border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-purple-600" />
              </div>
              <Badge variant="secondary" className="font-semibold">Integrationer</Badge>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-gray-900">
                {connectedIntegrations} / {integrations.length}
              </p>
              <p className="text-xs text-gray-500">Samsara, Fortnox & Volvo aktiva</p>
            </div>
          </Card>
        </motion.div>
      </motion.div>

      {/* Cost/Revenue Alert */}
      {warningCount > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center"
        >
          <div className="flex gap-3 items-start">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-amber-950 text-sm">Avvikelser upptäckta av AI</h4>
              <p className="text-xs text-amber-800 mt-1 max-w-3xl">
                Lönsamheten för **Customer A AB** (rutter via Göteborg–Oslo) ligger för närvarande under gränsvärdet på 6%. 
                Detta beror på långa terminalväntetider (+38% över 90 min) och tomkörning efter leverans.
              </p>
            </div>
          </div>
          <Link to="/app/advisor">
            <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white font-semibold self-stretch md:self-auto text-xs">
              Chatta med Advisor
              <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </Link>
        </motion.div>
      )}

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6 bg-white border-gray-200">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-gray-900 text-base">Intäkter vs Kostnader (Kvartal)</h3>
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={profitHistoryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" fontSize={11} />
                <YAxis stroke="#6b7280" fontSize={11} tickFormatter={(v) => `${v / 1000}k`} />
                <Tooltip
                  formatter={(value) => `${Number(value).toLocaleString()} kr`}
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                />
                <Legend verticalAlign="top" height={36} iconSize={10} />
                <Area
                  name="Intäkter"
                  type="monotone"
                  dataKey="intakter"
                  stroke="#2563eb"
                  fill="#dbeafe"
                  strokeWidth={2}
                />
                <Area
                  name="Kostnader"
                  type="monotone"
                  dataKey="kostnader"
                  stroke="#ef4444"
                  fill="#fee2e2"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-6 bg-white border-gray-200">
            <div className="flex items-center gap-2 mb-6">
              <Percent className="w-5 h-5 text-emerald-600" />
              <h3 className="font-semibold text-gray-900 text-base">Fördelning av driftskostnader</h3>
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={costBreakdownData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" stroke="#6b7280" fontSize={11} />
                <YAxis stroke="#6b7280" fontSize={11} tickFormatter={(v) => `${v / 1000}k`} />
                <Tooltip
                  formatter={(value) => `${Number(value).toLocaleString()} kr`}
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="värde" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>
      </div>

      {/* Customer Profitability Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl border border-gray-200 overflow-hidden"
      >
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-950 text-base">Kundlönsamhet</h3>
            <p className="text-xs text-gray-500 mt-0.5">Analys av intäkter matchat mot faktiska driftskostnader</p>
          </div>
          <Badge className="bg-blue-50 text-blue-800 border-blue-200">
            Transport Intelligence Graph
          </Badge>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-700 text-xs uppercase font-semibold border-b border-gray-200">
              <tr>
                <th className="px-6 py-3">Kund</th>
                <th className="px-6 py-3">Primär rutt</th>
                <th className="px-6 py-3 text-right">Intäkt</th>
                <th className="px-6 py-3 text-right">Driftskostnad</th>
                <th className="px-6 py-3 text-right">Vinst</th>
                <th className="px-6 py-3 text-center">Marginal</th>
                <th className="px-6 py-3 text-center">Terminalförseningar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {customers.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50/50">
                  <td className="px-6 py-4 font-semibold text-gray-900">{c.name}</td>
                  <td className="px-6 py-4">{c.primaryRoute}</td>
                  <td className="px-6 py-4 text-right font-medium">{c.revenue.toLocaleString()} kr</td>
                  <td className="px-6 py-4 text-right">{c.cost.toLocaleString()} kr</td>
                  <td className="px-6 py-4 text-right text-slate-900 font-medium">{(c.revenue - c.cost).toLocaleString()} kr</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs border ${getMarginBadgeVariant(c.margin)}`}>
                      {c.margin}%
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center text-xs">
                    {c.waitingTimeOver90 > 25 ? (
                      <span className="text-red-600 font-semibold">{c.waitingTimeOver90}% &gt; 90 min</span>
                    ) : (
                      <span className="text-gray-500">{c.waitingTimeOver90}% &gt; 90 min</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Vehicle Margin Grid */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-gray-950">Fordonsöversikt & Marginaler</h2>
            <p className="text-xs text-gray-500 mt-0.5">Avkastning per registrerat fordon baserat på dess senaste rutt</p>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold">
            {Object.entries(statusLabels).map(([status, label]) => (
              <div key={status} className="flex items-center gap-1.5">
                <div className={`w-2.5 h-2.5 rounded-full ${statusColors[status as keyof typeof statusColors]}`} />
                <span className="text-gray-600">{label}</span>
              </div>
            ))}
          </div>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          {vehicles.map((vehicle) => (
            <motion.div key={vehicle.id} variants={item}>
              <Link to={`/app/vehicle/${vehicle.id}`}>
                <Card className="p-5 hover:shadow-xl hover:scale-[1.01] transition-all cursor-pointer bg-white border-gray-200">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-1.5 mb-1">
                        <div className={`w-2 h-2 rounded-full ${statusColors[vehicle.status]}`} />
                        <span className="text-[10px] font-bold text-gray-500 font-mono">
                          {vehicle.id}
                        </span>
                      </div>
                      <h3 className="font-bold text-gray-900 text-sm">
                        {vehicle.name}
                      </h3>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded border ${getMarginBadgeVariant(vehicle.margin)}`}>
                      {vehicle.margin}%
                    </span>
                  </div>

                  {/* Margin bar */}
                  <div className="p-3 bg-slate-50 rounded-lg mb-3 border border-slate-100">
                    <div className="flex items-center justify-between mb-1.5 text-xs">
                      <span className="text-gray-600 font-medium">Marginalbidrag</span>
                      <span className="font-bold text-slate-800">
                        {(vehicle.revenue - (vehicle.costs.fuel + vehicle.costs.salary + vehicle.costs.tolls + vehicle.costs.ferries + vehicle.costs.maintenance)).toLocaleString()} kr
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          vehicle.margin > 12 ? "bg-emerald-500" : vehicle.margin > 5 ? "bg-amber-500" : "bg-red-500"
                        }`}
                        style={{ width: `${Math.max(5, Math.min(100, vehicle.margin * 5))}%` }}
                      />
                    </div>
                    <div className="flex justify-between items-center text-[10px] text-gray-500 mt-1">
                      <span>Rutt: {vehicle.location}</span>
                      <span>Chaufför: {vehicle.driver}</span>
                    </div>
                  </div>

                  {/* Operational stats */}
                  <div className="space-y-1.5 pt-1">
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <DollarSign className="w-3.5 h-3.5 text-gray-400" />
                      <span>Intäkt: {vehicle.revenue.toLocaleString()} kr</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <MapPin className="w-3.5 h-3.5 text-gray-400" />
                      <span>Batteri: {vehicle.batteryLevel}% ({vehicle.range} km kvar)</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Clock className="w-3.5 h-3.5 text-gray-400" />
                      <span>Uppdaterad: {vehicle.lastUpdate}</span>
                    </div>
                  </div>

                  {/* Alerts */}
                  {vehicle.alerts.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      {vehicle.alerts.slice(0, 1).map((alert) => (
                        <div
                          key={alert.id}
                          className="flex items-start gap-1.5 text-[11px] text-red-600 font-semibold"
                        >
                          <AlertTriangle className="w-3 h-3 mt-0.5 shrink-0" />
                          <span className="line-clamp-1">{alert.message}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
