import { DepotResponse, VehicleResponse } from './types';
import { Log } from 'logging_middleware';

const BASE_URL = 'http://20.207.122.201/evaluation-service';

export async function fetchDepots(token: string): Promise<DepotResponse | null> {
  await Log('backend', 'info', 'service', 'fetching depots from API');
  try {
    const response = await fetch(`${BASE_URL}/depots`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      await Log('backend', 'error', 'service', `failed to fetch depots: ${response.statusText}`);
      return null;
    }

    const data = await response.json() as DepotResponse;
    await Log('backend', 'info', 'service', `successfully fetched ${data.depots.length} depots`);
    return data;
  } catch (error) {
    await Log('backend', 'error', 'service', `error fetching depots: ${(error as Error).message}`);
    return null;
  }
}

export async function fetchVehicles(token: string): Promise<VehicleResponse | null> {
  await Log('backend', 'info', 'service', 'fetching vehicles from API');
  try {
    const response = await fetch(`${BASE_URL}/vehicles`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      await Log('backend', 'error', 'service', `failed to fetch vehicles: ${response.statusText}`);
      return null;
    }

    const data = await response.json() as VehicleResponse;
    await Log('backend', 'info', 'service', `successfully fetched ${data.vehicles.length} vehicles`);
    return data;
  } catch (error) {
    await Log('backend', 'error', 'service', `error fetching vehicles: ${(error as Error).message}`);
    return null;
  }
}
