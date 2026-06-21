export interface Vehicle {
  id: string;
  name: string;
  type: "truck" | "van" | "bus";
  status: "active" | "idle" | "charging" | "maintenance" | "warning";
  batteryLevel: number;
  location: string;
  coordinates: { lat: number; lng: number };
  speed: number;
  temperature: number;
  range: number;
  driver: string;
  lastUpdate: string;
  efficiency: number;
  tripsSinceService: number;
  nextServiceIn: number;
  alerts: Alert[];
}

export interface Alert {
  id: string;
  type: "warning" | "critical" | "info";
  message: string;
  timestamp: string;
}

export interface MaintenanceTask {
  id: string;
  vehicleId: string;
  vehicleName: string;
  type: "service" | "repair" | "inspection";
  priority: "low" | "medium" | "high" | "critical";
  description: string;
  scheduledDate: string;
  estimatedHours: number;
  status: "scheduled" | "in_progress" | "completed";
}

export interface Driver {
  id: string;
  name: string;
  vehicleId: string;
  efficiency: number;
  safetyScore: number;
  totalDistance: number;
  averageSpeed: number;
  harshBraking: number;
  harshAcceleration: number;
  idleTime: number;
}

export const vehicles: Vehicle[] = [
  {
    id: "VLV-001",
    name: "Volvo FE Electric",
    type: "truck",
    status: "active",
    batteryLevel: 87,
    location: "Göteborg",
    coordinates: { lat: 57.7089, lng: 11.9746 },
    speed: 65,
    temperature: 22,
    range: 174,
    driver: "Erik Andersson",
    lastUpdate: "2 min sedan",
    efficiency: 94,
    tripsSinceService: 142,
    nextServiceIn: 58,
    alerts: [],
  },
  {
    id: "VLV-002",
    name: "Volvo FL Electric",
    type: "truck",
    status: "charging",
    batteryLevel: 45,
    location: "Stockholm",
    coordinates: { lat: 59.3293, lng: 18.0686 },
    speed: 0,
    temperature: 18,
    range: 90,
    driver: "Anna Svensson",
    lastUpdate: "5 min sedan",
    efficiency: 91,
    tripsSinceService: 89,
    nextServiceIn: 111,
    alerts: [
      {
        id: "a1",
        type: "info",
        message: "Laddning pågår - 85% klar",
        timestamp: "10:23",
      },
    ],
  },
  {
    id: "VLV-003",
    name: "Volvo FMX Electric",
    type: "truck",
    status: "warning",
    batteryLevel: 23,
    location: "Malmö",
    coordinates: { lat: 55.6050, lng: 13.0038 },
    speed: 52,
    temperature: 28,
    range: 46,
    driver: "Lars Johansson",
    lastUpdate: "1 min sedan",
    efficiency: 76,
    tripsSinceService: 187,
    nextServiceIn: 13,
    alerts: [
      {
        id: "a2",
        type: "warning",
        message: "Låg batterinivå - planera laddning",
        timestamp: "10:45",
      },
      {
        id: "a3",
        type: "warning",
        message: "Hög temperatur i batteripaket",
        timestamp: "10:42",
      },
    ],
  },
  {
    id: "VLV-004",
    name: "Volvo FE Electric",
    type: "truck",
    status: "idle",
    batteryLevel: 92,
    location: "Uppsala",
    coordinates: { lat: 59.8586, lng: 17.6389 },
    speed: 0,
    temperature: 20,
    range: 184,
    driver: "Maria Nilsson",
    lastUpdate: "12 min sedan",
    efficiency: 88,
    tripsSinceService: 56,
    nextServiceIn: 144,
    alerts: [],
  },
  {
    id: "VLV-005",
    name: "Volvo FL Electric",
    type: "van",
    status: "active",
    batteryLevel: 68,
    location: "Linköping",
    coordinates: { lat: 58.4108, lng: 15.6214 },
    speed: 78,
    temperature: 21,
    range: 136,
    driver: "Johan Berg",
    lastUpdate: "1 min sedan",
    efficiency: 92,
    tripsSinceService: 103,
    nextServiceIn: 97,
    alerts: [],
  },
  {
    id: "VLV-006",
    name: "Volvo FMX Electric",
    type: "truck",
    status: "maintenance",
    batteryLevel: 0,
    location: "Service Center",
    coordinates: { lat: 57.7089, lng: 11.9746 },
    speed: 0,
    temperature: 19,
    range: 0,
    driver: "-",
    lastUpdate: "2 tim sedan",
    efficiency: 0,
    tripsSinceService: 200,
    nextServiceIn: 0,
    alerts: [
      {
        id: "a4",
        type: "critical",
        message: "Planerat underhåll pågår",
        timestamp: "08:00",
      },
    ],
  },
  {
    id: "VLV-007",
    name: "Volvo FE Electric",
    type: "truck",
    status: "active",
    batteryLevel: 55,
    location: "Örebro",
    coordinates: { lat: 59.2753, lng: 15.2134 },
    speed: 61,
    temperature: 23,
    range: 110,
    driver: "Sofia Lundqvist",
    lastUpdate: "3 min sedan",
    efficiency: 89,
    tripsSinceService: 78,
    nextServiceIn: 122,
    alerts: [],
  },
  {
    id: "VLV-008",
    name: "Volvo FL Electric",
    type: "van",
    status: "idle",
    batteryLevel: 81,
    location: "Helsingborg",
    coordinates: { lat: 56.0465, lng: 12.6945 },
    speed: 0,
    temperature: 19,
    range: 162,
    driver: "Per Gustafsson",
    lastUpdate: "8 min sedan",
    efficiency: 93,
    tripsSinceService: 45,
    nextServiceIn: 155,
    alerts: [],
  },
];

