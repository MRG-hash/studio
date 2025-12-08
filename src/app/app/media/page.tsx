'use client';

import Image from 'next/image';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { mockMedia } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

export default function MediaPage() {
  const { toast } = useToast();

  const handleDownload = (fileName: string) => {
    toast({
      title: 'Downloading...',
      description: `Preparing to download ${fileName}.`,
    });
  };

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {mockMedia.map((file) => (
        <Card key={file.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="relative aspect-video w-full">
              <Image
                src={file.thumbnailUrl}
                alt={file.name}
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
                data-ai-hint={file.imageHint}
              />
              <Badge
                variant="secondary"
                className="absolute right-2 top-2 capitalize"
              >
                {file.type === 'video' && <Icons.video className='mr-1.5 h-3 w-3'/>}
                {file.type}
              </Badge>
            </div>
            <div className="p-4">
              <h3 className="font-semibold truncate">{file.name}</h3>
              <p className="text-sm text-muted-foreground">
                {new Date(file.createdAt).toLocaleString()}
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex gap-2 p-4 pt-0">
            <Button size="sm" variant="outline" className="w-full">
              <Icons.view className="mr-2 h-4 w-4" /> View
            </Button>
            <Button size="sm" className="w-full" onClick={() => handleDownload(file.name)}>
              <Icons.download className="mr-2 h-4 w-4" /> Download
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
