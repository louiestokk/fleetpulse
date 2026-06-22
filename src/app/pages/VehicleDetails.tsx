import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import { motion } from "motion/react";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import {
  ArrowLeft,
  Battery,
  Thermometer,
  Gauge,
  MapPin,
  User,
  Calendar,
  TrendingUp,
  AlertTriangle,
  Zap,
  Clock,
  Building,
  ChevronRight,
  DollarSign,
  TrendingDown
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

export function VehicleDetails() {
  const { id } = useParams();
  const [vehicles, setVehicles] = useState(dataService.getVehicles());
  const vehicle = vehicles.find((v) => v.id === id);

  useEffect(() => {
    setVehicles(dataService.getVehicles());
  }, []);

  if (!vehicle) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Fordon hittades inte
        </h2>
        <Link to="/app">
          <Button>Tillbaka till Dashboard</Button>
        </Link>
      </div>
    );
  }

  // Calculate costs and revenue
  const totalCost =
    vehicle.costs.fuel +
    vehicle.costs.salary +
    vehicle.costs.tolls +
    vehicle.costs.ferries +
    vehicle.costs.maintenance;
  const profit = vehicle.revenue - totalCost;
  const marginPercentage = Math.round((profit / vehicle.revenue) * 1000) / 10;

  // Chart data for cost breakdown
  const costData = [
    { name: "Lön", belopp: vehicle.costs.salary },
    { name: "Bränsle", belopp: vehicle.costs.fuel },
    { name: "Vägavgifter", belopp: vehicle.costs.tolls },
    { name: "Färjor", belopp: vehicle.costs.ferries },
    { name: "Underhåll", belopp: vehicle.costs.maintenance },
  ];

  // Try to match customer based on primary route or name
  const matchedCustomer = vehicle.id === "VLV-003" || vehicle.id === "VLV-001"
    ? "Customer A AB"
    : vehicle.id === "VLV-002"
      ? "Nordic Retail Group"
      : "Scandic Logistics";

  const getMarginColor = (margin: number) => {
    if (margin >= 15) return "text-green-600";
    if (margin >= 8) return "text-yellow-600";
    return "text-red-600";
  };

  const getMarginBg = (margin: number) => {
    if (margin >= 15) return "bg-green-100";
    if (margin >= 8) return "bg-yellow-100";
    return "bg-red-100";
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Back Button */}
      <Link to="/app">
        <Button variant="ghost" className="gap-2 text-gray-600 hover:text-slate-900">
          <ArrowLeft className="w-4 h-4" />
          Tillbaka till Dashboard
        </Button>
      </Link>

      {/* UX Thinking */}
      {/* <UXThinkingSection
        problem="Operatörer och fleet managers behöver se hela kedjan av lönsamhet per enskilt fordon för att identifiera exakt var i kedjan en förlust uppstår."
        uxDecisions={[
          "Transport Intelligence Graph: En steg-för-steg-vy som visar sambandet mellan fordon, förare, rutt, kund och vinst.",
          "Visualiserade kostnadsposter: Stapeldiagrammet visar direkt vilken enskild kostnadspost som belastar fordonsmarginalen mest.",
          "Prediktiva AI-varningar: AI-boxen analyserar avvikelser (t.ex. tomgång, service) för att förklara röda marginaler."
        ]}
        motionDecisions={[
          "Transitions vid sidbyte: Sidan tonas in mjukt för att förhindra kognitiva hopp.",
          "Animerade staplar: Kostnaderna ritas upp med en mjuk tillväxtkurva för ökad scannbarhet."
        ]}
      /> */}

      {/* Header Card */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
            <User className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono font-bold text-gray-500">{vehicle.id}</span>
              <div className={`w-2 h-2 rounded-full ${statusColors[vehicle.status]}`} />
              <span className="text-xs text-gray-600 font-semibold">{statusLabels[vehicle.status]}</span>
            </div>
            <h2 className="text-xl font-bold text-gray-900">{vehicle.name}</h2>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-right">
            <p className="text-xs text-gray-500">Ackumulerad Intäkt</p>
            <p className="text-lg font-bold text-gray-900">{vehicle.revenue.toLocaleString()} kr</p>
          </div>
          <div className="w-px h-10 bg-gray-200" />
          <div className="text-right">
            <p className="text-xs text-gray-500">Marginal</p>
            <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-bold border mt-0.5 ${getMarginBg(marginPercentage)} ${getMarginColor(marginPercentage)}`}>
              {marginPercentage}%
            </span>
          </div>
        </div>
      </motion.div>

      {/* Transport Intelligence Graph */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="p-6 bg-slate-900 border-slate-800 text-white shadow-xl">
          <h3 className="font-bold mb-6 text-xs text-slate-400 uppercase tracking-wider">Transport Intelligence Graph</h3>
          <div className="grid grid-cols-2 md:flex md:flex-row items-center justify-between gap-6 md:gap-4">
            
            {/* Step 1: Vehicle */}
            <div className="flex flex-col items-center text-center">
              <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center border border-blue-500/40">
                <Calendar className="w-5 h-5 text-blue-400" />
              </div>
              <span className="text-xs font-semibold mt-2 text-white">Fordon</span>
              <span className="text-[10px] text-slate-400 font-mono">{vehicle.id}</span>
            </div>
            
            <ChevronRight className="w-5 h-5 text-slate-700 hidden md:block" />

            {/* Step 2: Driver */}
            <div className="flex flex-col items-center text-center">
              <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center border border-purple-500/40">
                <User className="w-5 h-5 text-purple-400" />
              </div>
              <span className="text-xs font-semibold mt-2 text-white">Chaufför</span>
              <span className="text-[10px] text-slate-400">{vehicle.driver}</span>
            </div>

            <ChevronRight className="w-5 h-5 text-slate-700 hidden md:block" />

            {/* Step 3: Route */}
            <div className="flex flex-col items-center text-center">
              <div className="w-10 h-10 bg-yellow-500/20 rounded-full flex items-center justify-center border border-yellow-500/40">
                <MapPin className="w-5 h-5 text-yellow-400" />
              </div>
              <span className="text-xs font-semibold mt-2 text-white">Rutt</span>
              <span className="text-[10px] text-slate-400">{vehicle.location}</span>
            </div>

            <ChevronRight className="w-5 h-5 text-slate-700 hidden md:block" />

            {/* Step 4: Customer */}
            <div className="flex flex-col items-center text-center">
              <div className="w-10 h-10 bg-cyan-500/20 rounded-full flex items-center justify-center border border-cyan-500/40">
                <Building className="w-5 h-5 text-cyan-400" />
              </div>
              <span className="text-xs font-semibold mt-2 text-white">Kund</span>
              <span className="text-[10px] text-slate-400">{matchedCustomer}</span>
            </div>

            <ChevronRight className="w-5 h-5 text-slate-700 hidden md:block" />

            {/* Step 5: Profit */}
            <div className="flex flex-col items-center text-center col-span-2 md:col-span-1">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border ${
                profit >= 0 ? "bg-green-500/20 border-green-500/40" : "bg-red-500/20 border-red-500/40"
              }`}>
                <DollarSign className={`w-5 h-5 ${profit >= 0 ? "text-green-400" : "text-red-400"}`} />
              </div>
              <span className="text-xs font-semibold mt-2 text-white">Vinstbidrag</span>
              <span className={`text-xs font-bold ${profit >= 0 ? "text-green-400" : "text-red-400"}`}>
                {profit.toLocaleString()} kr
              </span>
            </div>

          </div>
        </Card>
      </motion.div>

      {/* Grid for Cost chart and AI insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Cost breakdown chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <Card className="p-6 bg-white border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-6 text-base flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-red-500" />
              Kostnadsfördelning på rutt
            </h3>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={costData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis type="number" stroke="#6b7280" fontSize={11} tickFormatter={(v) => `${v / 1000}k`} />
                <YAxis dataKey="name" type="category" stroke="#6b7280" fontSize={11} width={80} />
                <Tooltip formatter={(v) => `${Number(v).toLocaleString()} kr`} />
                <Bar dataKey="belopp" fill="#ef4444" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        {/* AI Margin insights */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-6 bg-slate-950 border-slate-900 text-white h-full flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="font-semibold text-base flex items-center gap-2 text-cyan-400">
                <Zap className="w-5 h-5" />
                AI Marginalanalys
              </h3>
              
              {vehicle.id === "VLV-003" ? (
                <div className="text-xs text-slate-300 space-y-3 leading-relaxed">
                  <p className="text-red-400 font-semibold">🚨 Kritiska avvikelser upptäckta:</p>
                  <ul className="space-y-2 list-disc list-inside">
                    <li>**Servicekostnader:** <span className="text-red-400 font-bold">+42%</span> pga temperaturdiagnostik.</li>
                    <li>**Förbrukning:** <span className="text-red-400 font-bold">+18%</span> jämfört med fordonssnitt.</li>
                    <li>**Tomgångskörning:** <span className="text-red-400 font-bold">+31%</span> (ca 45 min per skift).</li>
                    <li>**Haveririsk (60 dagar):** <span className="text-red-400 font-bold">HÖG</span> (kylsystem).</li>
                  </ul>
                  <p className="mt-2 text-slate-400">
                    *Åtgärd:* Planera batteri/kylsystemsdiagnostik i underhållspanelen för att undvika haveri och öka marginalen.
                  </p>
                </div>
              ) : vehicle.id === "VLV-001" ? (
                <div className="text-xs text-slate-300 space-y-3 leading-relaxed">
                  <p className="text-emerald-400 font-semibold">🟢 Optimal prestanda på rutt:</p>
                  <ul className="space-y-2 list-disc list-inside">
                    <li>**Körstilseffektivitet:** <span className="text-emerald-400 font-bold">94%</span> (toppnivå).</li>
                    <li>**Tomgångskörning:** <span className="text-emerald-400 font-bold">-12%</span> (lägre än snittet).</li>
                    <li>**Batterihälsa:** Stabil räckviddskurva på Göteborg-Oslo.</li>
                  </ul>
                  <p className="mt-2 text-slate-400">
                    *Info:* Chaufför Erik Andersson bidrar med maximal effektivitet vilket ger fordonet en stark marginal på 14.8%.
                  </p>
                </div>
              ) : (
                <div className="text-xs text-slate-300 space-y-3 leading-relaxed">
                  <p className="text-yellow-400 font-semibold">🟡 Normala avvikelser:</p>
                  <ul className="space-y-2 list-disc list-inside">
                    <li>**Körstilseffektivitet:** {vehicle.efficiency}% (normalt).</li>
                    <li>**Tullar & avgifter:** Måttliga nivåer på rutten {vehicle.location}.</li>
                  </ul>
                  <p className="mt-2 text-slate-400">
                    *Analys:* Fordonet håller sin budgetmarginal men kan förbättras ytterligare genom optimering av ruttladdning.
                  </p>
                </div>
              )}
            </div>

            <div className="pt-6 border-t border-slate-900 mt-6">
              <Link to="/app/advisor" className="block w-full">
                <Button variant="outline" className="w-full text-xs text-cyan-400 border-cyan-900/50 hover:bg-slate-900 hover:text-cyan-300 bg-transparent">
                  Chatta om fordon {vehicle.id}
                </Button>
              </Link>
            </div>
          </Card>
        </motion.div>

      </div>

      {/* Operational parameters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <Card className="p-5 bg-white border-gray-200">
          <div className="flex items-center gap-2 mb-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            <Battery className="w-4 h-4 text-green-500" />
            Batteristatus
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 font-medium">Laddningsnivå</span>
              <span className="font-bold text-gray-900">{vehicle.batteryLevel}%</span>
            </div>
            <Progress value={vehicle.batteryLevel} className="h-1.5" />
            <p className="text-xs text-gray-500 pt-1">
              Räckvidd: <span className="font-bold text-gray-800">{vehicle.range} km</span> kvar på laddningen.
            </p>
          </div>
        </Card>

        <Card className="p-5 bg-white border-gray-200">
          <div className="flex items-center gap-2 mb-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            <Thermometer className="w-4 h-4 text-orange-500" />
            Tekniska värden
          </div>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
              <p className="text-lg font-bold text-gray-900">{vehicle.temperature}°C</p>
              <p className="text-[10px] text-gray-500 uppercase tracking-wider mt-0.5">Batteritemp</p>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
              <p className="text-lg font-bold text-gray-900">{vehicle.efficiency}%</p>
              <p className="text-[10px] text-gray-500 uppercase tracking-wider mt-0.5">Körstil</p>
            </div>
          </div>
        </Card>

        <Card className="p-5 bg-white border-gray-200">
          <div className="flex items-center gap-2 mb-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            <Gauge className="w-4 h-4 text-blue-500" />
            Serviceindikator
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-gray-600">
              <span>Rundturer sedan service:</span>
              <span className="font-bold text-gray-800">{vehicle.tripsSinceService} st</span>
            </div>
            <div className="flex justify-between text-xs text-gray-600">
              <span>Service krävs om:</span>
              {vehicle.nextServiceIn <= 20 ? (
                <span className="font-bold text-red-600">{vehicle.nextServiceIn} körningar</span>
              ) : (
                <span className="font-bold text-gray-800">{vehicle.nextServiceIn} körningar</span>
              )}
            </div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500"
                style={{ width: `${Math.max(10, Math.min(100, (vehicle.tripsSinceService / 200) * 100))}%` }}
              />
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}
