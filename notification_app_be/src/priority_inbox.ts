import { Notification, PriorityNotification } from './types';
import { Log } from 'logging_middleware';

function getWeight(type: Notification['Type']): number {
  switch (type) {
    case 'Placement':
      return 3;
    case 'Result':
      return 2;
    case 'Event':
      return 1;
    default:
      return 0;
  }
}

export async function processPriorityInbox(notifications: Notification[]): Promise<PriorityNotification[]> {
  await Log('backend', 'info', 'service', 'processing priority inbox');
  
  const scoredNotifications: PriorityNotification[] = notifications.map(notif => {
    const timestampMillis = new Date(notif.Timestamp).getTime();
    
    const weight = getWeight(notif.Type);
    const score = (weight * 10000000000000) + timestampMillis;

    return {
      ...notif,
      Score: score
    };
  });

  scoredNotifications.sort((a, b) => b.Score - a.Score);

  const top10 = scoredNotifications.slice(0, 10);
  await Log('backend', 'info', 'service', `successfully computed top ${top10.length} priority notifications`);
  
  return top10;
}
