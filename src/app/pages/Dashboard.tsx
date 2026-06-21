import { motion } from "motion/react";
import { Link } from "react-router";
import { Card } from "../components/ui/card";
import { Progress } from "../components/ui/progress";
import { Badge } from "../components/ui/badge";
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
} from "recharts";
import {
  Truck,
  Battery,
  AlertTriangle,
  TrendingUp,
  Zap,
  MapPin,
  Clock,
} from "lucide-react";
import { vehicles, fleetStats, energyConsumptionData, efficiencyData } from "../data/mockData";
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

const getBatteryColor = (level: number) => {
  if (level >= 70) return "text-green-600";
  if (level >= 30) return "text-yellow-600";
  return "text-red-600";
};

const getBatteryBgColor = (level: number) => {
  if (level >= 70) return "bg-green-100";
  if (level >= 30) return "bg-yellow-100";
  return "bg-red-100";
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
  return (
    <div className="space-y-8">
      {/* UX Thinking Section */}
      <UXThinkingSection
        problem="Operatörer behöver snabbt identifiera vilka fordon som kräver omedelbar uppmärksamhet bland många aktiva fordon, samtidigt som de behöver en övergripande bild av flottans status."
        uxDecisions={[
          "Färgkodning: Röd för varningar, orange för underhåll, grön för optimalt - hjärnan tolkar färger 60 000x snabbare än text",
          "Visuell hierarki: Kritisk information (varningar, lågt batteri) visas först och får mer visuellt utrymme",
          "Gruppering efter status: Fordon grupperas för att minska kognitiv belastning vid scanning",
          "Progressiv informationsvisning: Översikt först, detaljer vid klick - minskar överbelastning",
          "Realtidsuppdateringar: Tidsangivelser som '2 min sedan' skapar medvetenhet om datans aktualitet",
        ]}
        motionDecisions={[
          "Staggered animations vid laddning: Guidar ögat genom informationshierarkin uppifrån och ner",
          "Hover-effekter på fordonskort: Indikerar interaktivitet utan att kräva klick",
          "Smooth transitions vid statusändringar: Hjälper operatören att upptäcka förändringar i sitt perifera syn",
          "Pulseffekt på realtidsindikatorn: Bekräftar att systemet aktivt uppdateras",
        ]}
      />

      {/* Stats Overview */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <motion.div variants={item}>
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Truck className="w-6 h-6 text-blue-600" />
              </div>
              <Badge variant="secondary">{fleetStats.totalVehicles} totalt</Badge>
            </div>
            <div className="space-y-1">
              <p className="text-3xl font-semibold text-gray-900">
                {fleetStats.activeVehicles}
              </p>
              <p className="text-sm text-gray-600">Aktiva fordon</p>
            </div>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Battery className="w-6 h-6 text-green-600" />
              </div>
              <Badge variant="secondary">Genomsnitt</Badge>
            </div>
            <div className="space-y-1">
              <p className="text-3xl font-semibold text-gray-900">
                {fleetStats.averageBattery}%
              </p>
              <p className="text-sm text-gray-600">Batterinivå</p>
            </div>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-yellow-600" />
              </div>
              <Badge variant="secondary">Flotta</Badge>
            </div>
            <div className="space-y-1">
              <p className="text-3xl font-semibold text-gray-900">
                {fleetStats.averageEfficiency}%
              </p>
              <p className="text-sm text-gray-600">Effektivitet</p>
            </div>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <Badge variant="destructive">{fleetStats.totalAlerts} aktiva</Badge>
            </div>
            <div className="space-y-1">
              <p className="text-3xl font-semibold text-gray-900">
                {vehicles.filter((v) => v.status === "warning" || v.status === "maintenance").length}
              </p>
              <p className="text-sm text-gray-600">Kräver åtgärd</p>
            </div>
          </Card>
        </motion.div>
      </motion.div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-gray-900">Energiförbrukning</h3>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={energyConsumptionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="day" stroke="#6b7280" fontSize={12} />
                <YAxis stroke="#6b7280" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="consumption" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <p className="text-xs text-gray-500 mt-4">kWh per dag</p>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Zap className="w-5 h-5 text-green-600" />
              <h3 className="font-semibold text-gray-900">Effektivitetstrend</h3>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={efficiencyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                <YAxis stroke="#6b7280" fontSize={12} domain={[80, 100]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="efficiency"
                  stroke="#10b981"
                  fill="#86efac"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
            <p className="text-xs text-gray-500 mt-4">% genomsnittlig flottaeffektivitet</p>
          </Card>
        </motion.div>
      </div>

      {/* Vehicle Grid */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Fordonsstatus</h2>
          <div className="flex items-center gap-4 text-sm">
            {Object.entries(statusLabels).map(([status, label]) => (
              <div key={status} className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${statusColors[status as keyof typeof statusColors]}`} />
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
          {vehicles.map((vehicle, index) => (
            <motion.div key={vehicle.id} variants={item}>
              <Link to={`/app/vehicle/${vehicle.id}`}>
                <Card className="p-5 hover:shadow-xl hover:scale-[1.02] transition-all cursor-pointer">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <div className={`w-2.5 h-2.5 rounded-full ${statusColors[vehicle.status]}`} />
                        <span className="text-xs font-medium text-gray-600">
                          {vehicle.id}
                        </span>
                      </div>
                      <h3 className="font-semibold text-gray-900 text-sm">
                        {vehicle.name}
                      </h3>
                    </div>
                    {vehicle.alerts.length > 0 && (
                      <Badge variant="destructive" className="text-xs">
                        {vehicle.alerts.length}
                      </Badge>
                    )}
                  </div>

                  {/* Battery */}
                  <div className={`p-3 rounded-lg mb-3 ${getBatteryBgColor(vehicle.batteryLevel)}`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Battery className={`w-4 h-4 ${getBatteryColor(vehicle.batteryLevel)}`} />
                        <span className="text-xs font-medium text-gray-700">Batteri</span>
                      </div>
                      <span className={`text-sm font-semibold ${getBatteryColor(vehicle.batteryLevel)}`}>
                        {vehicle.batteryLevel}%
                      </span>
                    </div>
                    <Progress
                      value={vehicle.batteryLevel}
                      className="h-1.5"
                    />
                    <p className="text-xs text-gray-600 mt-1">
                      Räckvidd: {vehicle.range} km
                    </p>
                  </div>

                  {/* Info */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{vehicle.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <Truck className="w-3.5 h-3.5" />
                      <span>{vehicle.driver}</span>
                    </div>
                    {vehicle.speed > 0 && (
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <TrendingUp className="w-3.5 h-3.5" />
                        <span>{vehicle.speed} km/h</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{vehicle.lastUpdate}</span>
                    </div>
                  </div>

                  {/* Alerts */}
                  {vehicle.alerts.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      {vehicle.alerts.slice(0, 2).map((alert) => (
                        <div
                          key={alert.id}
                          className="flex items-start gap-2 text-xs text-red-600 mb-1"
                        >
                          <AlertTriangle className="w-3 h-3 mt-0.5 flex-shrink-0" />
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
