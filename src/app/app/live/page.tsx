'use client';

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

export default function LiveFeedPage() {
  const liveFeedImage = PlaceHolderImages.find(p => p.id === 'live-feed');
  const { toast } = useToast();
  const [isRecording, setIsRecording] = useState(false);

  const handleCapture = () => {
    toast({
      title: 'Photo Captured',
      description: 'Image has been saved to your media library.',
    });
  };

  const handleRecord = () => {
    setIsRecording(!isRecording);
    toast({
      title: `Recording ${!isRecording ? 'Started' : 'Stopped'}`,
      description: `Video clip has been ${!isRecording ? 'started' : 'saved to your media library'}.`,
    });
  };

  return (
    <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
      <Card className="md:col-span-2 lg:col-span-3">
        <CardHeader>
          <CardTitle>Live Drone Feed</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
            {liveFeedImage ? (
              <Image
                src={liveFeedImage.imageUrl}
                alt="Live drone feed"
                fill
                className="object-cover"
                data-ai-hint={liveFeedImage.imageHint}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-muted">
                <p>Live feed unavailable</p>
              </div>
            )}
             <div className="absolute bottom-2 left-2 rounded-md bg-black/50 px-2 py-1 text-xs text-white backdrop-blur-sm flex items-center gap-1">
              <span>REC</span> <span className='h-2 w-2 rounded-full bg-red-500 animate-pulse'></span>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Controls</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-2">
          <Button onClick={handleCapture}>
            <Icons.camera className="mr-2 h-4 w-4" />
            Capture Photo
          </Button>
          <Button variant={isRecording ? 'destructive' : 'default'} onClick={handleRecord}>
            <Icons.video className="mr-2 h-4 w-4" />
            {isRecording ? 'Stop Recording' : 'Record Clip'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
