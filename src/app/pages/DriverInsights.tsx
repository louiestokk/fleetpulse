import { motion } from "motion/react";
import { Link } from "react-router";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import {
  User,
  TrendingUp,
  TrendingDown,
  Award,
  AlertTriangle,
  Battery,
  Zap,
  Timer,
} from "lucide-react";
import { drivers, vehicles } from "../data/mockData";
import { UXThinkingSection } from "../components/UXThinking";

const getEfficiencyColor = (score: number) => {
  if (score >= 90) return "text-green-600";
  if (score >= 75) return "text-yellow-600";
  return "text-red-600";
};

const getEfficiencyBg = (score: number) => {
  if (score >= 90) return "bg-green-100";
  if (score >= 75) return "bg-yellow-100";
  return "bg-red-100";
};

const getSafetyBadge = (score: number) => {
  if (score >= 95) return { label: "Utmärkt", variant: "default" as const };
  if (score >= 85) return { label: "Bra", variant: "secondary" as const };
  return { label: "Förbättra", variant: "destructive" as const };
};

export function DriverInsights() {
  const sortedDrivers = [...drivers].sort((a, b) => b.efficiency - a.efficiency);
  const topPerformer = sortedDrivers[0];
  const avgEfficiency = Math.round(
    drivers.reduce((sum, d) => sum + d.efficiency, 0) / drivers.length
  );
  const avgSafety = Math.round(
    drivers.reduce((sum, d) => sum + d.safetyScore, 0) / drivers.length
  );

  const driverBehaviorData = [
    { category: "Effektivitet", value: topPerformer.efficiency },
    { category: "Säkerhet", value: topPerformer.safetyScore },
    { category: "Hastighet", value: Math.min(100, (topPerformer.averageSpeed / 70) * 100) },
    { category: "Ekonomi", value: Math.max(0, 100 - topPerformer.idleTime * 2) },
    { category: "Precision", value: Math.max(0, 100 - topPerformer.harshBraking * 3) },
  ];

  const comparisonData = drivers.slice(0, 5).map((driver) => ({
    name: driver.name.split(" ")[0],
    efficiency: driver.efficiency,
    safety: driver.safetyScore,
  }));

  return (
    <div className="space-y-8">
      {/* UX Thinking */}
      <UXThinkingSection
        problem="Flottan behöver identifiera både föredömliga förare (för belöning) och förare som behöver träning, samtidigt som man vill förstå specifika beteenden som påverkar effektivitet och säkerhet."
        uxDecisions={[
          "Leaderboard-format: Gamification-element motiverar bättre prestanda genom social jämförelse",
          "Dubbla scoreboards (effektivitet + säkerhet): Förhindrar att förare optimerar ett mätvärde på bekostnad av ett annat",
          "Specifika beteendeindikatorer: 'Hårda inbromsningar: 24' är mer handlingsbar än endast 'säkerhetspoäng: 78'",
          "Radardiagram för topprestanda: Visar styrkor och svagheter visuellt - lättare att identifiera träningsmöjligheter",
          "Förarklick till fordonsinformation: Kontextuell data hjälper att förstå om låg effektivitet beror på förare eller fordon",
        ]}
        motionDecisions={[
          "Staggered list animation: Skapar hierarki från bästa till sämsta prestanda",
          "Progress bar animations: Drar uppmärksamhet till kvantitativa skillnader",
          "Hover-effekt på förarkort: Indikerar att mer information finns tillgänglig",
          "Smooth chart transitions: Professionell känsla vid dataavisning",
        ]}
      />

      {/* Stats Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Award className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Bästa förare</p>
              <p className="text-xl font-semibold text-gray-900">{topPerformer.name}</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Effektivitet</span>
              <span className="font-semibold text-green-600">{topPerformer.efficiency}%</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Säkerhet</span>
              <span className="font-semibold text-green-600">{topPerformer.safetyScore}%</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Battery className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Genomsnittlig effektivitet</p>
              <p className="text-xl font-semibold text-gray-900">{avgEfficiency}%</p>
            </div>
          </div>
          <div className="text-sm text-gray-600">
            <p className="flex items-center gap-1">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="text-green-600">+3.2%</span> från förra månaden
            </p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Genomsnittlig säkerhet</p>
              <p className="text-xl font-semibold text-gray-900">{avgSafety}%</p>
            </div>
          </div>
          <div className="text-sm text-gray-600">
            <p className="flex items-center gap-1">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="text-green-600">+1.8%</span> från förra månaden
            </p>
          </div>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Driver Rankings */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2"
        >
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Förarprestation</h2>
              <Badge variant="secondary">{drivers.length} förare</Badge>
            </div>

            <div className="space-y-4">
              {sortedDrivers.map((driver, index) => {
                const vehicle = vehicles.find((v) => v.id === driver.vehicleId);
                const safetyBadge = getSafetyBadge(driver.safetyScore);

                return (
                  <motion.div
                    key={driver.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.01 }}
                  >
                    <Card className="p-5 hover:shadow-lg transition-shadow cursor-pointer">
                      <div className="flex items-start gap-4">
                        {/* Rank */}
                        <div className="flex-shrink-0">
                          <div
                            className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                              index === 0
                                ? "bg-yellow-100"
                                : index === 1
                                ? "bg-gray-100"
                                : index === 2
                                ? "bg-orange-100"
                                : "bg-blue-50"
                            }`}
                          >
                            <span
                              className={`font-semibold ${
                                index === 0
                                  ? "text-yellow-700"
                                  : index === 1
                                  ? "text-gray-700"
                                  : index === 2
                                  ? "text-orange-700"
                                  : "text-blue-700"
                              }`}
                            >
                              {index + 1}
                            </span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="font-semibold text-gray-900 mb-1">
                                {driver.name}
                              </h3>
                              {vehicle && (
                                <Link
                                  to={`/app/vehicle/${vehicle.id}`}
                                  className="text-sm text-blue-600 hover:underline"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  {vehicle.name} ({vehicle.id})
                                </Link>
                              )}
                            </div>
                            <Badge variant={safetyBadge.variant}>
                              {safetyBadge.label}
                            </Badge>
                          </div>

                          {/* Metrics */}
                          <div className="grid grid-cols-2 gap-4 mb-3">
                            <div>
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-xs text-gray-600">Effektivitet</span>
                                <span
                                  className={`text-sm font-semibold ${getEfficiencyColor(
                                    driver.efficiency
                                  )}`}
                                >
                                  {driver.efficiency}%
                                </span>
                              </div>
                              <Progress value={driver.efficiency} className="h-2" />
                            </div>
                            <div>
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-xs text-gray-600">Säkerhet</span>
                                <span
                                  className={`text-sm font-semibold ${getEfficiencyColor(
                                    driver.safetyScore
                                  )}`}
                                >
                                  {driver.safetyScore}%
                                </span>
                              </div>
                              <Progress value={driver.safetyScore} className="h-2" />
                            </div>
                          </div>

                          {/* Detailed Stats */}
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                            <div className="flex items-center gap-1 text-gray-600">
                              <TrendingUp className="w-3.5 h-3.5" />
                              <span>{driver.totalDistance.toLocaleString()} km</span>
                            </div>
                            <div className="flex items-center gap-1 text-gray-600">
                              <Zap className="w-3.5 h-3.5" />
                              <span>Ø {driver.averageSpeed} km/h</span>
                            </div>
                            <div
                              className={`flex items-center gap-1 ${
                                driver.harshBraking > 10 ? "text-red-600" : "text-green-600"
                              }`}
                            >
                              <AlertTriangle className="w-3.5 h-3.5" />
                              <span>{driver.harshBraking} hårda inbromsn.</span>
                            </div>
                            <div
                              className={`flex items-center gap-1 ${
                                driver.idleTime > 20 ? "text-yellow-600" : "text-green-600"
                              }`}
                            >
                              <Timer className="w-3.5 h-3.5" />
                              <span>{driver.idleTime} min tomgång</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </Card>
        </motion.div>

        {/* Charts */}
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          {/* Top Performer Radar */}
          <Card className="p-6">
            <h3 className="font-semibold text-gray-900 mb-4">
              Topp Förare - {topPerformer.name}
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <RadarChart data={driverBehaviorData}>
                <PolarGrid stroke="#e5e7eb" />
                <PolarAngleAxis
                  dataKey="category"
                  tick={{ fill: "#6b7280", fontSize: 11 }}
                />
                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10 }} />
                <Radar
                  name={topPerformer.name}
                  dataKey="value"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.5}
                />
              </RadarChart>
            </ResponsiveContainer>
            <p className="text-xs text-gray-500 text-center mt-2">
              Prestationsprofil (0-100%)
            </p>
          </Card>

          {/* Comparison Chart */}
          <Card className="p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Topp 5 Jämförelse</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={comparisonData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis type="number" domain={[0, 100]} fontSize={10} />
                <YAxis dataKey="name" type="category" fontSize={11} width={60} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="efficiency" fill="#3b82f6" name="Effektivitet" />
                <Bar dataKey="safety" fill="#10b981" name="Säkerhet" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Insights Card */}
          <Card className="p-6 bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
            <div className="flex items-center gap-2 mb-4">
              <Award className="w-5 h-5 text-yellow-600" />
              <h3 className="font-semibold text-gray-900">Förbättringsområden</h3>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">Hårda inbromsningar</p>
                  <p className="text-xs text-gray-600">
                    3 förare har över 20 hårda inbromsningar - föreslå eco-körträning
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Timer className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">Tomgångstid</p>
                  <p className="text-xs text-gray-600">
                    Genomsnittlig tomgång 18 min/dag - optimering kan spara 12% energi
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <TrendingUp className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">Positiv trend</p>
                  <p className="text-xs text-gray-600">
                    Effektiviteten ökar stadigt - fortsätt med nuvarande strategi
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
