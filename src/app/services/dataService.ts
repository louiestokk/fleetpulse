import {
  vehicles as initialVehicles,
  drivers as initialDrivers,
  shipments as initialShipments,
  customers as initialCustomers,
  Vehicle,
  Driver,
  Shipment,
  Customer
} from "../data/mockData";

export interface Integration {
  id: string;
  name: string;
  type: "telematics" | "erp" | "tms";
  status: "connected" | "disconnected";
  logo: string;
  lastSync?: string;
  syncRate: number;
}

const initialIntegrations: Integration[] = [
  { id: "samsara", name: "Samsara Telematics", type: "telematics", status: "connected", logo: "S", lastSync: "2 min sedan", syncRate: 98 },
  { id: "fortnox", name: "Fortnox ERP", type: "erp", status: "connected", logo: "F", lastSync: "5 min sedan", syncRate: 85 },
  { id: "volvo", name: "Volvo Connect", type: "telematics", status: "connected", logo: "V", lastSync: "1 min sedan", syncRate: 92 },
  { id: "geotab", name: "Geotab", type: "telematics", status: "disconnected", logo: "G", syncRate: 0 },
  { id: "sap", name: "SAP Business Suite", type: "erp", status: "disconnected", logo: "S", syncRate: 0 },
  { id: "scania", name: "Scania Fleet Management", type: "telematics", status: "disconnected", logo: "S", syncRate: 0 }
];

function getStored<T>(key: string, fallback: T): T {
  const val = localStorage.getItem(key);
  if (!val) {
    localStorage.setItem(key, JSON.stringify(fallback));
    return fallback;
  }
  try {
    return JSON.parse(val);
  } catch {
    return fallback;
  }
}

function setStored<T>(key: string, data: T): void {
  localStorage.setItem(key, JSON.stringify(data));
}

export const dataService = {
  getVehicles(): Vehicle[] {
    return getStored("fleetpulse_vehicles", initialVehicles);
  },
  saveVehicles(data: Vehicle[]): void {
    setStored("fleetpulse_vehicles", data);
  },
  getDrivers(): Driver[] {
    return getStored("fleetpulse_drivers", initialDrivers);
  },
  saveDrivers(data: Driver[]): void {
    setStored("fleetpulse_drivers", data);
  },
  getShipments(): Shipment[] {
    return getStored("fleetpulse_shipments", initialShipments);
  },
  saveShipments(data: Shipment[]): void {
    setStored("fleetpulse_shipments", data);
  },
  getCustomers(): Customer[] {
    return getStored("fleetpulse_customers", initialCustomers);
  },
  saveCustomers(data: Customer[]): void {
    setStored("fleetpulse_customers", data);
  },
  getIntegrations(): Integration[] {
    return getStored("fleetpulse_integrations", initialIntegrations);
  },
  saveIntegrations(data: Integration[]): void {
    setStored("fleetpulse_integrations", data);
  },
  toggleIntegration(id: string): Integration[] {
    const list = this.getIntegrations();
    const updated = list.map(item => {
      if (item.id === id) {
        const isConnecting = item.status === "disconnected";
        return {
          ...item,
          status: isConnecting ? "connected" : "disconnected",
          lastSync: isConnecting ? "Just nu" : undefined,
          syncRate: isConnecting ? Math.floor(Math.random() * 15) + 85 : 0
        };
      }
      return item;
    });
    this.saveIntegrations(updated);
    return updated;
  }
};
