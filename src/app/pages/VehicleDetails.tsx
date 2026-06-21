import { useParams, Link } from "react-router";
import { motion } from "motion/react";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
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
} from "lucide-react";
import { vehicles, batteryHistoryData } from "../data/mockData";
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
  const vehicle = vehicles.find((v) => v.id === id);

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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Back Button */}
      <Link to="/app">
        <Button variant="ghost" className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Tillbaka till Dashboard
        </Button>
      </Link>

      {/* UX Thinking */}
      <UXThinkingSection
        problem="Förare och operatörer behöver snabbt förstå ett fordons aktuella status och historik för att fatta beslut om laddning, rutt och underhåll."
        uxDecisions={[
          "Expanderad vy från översikten: Bibehåller visuell kontinuitet och minskar orienteringstid",
          "Stora, lättlästa värden: Kritiska mätvärden (batteri, temperatur) är omedelbart synliga",
          "Historikdiagram: Visar trender istället för endast nuläge - hjälper till att förutsäga behov",
          "Färgkodad statusinformation: Röd för problem, gul för varningar, grön för normalt",
          "Kontext vid varje mätvärde: 'Nästa service om 58 körningar' är mer användbart än bara 142",
        ]}
        motionDecisions={[
          "Smooth page transition: Minskar kognitiv belastning vid navigation",
          "Animated värdeförändringar: Om data uppdateras i realtid, indikeras detta med motion",
          "Expand/collapse för historik: Progressiv disclosure - låter användaren välja informationsdjup",
          "Hover-feedback på interaktiva element: Tydlig indikation på vad som kan klickas",
        ]}
      />

      {/* Header Card */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="p-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-3 h-3 rounded-full ${statusColors[vehicle.status]}`} />
                <Badge variant="secondary">{vehicle.id}</Badge>
                <Badge>{statusLabels[vehicle.status]}</Badge>
              </div>
              <h1 className="text-3xl font-semibold text-gray-900 mb-2">
                {vehicle.name}
              </h1>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>Uppdaterad {vehicle.lastUpdate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span>Realtidsdata</span>
                </div>
              </div>
            </div>
          </div>

          {/* Alerts */}
          {vehicle.alerts.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <h3 className="font-semibold text-red-900">
                  Varningar ({vehicle.alerts.length})
                </h3>
              </div>
              <div className="space-y-2">
                {vehicle.alerts.map((alert) => (
                  <div key={alert.id} className="flex items-start gap-3">
                    <Badge
                      variant={alert.type === "critical" ? "destructive" : "secondary"}
                      className="mt-0.5"
                    >
                      {alert.type === "critical" ? "Kritisk" : "Varning"}
                    </Badge>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{alert.message}</p>
                      <p className="text-xs text-gray-500 mt-1">Kl. {alert.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <Gauge className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-semibold text-gray-900">{vehicle.speed}</p>
              <p className="text-sm text-gray-600">km/h</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <Battery className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-semibold text-gray-900">{vehicle.batteryLevel}%</p>
              <p className="text-sm text-gray-600">Batteri</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <Thermometer className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <p className="text-2xl font-semibold text-gray-900">{vehicle.temperature}°C</p>
              <p className="text-sm text-gray-600">Temperatur</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <p className="text-2xl font-semibold text-gray-900">{vehicle.efficiency}%</p>
              <p className="text-sm text-gray-600">Effektivitet</p>
            </div>
          </div>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Battery & Performance */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 space-y-6"
        >
          {/* Battery Status */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Battery className="w-5 h-5 text-green-600" />
              <h3 className="font-semibold text-gray-900">Batteristatus</h3>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Laddningsnivå</span>
                  <span className="font-semibold text-gray-900">
                    {vehicle.batteryLevel}%
                  </span>
                </div>
                <Progress value={vehicle.batteryLevel} className="h-3" />
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Återstående räckvidd</p>
                  <p className="text-xl font-semibold text-gray-900">{vehicle.range} km</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Batteripakettemp.</p>
                  <p className="text-xl font-semibold text-gray-900">
                    {vehicle.temperature}°C
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-3">Batterihistorik (24h)</h4>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={batteryHistoryData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="time" stroke="#6b7280" fontSize={11} />
                  <YAxis stroke="#6b7280" fontSize={11} domain={[0, 100]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="level"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={{ fill: "#3b82f6", r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Performance Metrics */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Zap className="w-5 h-5 text-yellow-600" />
              <h3 className="font-semibold text-gray-900">Prestandamätvärden</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-600">Effektivitet</span>
                  <span className="text-lg font-semibold text-green-600">
                    {vehicle.efficiency}%
                  </span>
                </div>
                <Progress value={vehicle.efficiency} className="h-2" />
                <p className="text-xs text-gray-500 mt-2">
                  Energianvändning jämfört med optimalt
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-2">Genomsnittlig hastighet</p>
                <p className="text-2xl font-semibold text-gray-900">{vehicle.speed}</p>
                <p className="text-xs text-gray-500 mt-1">km/h denna resa</p>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-2">Körsträcka denna vecka</p>
                <p className="text-2xl font-semibold text-gray-900">1,284</p>
                <p className="text-xs text-gray-500 mt-1">km</p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Right Column - Info */}
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-6"
        >
          {/* Vehicle Info */}
          <Card className="p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Fordonsinformation</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Position</p>
                  <p className="text-sm text-gray-600">{vehicle.location}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {vehicle.coordinates.lat.toFixed(4)}°N, {vehicle.coordinates.lng.toFixed(4)}°E
                  </p>
                </div>
              </div>

              <Separator />

              <div className="flex items-start gap-3">
                <User className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Förare</p>
                  <p className="text-sm text-gray-600">{vehicle.driver}</p>
                </div>
              </div>

              <Separator />

              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Servicehistorik</p>
                  <p className="text-sm text-gray-600">
                    {vehicle.tripsSinceService} körningar sedan senaste service
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Nästa service om {vehicle.nextServiceIn} körningar
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Snabbåtgärder</h3>
            <div className="space-y-3">
              <Link to="/app/maintenance">
                <Button className="w-full justify-start" variant="outline">
                  <Calendar className="w-4 h-4 mr-2" />
                  Boka service
                </Button>
              </Link>
              <Button className="w-full justify-start" variant="outline">
                <MapPin className="w-4 h-4 mr-2" />
                Visa på karta
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <TrendingUp className="w-4 h-4 mr-2" />
                Se fullständig historik
              </Button>
            </div>
          </Card>

          {/* Status Summary */}
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
            <h3 className="font-semibold text-gray-900 mb-4">Statussammanfattning</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Systemhälsa</span>
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  Utmärkt
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Senaste uppdatering</span>
                <span className="text-sm font-medium text-gray-900">
                  {vehicle.lastUpdate}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Uppetid denna månad</span>
                <span className="text-sm font-medium text-gray-900">97.8%</span>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
