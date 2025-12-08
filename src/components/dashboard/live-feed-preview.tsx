import Link from 'next/link';
import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Icons } from '../icons';

export function LiveFeedPreview() {
  const liveFeedImage = PlaceHolderImages.find(p => p.id === 'live-feed');

  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Live Camera Feed</CardTitle>
        </div>
        <Button asChild size="sm" className="ml-auto gap-1">
          <Link href="/app/live">
            Full View
            <Icons.chevronRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative aspect-video w-full">
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
          <div className="absolute bottom-2 left-2 rounded-md bg-black/50 px-2 py-1 text-xs text-white backdrop-blur-sm">
            REC 🔴
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