export const maintenanceTasks: MaintenanceTask[] = [
  {
    id: "M001",
    vehicleId: "VLV-006",
    vehicleName: "Volvo FMX Electric",
    type: "service",
    priority: "critical",
    description: "Planerat 20 000 km underhåll - batterikontroll och mjukvaruuppdatering",
    scheduledDate: "2026-06-20",
    estimatedHours: 4,
    status: "in_progress",
  },
  {
    id: "M002",
    vehicleId: "VLV-003",
    vehicleName: "Volvo FMX Electric",
    type: "inspection",
    priority: "high",
    description: "Batteritemperaturvarning - kräver diagnostik",
    scheduledDate: "2026-06-21",
    estimatedHours: 2,
    status: "scheduled",
  },
  {
    id: "M003",
    vehicleId: "VLV-003",
    vehicleName: "Volvo FMX Electric",
    type: "service",
    priority: "high",
    description: "Planerat service inom 13 körningar",
    scheduledDate: "2026-06-23",
    estimatedHours: 3,
    status: "scheduled",
  },
  {
    id: "M004",
    vehicleId: "VLV-002",
    vehicleName: "Volvo FL Electric",
    type: "inspection",
    priority: "medium",
    description: "Bromskontroll och däckmönster",
    scheduledDate: "2026-06-25",
    estimatedHours: 1.5,
    status: "scheduled",
  },
  {
    id: "M005",
    vehicleId: "VLV-007",
    vehicleName: "Volvo FE Electric",
    type: "service",
    priority: "medium",
    description: "15 000 km service - filter och vätskor",
    scheduledDate: "2026-06-27",
    estimatedHours: 3,
    status: "scheduled",
  },
  {
    id: "M006",
    vehicleId: "VLV-001",
    vehicleName: "Volvo FE Electric",
    type: "inspection",
    priority: "low",
    description: "Rutinkontroll av elektriska system",
    scheduledDate: "2026-07-01",
    estimatedHours: 1,
    status: "scheduled",
  },
];

