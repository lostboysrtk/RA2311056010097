export type NotificationType = 'Result' | 'Placement' | 'Event';

export interface Notification {
  ID: string;
  Type: NotificationType;
  Message: string;
  Timestamp: string;
}

export interface NotificationsResponse {
  notifications: Notification[];
}

export interface PriorityNotification extends Notification {
  Score: number;
}
