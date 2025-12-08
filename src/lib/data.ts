import { PatrolRoute, MediaFile } from '@/lib/types';
import { PlaceHolderImages } from './placeholder-images';

export const mockRoutes: PatrolRoute[] = [
  {
    id: 'route-1',
    name: 'Perimeter Sweep',
    points: [
      { x: 0, y: 0, z: 10 },
      { x: 100, y: 0, z: 10 },
      { x: 100, y: 100, z: 10 },
      { x: 0, y: 100, z: 10 },
      { x: 0, y: 0, z: 10 },
    ],
    createdAt: '2023-10-26T10:00:00Z',
  },
  {
    id: 'route-2',
    name: 'Backyard Patrol',
    points: [
      { x: 20, y: 20, z: 5 },
      { x: 80, y: 20, z: 5 },
      { x: 80, y: 80, z: 5 },
      { x: 20, y: 80, z: 5 },
      { x: 20, y: 20, z: 5 },
    ],
    createdAt: '2023-10-25T14:30:00Z',
  },
  {
    id: 'route-3',
    name: 'Full Property Overview',
    points: [
      { x: -50, y: -50, z: 20 },
      { x: 150, y: -50, z: 20 },
      { x: 150, y: 150, z: 20 },
      { x: -50, y: 150, z: 20 },
      { x: -50, y: -50, z: 20 },
    ],
    createdAt: '2023-10-24T09:00:00Z',
  },
];

const mediaPlaceholders = PlaceHolderImages.filter(p => p.id.startsWith('media-'));

export const mockMedia: MediaFile[] = [
  {
    id: 'media-1',
    name: 'Backyard Still',
    type: 'image',
    url: mediaPlaceholders[0].imageUrl,
    thumbnailUrl: mediaPlaceholders[0].imageUrl,
    imageHint: mediaPlaceholders[0].imageHint,
    createdAt: '2023-10-26T11:05:00Z',
  },
  {
    id: 'media-2',
    name: 'Front Porch',
    type: 'image',
    url: mediaPlaceholders[1].imageUrl,
    thumbnailUrl: mediaPlaceholders[1].imageUrl,
    imageHint: mediaPlaceholders[1].imageHint,
    createdAt: '2023-10-26T11:02:00Z',
  },
  {
    id: 'media-3',
    name: 'Rooftop View',
    type: 'image',
    url: mediaPlaceholders[2].imageUrl,
    thumbnailUrl: mediaPlaceholders[2].imageUrl,
    imageHint: mediaPlaceholders[2].imageHint,
    createdAt: '2023-10-25T15:15:00Z',
  },
  {
    id: 'media-4',
    name: 'Driveway Clip',
    type: 'video',
    url: mediaPlaceholders[4].imageUrl,
    thumbnailUrl: mediaPlaceholders[4].imageUrl,
    imageHint: mediaPlaceholders[4].imageHint,
    createdAt: '2023-10-25T15:10:00Z',
  },
  {
    id: 'media-5',
    name: 'Side Yard Scan',
    type: 'image',
    url: mediaPlaceholders[3].imageUrl,
    thumbnailUrl: mediaPlaceholders[3].imageUrl,
    imageHint: mediaPlaceholders[3].imageHint,
    createdAt: '2023-10-24T09:20:00Z',
  },
  {
    id: 'media-6',
    name: 'Pool Area Night',
    type: 'video',
    url: mediaPlaceholders[5].imageUrl,
    thumbnailUrl: mediaPlaceholders[5].imageUrl,
    imageHint: mediaPlaceholders[5].imageHint,
    createdAt: '2023-10-24T09:25:00Z',
  },
];
