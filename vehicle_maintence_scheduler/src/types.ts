export interface Depot {
  ID: number;
  MechanicHours: number;
}

export interface Vehicle {
  TaskID: string;
  Duration: number;
  Impact: number;
}

export interface DepotResponse {
  depots: Depot[];
}

export interface VehicleResponse {
  vehicles: Vehicle[];
}

export interface KnapsackResult {
  depotID: number;
  selectedTasks: string[];
  totalImpact: number;
  totalDuration: number;
}
