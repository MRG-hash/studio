'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export function PatrolControls() {
  const [isPatrolling, setIsPatrolling] = useState(false);
  const { toast } = useToast();

  const handleTogglePatrol = () => {
    setIsPatrolling(!isPatrolling);
    toast({
      title: `Patrol ${!isPatrolling ? 'Started' : 'Stopped'}`,
      description: `Automated patrol has been ${!isPatrolling ? 'initiated' : 'terminated'}.`,
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Patrol Status</CardTitle>
        <Icons.play className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{isPatrolling ? 'Active' : 'Idle'}</div>
        <Button size="sm" className="mt-1 w-full" onClick={handleTogglePatrol}>
          {isPatrolling ? 'Stop Patrol' : 'Start Patrol'}
        </Button>
      </CardContent>
    </Card>
  );
}
