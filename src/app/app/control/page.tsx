'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const controlKeys = {
  'w': 'Forward', 's': 'Back', 'a': 'Left', 'd': 'Right',
  'q': 'Rotate Left', 'e': 'Rotate Right',
  'r': 'Up', 'f': 'Down'
};

const controls = [
  { command: 'Rotate Left', icon: Icons.rotateLeft, key: 'Q' },
  { command: 'Up', icon: Icons.chevronUp, key: 'R' },
  { command: 'Rotate Right', icon: Icons.rotateRight, key: 'E' },
  { command: 'Forward', icon: Icons.chevronUp, key: 'W' },
  { command: 'Left', icon: Icons.chevronLeft, key: 'A' },
  { command: 'Back', icon: Icons.chevronDown, key: 'S' },
  { command: 'Right', icon: Icons.chevronRight, key: 'D' },
  { command: 'Down', icon: Icons.chevronDown, key: 'F' },
];

export default function ControlPage() {
  const liveFeedImage = PlaceHolderImages.find(p => p.id === 'live-feed');
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const { toast } = useToast();

  const sendCommand = useCallback((command: string) => {
    console.log(`Sending command: ${command}`);
    toast({ title: 'Command Sent', description: command });
  }, [toast]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      if (key in controlKeys) {
        setActiveKey(key);
        sendCommand(controlKeys[key as keyof typeof controlKeys]);
      }
    };
    const handleKeyUp = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      if (key in controlKeys) {
        setActiveKey(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [sendCommand]);

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Manual Control</CardTitle>
          <CardDescription>Use your keyboard (WASD) or click the buttons to fly the drone.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 grid-rows-3 gap-2 max-w-[250px] mx-auto">
            {/* Top row */}
            <ControlButton command="Rotate Left" activeKey={activeKey} onCommand={sendCommand} />
            <ControlButton command="Forward" activeKey={activeKey} onCommand={sendCommand} />
            <ControlButton command="Rotate Right" activeKey={activeKey} onCommand={sendCommand} />
            {/* Middle row */}
            <ControlButton command="Left" activeKey={activeKey} onCommand={sendCommand} />
            <div/>
            <ControlButton command="Right" activeKey={activeKey} onCommand={sendCommand} />
            {/* Bottom row */}
            <ControlButton command="Up" activeKey={activeKey} onCommand={sendCommand} />
            <ControlButton command="Back" activeKey={activeKey} onCommand={sendCommand} />
            <ControlButton command="Down" activeKey={activeKey} onCommand={sendCommand} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Live Feed</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
            {liveFeedImage ? (
              <Image src={liveFeedImage.imageUrl} alt="Live drone feed" layout="fill" objectFit="cover" data-ai-hint={liveFeedImage.imageHint} />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-muted"><p>Live feed unavailable</p></div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ControlButton({ command, activeKey, onCommand }: { command: string, activeKey: string | null, onCommand: (cmd: string) => void }) {
  const control = controls.find(c => c.command === command);
  if (!control) return null;
  const key = control.key.toLowerCase();
  const isActive = activeKey === key;

  return (
    <Button
      variant={isActive ? 'default' : 'outline'}
      className={cn("h-20 w-20 flex-col gap-1 text-xs", isActive && "ring-2 ring-primary ring-offset-2")}
      onMouseDown={() => onCommand(command)}
    >
      <control.icon className="h-6 w-6" />
      <span>{command}</span>
      <span className="font-mono text-muted-foreground">({control.key})</span>
    </Button>
  );
}
