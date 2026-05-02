import { Vehicle, Depot, KnapsackResult } from './types';
import { Log } from 'logging_middleware';

export async function optimizeDepotTasks(depot: Depot, vehicles: Vehicle[]): Promise<KnapsackResult> {
  await Log('backend', 'info', 'service', `starting knapsack optimization for depot ${depot.ID} with capacity ${depot.MechanicHours}`);
  
  const n = vehicles.length;
  const capacity = depot.MechanicHours;

  const dp: number[][] = Array.from({ length: n + 1 }, () => Array(capacity + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    const weight = vehicles[i - 1].Duration;
    const value = vehicles[i - 1].Impact;
    for (let w = 0; w <= capacity; w++) {
      if (weight <= w) {
        dp[i][w] = Math.max(dp[i - 1][w], dp[i - 1][w - weight] + value);
      } else {
        dp[i][w] = dp[i - 1][w];
      }
    }
  }

  let res = dp[n][capacity];
  let w = capacity;
  const selectedTasks: string[] = [];
  let totalDuration = 0;

  for (let i = n; i > 0 && res > 0; i--) {
    if (res === dp[i - 1][w]) {
      continue;
    } else {
      selectedTasks.push(vehicles[i - 1].TaskID);
      totalDuration += vehicles[i - 1].Duration;
      res -= vehicles[i - 1].Impact;
      w -= vehicles[i - 1].Duration;
    }
  }

  await Log('backend', 'info', 'service', `completed optimization for depot ${depot.ID}`);

  return {
    depotID: depot.ID,
    selectedTasks,
    totalImpact: dp[n][capacity],
    totalDuration
  };
}
