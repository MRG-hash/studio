import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Icons } from '@/components/icons';
import { Badge } from '../ui/badge';

export function GpsStatus() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">GPS Signal</CardTitle>
        <Icons.gps className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">Locked</div>
        <p className="text-xs text-muted-foreground">12 Satellites</p>
      </CardContent>
    </Card>
  );
}
