import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Icons } from '@/components/icons';

export function ConnectionStatus() {
  const connectionStrength = 'Excellent';
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Connection</CardTitle>
        <Icons.connection className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{connectionStrength}</div>
        <p className="text-xs text-muted-foreground">2.4 GHz WiFi</p>
      </CardContent>
    </Card>
  );
}
