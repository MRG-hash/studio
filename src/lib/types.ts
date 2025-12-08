export type PatrolRoute = {
  id: string;
  name: string;
  points: { x: number; y: number; z: number }[];
  createdAt: string;
};

export type MediaFile = {
  id: string;
  name:string;
  type: 'image' | 'video';
  url: string;
  createdAt: string;
  thumbnailUrl: string;
  imageHint: string;
};

export type DroneStatus = {
  battery: number;
  connection: 'excellent' | 'good' | 'weak' | 'disconnected';
  position: {
    lat: number;
    lng: number;
    alt: number;
  };
};

export type UserSettings = {
  streamUrl: string;
  defaultPatrolRoute: string | null;
  alarmSensitivity: 'low' | 'medium' | 'high';
};
