'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription as Fd,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { PatrolRoute } from '@/lib/types';

const pointSchema = z.object({
  x: z.number(),
  y: z.number(),
  z: z.number(),
});

const formSchema = z.object({
  name: z.string().min(3, { message: 'Route name must be at least 3 characters.' }),
  points: z
    .string()
    .refine(
      (val) => {
        try {
          const parsed = JSON.parse(val);
          return Array.isArray(parsed) && parsed.every((p) => pointSchema.safeParse(p).success);
        } catch {
          return false;
        }
      },
      { message: 'Invalid JSON format or structure for points.' }
    )
    .transform((val) => JSON.parse(val)),
});

type RouteFormDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (route: PatrolRoute) => void;
  route: PatrolRoute | null;
};

export function RouteFormDialog({ open, onOpenChange, onSave, route }: RouteFormDialogProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      points: '[]',
    },
  });

  useEffect(() => {
    if (route) {
      form.reset({
        name: route.name,
        points: JSON.stringify(route.points, null, 2),
      });
    } else {
      form.reset({
        name: '',
        points: '[]',
      });
    }
  }, [route, open, form]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const newRouteData: PatrolRoute = {
      id: route?.id || `new-${Date.now()}`,
      createdAt: route?.createdAt || new Date().toISOString(),
      name: values.name,
      points: values.points,
    };
    onSave(newRouteData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{route ? 'Edit Route' : 'Create New Route'}</DialogTitle>
          <DialogDescription>
            {route ? 'Update the details for this patrol route.' : 'Enter details for the new patrol route.'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Route Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Perimeter Check" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="points"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Waypoints (JSON)</FormLabel>
                  <FormControl>
                    <Textarea placeholder='[{"x": 0, "y": 0, "z": 10}]' {...field} className="min-h-[150px] font-code" />
                  </FormControl>
                  <Fd>Enter an array of point objects with x, y, and z coordinates.</Fd>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Route</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
