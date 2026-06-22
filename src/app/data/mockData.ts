export interface Costs {
  fuel: number;
  salary: number;
  tolls: number;
  ferries: number;
  maintenance: number;
}

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
  costs: Costs;
  revenue: number;
  margin: number;
}

export interface Alert {
  id: string;
  type: "warning" | "critical" | "info";
  message: string;
  timestamp: string;
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
  salaryRate: number;
  marginContribution: number;
}

export interface Shipment {
  id: string;
  customerName: string;
  route: string;
  vehicleId: string;
  driverId: string;
  status: "completed" | "in_transit" | "delayed";
  revenue: number;
  cost: number;
  profit: number;
  margin: number;
  delayMinutes: number;
}

export interface Customer {
  id: string;
  name: string;
  revenue: number;
  cost: number;
  profit: number;
  margin: number;
  delayRate: number; // % of shipments delayed
  waitingTimeOver90: number; // % of shipments with waiting time > 90min
  emptyMileage: number; // % of miles running empty
  fuelDeviation: number; // fuel cost compared to average %
  primaryRoute: string;
}

export const customers: Customer[] = [
  {
    id: "CUST-A",
    name: "Customer A AB",
    revenue: 500000,
    cost: 470000,
    profit: 30000,
    margin: 6,
    delayRate: 28,
    waitingTimeOver90: 38,
    emptyMileage: 22,
    fuelDeviation: 17,
    primaryRoute: "Göteborg–Oslo",
  },
  {
    id: "CUST-B",
    name: "Nordic Retail Group",
    revenue: 1200000,
    cost: 984000,
    profit: 216000,
    margin: 18,
    delayRate: 8,
    waitingTimeOver90: 12,
    emptyMileage: 8,
    fuelDeviation: -2,
    primaryRoute: "Stockholm–Göteborg",
  },
  {
    id: "CUST-C",
    name: "Scandic Logistics",
    revenue: 750000,
    cost: 720000,
    profit: 30000,
    margin: 4,
    delayRate: 35,
    waitingTimeOver90: 45,
    emptyMileage: 31,
    fuelDeviation: 14,
    primaryRoute: "Malmö–Köpenhamn",
  },
];

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
    revenue: 250000,
    margin: 14.8,
    costs: {
      fuel: 48000,
      salary: 110000,
      tolls: 35000,
      ferries: 10000,
      maintenance: 10000,
    },
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
    revenue: 180000,
    margin: 12.2,
    costs: {
      fuel: 32000,
      salary: 95000,
      tolls: 15000,
      ferries: 6000,
      maintenance: 10000,
    },
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
        message: "Höga servicekostnader (+42%) & tomgång (+31%)",
        timestamp: "10:45",
      },
    ],
    revenue: 290000,
    margin: -4.5,
    costs: {
      fuel: 75000,
      salary: 130000,
      tolls: 50000,
      ferries: 25000,
      maintenance: 23000,
    },
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
    revenue: 150000,
    margin: 8.5,
    costs: {
      fuel: 30000,
      salary: 80000,
      tolls: 15000,
      ferries: 4000,
      maintenance: 8250,
    },
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
    revenue: 160000,
    margin: 15.0,
    costs: {
      fuel: 26000,
      salary: 82000,
      tolls: 18000,
      ferries: 2000,
      maintenance: 8000,
    },
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
    revenue: 210000,
    margin: 11.4,
    costs: {
      fuel: 42000,
      salary: 105000,
      tolls: 24000,
      ferries: 5000,
      maintenance: 10000,
    },
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
    revenue: 140000,
    margin: 16.4,
    costs: {
      fuel: 21000,
      salary: 76000,
      tolls: 12000,
      ferries: 1000,
      maintenance: 7000,
    },
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
    salaryRate: 350,
    marginContribution: 14.8,
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
    salaryRate: 330,
    marginContribution: 12.2,
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
    salaryRate: 380,
    marginContribution: -4.5,
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
    salaryRate: 320,
    marginContribution: 8.5,
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
    salaryRate: 340,
    marginContribution: 15.0,
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
    salaryRate: 340,
    marginContribution: 11.4,
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
    salaryRate: 310,
    marginContribution: 16.4,
  },
];

export const shipments: Shipment[] = [
  {
    id: "SH-1021",
    customerName: "Customer A AB",
    route: "Göteborg–Oslo",
    vehicleId: "VLV-001",
    driverId: "D001",
    status: "completed",
    revenue: 55000,
    cost: 49000,
    profit: 6000,
    margin: 10.9,
    delayMinutes: 120,
  },
  {
    id: "SH-1022",
    customerName: "Nordic Retail Group",
    route: "Stockholm–Göteborg",
    vehicleId: "VLV-002",
    driverId: "D002",
    status: "completed",
    revenue: 42000,
    cost: 35000,
    profit: 7000,
    margin: 16.6,
    delayMinutes: 15,
  },
  {
    id: "SH-1023",
    customerName: "Customer A AB",
    route: "Göteborg–Oslo",
    vehicleId: "VLV-003",
    driverId: "D003",
    status: "delayed",
    revenue: 58000,
    cost: 62000,
    profit: -4000,
    margin: -6.9,
    delayMinutes: 210,
  },
];

export const fleetStats = {
  totalVehicles: vehicles.length,
  activeVehicles: vehicles.filter((v) => v.status === "active").length,
  totalRevenue: vehicles.reduce((sum, v) => sum + v.revenue, 0),
  totalCosts: vehicles.reduce(
    (sum, v) =>
      sum +
      v.costs.fuel +
      v.costs.salary +
      v.costs.tolls +
      v.costs.ferries +
      v.costs.maintenance,
    0
  ),
  averageMargin: Math.round(
    (vehicles.reduce((sum, v) => sum + v.margin, 0) / vehicles.length) * 10
  ) / 10,
  unprofitableCount: customers.filter((c) => c.margin < 10).length,
  totalAlerts: vehicles.reduce((sum, v) => sum + v.alerts.length, 0),
};

export const batteryHistoryData = [
  { time: "00:00", level: 92 },
  { time: "04:00", level: 88 },
  { time: "08:00", level: 76 },
  { time: "12:00", level: 62 },
  { time: "16:00", level: 48 },
  { time: "20:00", level: 71 },
  { time: "Nu", level: 87 },
];

export const profitHistoryData = [
  { month: "Jan", revenue: 950000, cost: 820000, profit: 130000 },
  { month: "Feb", revenue: 1020000, cost: 860000, profit: 160000 },
  { month: "Mar", revenue: 1100000, cost: 940000, profit: 160000 },
  { month: "Apr", revenue: 1150000, cost: 980000, profit: 170000 },
  { month: "Maj", revenue: 1250000, cost: 1080000, profit: 170000 },
  { month: "Jun", revenue: 1380000, cost: 1150000, profit: 230000 },
];

export const marginHistoryData = [
  { month: "Jan", margin: 13.6 },
  { month: "Feb", margin: 15.7 },
  { month: "Mar", margin: 14.5 },
  { month: "Apr", margin: 14.8 },
  { month: "Maj", margin: 13.6 },
  { month: "Jun", margin: 16.7 },
];
