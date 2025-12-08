import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';

const activities = [
  { event: 'Patrol Started', route: 'Perimeter Sweep', time: '2 minutes ago', status: 'info' },
  { event: 'Motion Detected', area: 'Backyard', time: '5 minutes ago', status: 'warning' },
  { event: 'Patrol Completed', route: 'Backyard Patrol', time: '1 hour ago', status: 'success' },
  { event: 'Low Battery Alert', level: '15%', time: '2 hours ago', status: 'error' },
  { event: 'Firmware Update', version: 'v1.2.3', time: '1 day ago', status: 'info' },
  { event: 'Connection Lost', area: 'Zone 4', time: '1 day ago', status: 'error' },
  { event: 'Patrol Completed', route: 'Perimeter Sweep', time: '1 day ago', status: 'success' },
];

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>A log of recent drone events and alerts.</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96">
          <div className="space-y-4">
            {activities.map((activity, index) => (
              <div key={index} className="space-y-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{activity.event}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
                {activity.route && <p className="text-sm text-muted-foreground">Route: {activity.route}</p>}
                {activity.area && <p className="text-sm text-muted-foreground">Area: {activity.area}</p>}
                {activity.level && <p className="text-sm text-muted-foreground">Level: {activity.level}</p>}
                {activity.version && <p className="text-sm text-muted-foreground">Version: {activity.version}</p>}
                {index < activities.length - 1 && <Separator className='mt-2' />}
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
