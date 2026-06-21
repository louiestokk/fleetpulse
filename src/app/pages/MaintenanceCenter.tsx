import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import {
  AlertTriangle,
  Calendar,
  Clock,
  Wrench,
  CheckCircle2,
  ChevronRight,
  TrendingUp,
} from "lucide-react";
import { maintenanceTasks, vehicles } from "../data/mockData";
import { UXThinkingSection } from "../components/UXThinking";

const priorityConfig = {
  critical: {
    color: "bg-red-100 text-red-700 border-red-200",
    icon: AlertTriangle,
    label: "Kritisk",
  },
  high: {
    color: "bg-orange-100 text-orange-700 border-orange-200",
    icon: AlertTriangle,
    label: "Hög",
  },
  medium: {
    color: "bg-yellow-100 text-yellow-700 border-yellow-200",
    icon: Clock,
    label: "Medel",
  },
  low: {
    color: "bg-blue-100 text-blue-700 border-blue-200",
    icon: Calendar,
    label: "Låg",
  },
};

const statusConfig = {
  scheduled: { label: "Schemalagd", color: "secondary" },
  in_progress: { label: "Pågår", color: "default" },
  completed: { label: "Klar", color: "secondary" },
};

export function MaintenanceCenter() {
  const [selectedPriority, setSelectedPriority] = useState<string>("all");

  const filteredTasks = maintenanceTasks.filter((task) => {
    if (selectedPriority === "all") return true;
    return task.priority === selectedPriority;
  });

  const criticalCount = maintenanceTasks.filter((t) => t.priority === "critical").length;
  const highCount = maintenanceTasks.filter((t) => t.priority === "high").length;
  const scheduledCount = maintenanceTasks.filter((t) => t.status === "scheduled").length;
  const inProgressCount = maintenanceTasks.filter((t) => t.status === "in_progress").length;

  return (
    <div className="space-y-8">
      {/* UX Thinking */}
      <UXThinkingSection
        problem="Underhållsteam behöver snabbt prioritera åtgärder bland många schemalagda uppgifter, identifiera kritiska problem och förstå vilka fordon som snart kräver service."
        uxDecisions={[
          "Prioritetsbaserad sortering: Kritiska uppgifter först - minskar risk för missade åtgärder",
          "Färgkodning per prioritet: Röd=kritisk, orange=hög, gul=medel, blå=låg - snabb visuell scanning",
          "Tidsestimat synligt: Hjälper schemaläggning av tekniker och verkstadsplatser",
          "Fordonslänkar: Direkt access till full fordonsinformation från underhållsuppgift",
          "Filtreringsmöjlighet: Låter användaren fokusera på specifik prioritetsnivå",
          "Statistik i header: Överblick över arbetsbelastning innan detaljgranskning",
        ]}
        motionDecisions={[
          "Staggered card entrance: Guidar blicken från högsta till lägsta prioritet",
          "Smooth filter transitions: Visuell kontinuitet när data filtreras",
          "Hover-elevation på uppgiftskort: Indikerar interaktivitet",
          "Tab-animering: Tydlig feedback vid filtrering mellan status",
        ]}
      />

      {/* Stats Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-gray-900">{criticalCount}</p>
              <p className="text-sm text-gray-600">Kritiska</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-gray-900">{highCount}</p>
              <p className="text-sm text-gray-600">Hög prioritet</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-gray-900">{scheduledCount}</p>
              <p className="text-sm text-gray-600">Schemalagda</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Wrench className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-gray-900">{inProgressCount}</p>
              <p className="text-sm text-gray-600">Pågående</p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Main Content */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-1">
              Underhållsuppgifter
            </h2>
            <p className="text-sm text-gray-600">
              Hantera och prioritera fordonsservice
            </p>
          </div>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">Alla uppgifter</TabsTrigger>
            <TabsTrigger value="scheduled">Schemalagda</TabsTrigger>
            <TabsTrigger value="in_progress">Pågående</TabsTrigger>
            <TabsTrigger value="completed">Klara</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {/* Priority Filter */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm text-gray-600">Filtrera efter prioritet:</span>
              <Button
                size="sm"
                variant={selectedPriority === "all" ? "default" : "outline"}
                onClick={() => setSelectedPriority("all")}
              >
                Alla
              </Button>
              <Button
                size="sm"
                variant={selectedPriority === "critical" ? "default" : "outline"}
                onClick={() => setSelectedPriority("critical")}
              >
                Kritisk
              </Button>
              <Button
                size="sm"
                variant={selectedPriority === "high" ? "default" : "outline"}
                onClick={() => setSelectedPriority("high")}
              >
                Hög
              </Button>
              <Button
                size="sm"
                variant={selectedPriority === "medium" ? "default" : "outline"}
                onClick={() => setSelectedPriority("medium")}
              >
                Medel
              </Button>
              <Button
                size="sm"
                variant={selectedPriority === "low" ? "default" : "outline"}
                onClick={() => setSelectedPriority("low")}
              >
                Låg
              </Button>
            </div>

            <AnimatePresence mode="popLayout">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-3"
              >
                {filteredTasks.map((task, index) => {
                  const priorityInfo = priorityConfig[task.priority];
                  const PriorityIcon = priorityInfo.icon;
                  const vehicle = vehicles.find((v) => v.id === task.vehicleId);

                  return (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.01 }}
                      className="group"
                    >
                      <Card className="p-5 hover:shadow-lg transition-shadow cursor-pointer">
                        <div className="flex items-start gap-4">
                          {/* Priority Indicator */}
                          <div
                            className={`w-12 h-12 rounded-lg flex items-center justify-center border ${priorityInfo.color}`}
                          >
                            <PriorityIcon className="w-6 h-6" />
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-4 mb-2">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1 flex-wrap">
                                  <Badge className={priorityInfo.color}>
                                    {priorityInfo.label}
                                  </Badge>
                                  <Badge variant={statusConfig[task.status].color as any}>
                                    {statusConfig[task.status].label}
                                  </Badge>
                                  <span className="text-sm text-gray-500">
                                    {task.type === "service" ? "Service" : task.type === "repair" ? "Reparation" : "Inspektion"}
                                  </span>
                                </div>
                                <h3 className="font-semibold text-gray-900 mb-1">
                                  {task.description}
                                </h3>
                              </div>
                              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors flex-shrink-0" />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                              <div className="flex items-center gap-2 text-gray-600">
                                <Wrench className="w-4 h-4" />
                                <Link
                                  to={`/app/vehicle/${task.vehicleId}`}
                                  className="hover:text-blue-600 hover:underline"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  {task.vehicleName}
                                </Link>
                              </div>
                              <div className="flex items-center gap-2 text-gray-600">
                                <Calendar className="w-4 h-4" />
                                <span>{new Date(task.scheduledDate).toLocaleDateString("sv-SE", {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                })}</span>
                              </div>
                              <div className="flex items-center gap-2 text-gray-600">
                                <Clock className="w-4 h-4" />
                                <span>{task.estimatedHours} timmar</span>
                              </div>
                            </div>

                            {/* Vehicle Status */}
                            {vehicle && (
                              <div className="mt-3 pt-3 border-t border-gray-200">
                                <div className="flex items-center gap-4 text-xs text-gray-600">
                                  <span>
                                    Batteri: <span className="font-medium text-gray-900">{vehicle.batteryLevel}%</span>
                                  </span>
                                  <span>
                                    Status: <span className="font-medium text-gray-900 capitalize">{vehicle.status}</span>
                                  </span>
                                  <span>
                                    {vehicle.tripsSinceService} körningar sedan service
                                  </span>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </TabsContent>

          {["scheduled", "in_progress", "completed"].map((status) => (
            <TabsContent key={status} value={status} className="space-y-3">
              {maintenanceTasks
                .filter((task) => task.status === status)
                .map((task, index) => {
                  const priorityInfo = priorityConfig[task.priority];
                  const PriorityIcon = priorityInfo.icon;

                  return (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Card className="p-5 hover:shadow-lg transition-shadow">
                        <div className="flex items-start gap-4">
                          <div
                            className={`w-12 h-12 rounded-lg flex items-center justify-center border ${priorityInfo.color}`}
                          >
                            <PriorityIcon className="w-6 h-6" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge className={priorityInfo.color}>
                                {priorityInfo.label}
                              </Badge>
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-2">
                              {task.description}
                            </h3>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <span>{task.vehicleName}</span>
                              <span>•</span>
                              <span>{new Date(task.scheduledDate).toLocaleDateString("sv-SE")}</span>
                              <span>•</span>
                              <span>{task.estimatedHours} timmar</span>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
            </TabsContent>
          ))}
        </Tabs>
      </Card>

      {/* Service Insights */}
      <Card className="p-6 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-purple-600" />
          <h3 className="font-semibold text-gray-900">Serviceinsikter</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-gray-600 mb-1">Genomsnittlig servicetid</p>
            <p className="text-2xl font-semibold text-gray-900">2.8 timmar</p>
            <p className="text-xs text-green-600 mt-1">↓ 12% från förra månaden</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Förväntad total tid</p>
            <p className="text-2xl font-semibold text-gray-900">
              {maintenanceTasks.reduce((sum, t) => sum + t.estimatedHours, 0)} tim
            </p>
            <p className="text-xs text-gray-500 mt-1">För alla schemalagda uppgifter</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Punktlighet</p>
            <p className="text-2xl font-semibold text-gray-900">96%</p>
            <p className="text-xs text-green-600 mt-1">↑ 3% från förra månaden</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
