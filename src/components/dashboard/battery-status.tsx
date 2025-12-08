'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Icons } from '@/components/icons';
import { useEffect, useState } from 'react';

export function BatteryStatus() {
  const [battery, setBattery] = useState(88);

  useEffect(() => {
    const interval = setInterval(() => {
      setBattery(prev => (prev > 5 ? prev - 1 : 100));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Battery</CardTitle>
        <Icons.battery className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{battery}%</div>
        <Progress value={battery} className="mt-2 h-2" />
      </CardContent>
    </Card>
  );
}
