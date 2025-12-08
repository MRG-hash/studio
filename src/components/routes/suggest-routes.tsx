'use client';

import { useState } from 'react';
import { suggestPatrolRoutes, SuggestPatrolRoutesOutput } from '@/ai/flows/suggest-patrol-routes';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '../ui/skeleton';
import { Badge } from '../ui/badge';

const formSchema = z.object({
  areaDescription: z.string().min(20, { message: 'Please provide a more detailed description (at least 20 characters).' }),
});

export function SuggestRoutes() {
  const [isLoading, setIsLoading] = useState(false);
  const [suggestedRoutes, setSuggestedRoutes] = useState<SuggestPatrolRoutesOutput['routes'] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { areaDescription: '' },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setError(null);
    setSuggestedRoutes(null);
    try {
      const result = await suggestPatrolRoutes(values);
      setSuggestedRoutes(result.routes);
    } catch (e) {
      setError('Failed to generate routes. Please try again.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const addRoute = (route: SuggestPatrolRoutesOutput['routes'][number]) => {
    // In a real app, this would likely interact with a global state or parent component
    console.log('Adding route:', route);
    toast({
      title: 'Route Added!',
      description: `"${route.name}" has been saved to your routes.`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Route Suggestions</CardTitle>        
        <CardDescription>Describe the area you want to patrol, and our AI will suggest optimal routes.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="areaDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Area Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., 'A two-story house with a large backyard, a pool on the east side, a long driveway, and a shed in the back-left corner.'"
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Icons.ai className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Icons.ai className="mr-2 h-4 w-4" />
                  Suggest Routes
                </>
              )}
            </Button>
          </form>
        </Form>
        <div className="mt-6 space-y-4">
          {isLoading && (
            <div className="space-y-4">
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
            </div>
          )}
          {error && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {suggestedRoutes && (
            <div className="space-y-4">
                <h3 className="text-lg font-semibold font-headline">Suggestions</h3>
              {suggestedRoutes.map((route, index) => (
                <Card key={index} className="bg-muted/50">
                  <CardHeader className="flex-row items-start justify-between gap-4 space-y-0">
                    <div>
                      <CardTitle className='text-base'>{route.name}</CardTitle>
                      <CardDescription>
                        <Badge variant="secondary" className='mt-1'>{route.points.length} waypoints</Badge>
                      </CardDescription>
                    </div>
                    <Button size="sm" onClick={() => addRoute(route)}>
                      <Icons.add className="mr-2 h-4 w-4" />
                      Add Route
                    </Button>
                  </CardHeader>
                </Card>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