export const drivers: Driver[] = [
  {
    id: "D001",
    name: "Erik Andersson",
    vehicleId: "VLV-001",
    efficiency: 94,
    safetyScore: 96,
    totalDistance: 4280,
    averageSpeed: 62,
    harshBraking: 3,
    harshAcceleration: 5,
    idleTime: 12,
  },
  {
    id: "D002",
    name: "Anna Svensson",
    vehicleId: "VLV-002",
    efficiency: 91,
    safetyScore: 92,
    totalDistance: 3560,
    averageSpeed: 58,
    harshBraking: 7,
    harshAcceleration: 8,
    idleTime: 18,
  },
  {
    id: "D003",
    name: "Lars Johansson",
    vehicleId: "VLV-003",
    efficiency: 76,
    safetyScore: 78,
    totalDistance: 5120,
    averageSpeed: 68,
    harshBraking: 24,
    harshAcceleration: 31,
    idleTime: 45,
  },
  {
    id: "D004",
    name: "Maria Nilsson",
    vehicleId: "VLV-004",
    efficiency: 88,
    safetyScore: 94,
    totalDistance: 2890,
    averageSpeed: 55,
    harshBraking: 4,
    harshAcceleration: 6,
    idleTime: 15,
  },
  {
    id: "D005",
    name: "Johan Berg",
    vehicleId: "VLV-005",
    efficiency: 92,
    safetyScore: 95,
    totalDistance: 3940,
    averageSpeed: 64,
    harshBraking: 5,
    harshAcceleration: 4,
    idleTime: 10,
  },
  {
    id: "D006",
    name: "Sofia Lundqvist",
    vehicleId: "VLV-007",
    efficiency: 89,
    safetyScore: 90,
    totalDistance: 3210,
    averageSpeed: 60,
    harshBraking: 9,
    harshAcceleration: 11,
    idleTime: 22,
  },
  {
    id: "D007",
    name: "Per Gustafsson",
    vehicleId: "VLV-008",
    efficiency: 93,
    safetyScore: 97,
    totalDistance: 2450,
    averageSpeed: 56,
    harshBraking: 2,
    harshAcceleration: 3,
    idleTime: 8,
  },
];

export const fleetStats = {
  totalVehicles: vehicles.length,
  activeVehicles: vehicles.filter((v) => v.status === "active").length,
  chargingVehicles: vehicles.filter((v) => v.status === "charging").length,
  maintenanceVehicles: vehicles.filter((v) => v.status === "maintenance").length,
  averageBattery: Math.round(
    vehicles.reduce((sum, v) => sum + v.batteryLevel, 0) / vehicles.length
  ),
  totalAlerts: vehicles.reduce((sum, v) => sum + v.alerts.length, 0),
  averageEfficiency: Math.round(
    vehicles
      .filter((v) => v.efficiency > 0)
      .reduce((sum, v) => sum + v.efficiency, 0) /
      vehicles.filter((v) => v.efficiency > 0).length
  ),
};

// Historical data for charts
export const batteryHistoryData = [
  { time: "00:00", level: 92 },
  { time: "04:00", level: 88 },
  { time: "08:00", level: 76 },
  { time: "12:00", level: 62 },
  { time: "16:00", level: 48 },
  { time: "20:00", level: 71 },
  { time: "Nu", level: 87 },
];

export const efficiencyData = [
  { month: "Jan", efficiency: 88 },
  { month: "Feb", efficiency: 91 },
  { month: "Mar", efficiency: 89 },
  { month: "Apr", efficiency: 92 },
  { month: "Maj", efficiency: 90 },
  { month: "Jun", efficiency: 91 },
];

export const energyConsumptionData = [
  { day: "Mån", consumption: 1240 },
  { day: "Tis", consumption: 1180 },
  { day: "Ons", consumption: 1320 },
  { day: "Tor", consumption: 1290 },
  { day: "Fre", consumption: 1150 },
  { day: "Lör", consumption: 890 },
  { day: "Sön", consumption: 720 },
];
