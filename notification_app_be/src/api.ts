import { NotificationsResponse } from './types';
import { Log } from 'logging_middleware';

const BASE_URL = 'http://20.207.122.201/evaluation-service';

export async function fetchNotifications(token: string): Promise<NotificationsResponse | null> {
  await Log('backend', 'info', 'service', 'fetching notifications from API');
  try {
    const response = await fetch(`${BASE_URL}/notifications`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      await Log('backend', 'error', 'service', `failed to fetch notifications: ${response.statusText}`);
      return null;
    }

    const data = await response.json() as NotificationsResponse;
    await Log('backend', 'info', 'service', `successfully fetched ${data.notifications.length} notifications`);
    return data;
  } catch (error) {
    await Log('backend', 'error', 'service', `error fetching notifications: ${(error as Error).message}`);
    return null;
  }
}
