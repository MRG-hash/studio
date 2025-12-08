'use client';

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { mockRoutes } from '@/lib/data';
import { PatrolRoute } from '@/lib/types';
import { RouteFormDialog } from './route-form-dialog';
import { Badge } from '../ui/badge';
import { useToast } from '@/hooks/use-toast';

export function RoutesTable() {
  const [routes, setRoutes] = useState<PatrolRoute[]>(mockRoutes);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRoute, setEditingRoute] = useState<PatrolRoute | null>(null);
  const { toast } = useToast();


  const handleAddRoute = () => {
    setEditingRoute(null);
    setIsDialogOpen(true);
  };

  const handleEditRoute = (route: PatrolRoute) => {
    setEditingRoute(route);
    setIsDialogOpen(true);
  };
  
  const handleDeleteRoute = (id: string) => {
    setRoutes(routes.filter(r => r.id !== id));
    toast({
        title: "Route Deleted",
        description: "The patrol route has been removed.",
        variant: "destructive"
    });
  }

  const handleSaveRoute = (route: PatrolRoute) => {
    if (editingRoute) {
      setRoutes(routes.map((r) => (r.id === route.id ? route : r)));
       toast({ title: "Route Updated", description: "Your changes to the route have been saved." });
    } else {
      setRoutes([...routes, { ...route, id: `route-${Date.now()}` }]);
      toast({ title: "Route Created", description: "The new patrol route has been added." });
    }
    setEditingRoute(null);
  };

  return (
    <>
      <Card>
        <CardHeader className='sm:flex-row sm:items-center sm:justify-between'>
          <div>
            <CardTitle>Patrol Routes</CardTitle>
            <CardDescription>Manage your automated patrol routes.</CardDescription>
          </div>
          <Button onClick={handleAddRoute}>Add New Route</Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Waypoints</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {routes.map((route) => (
                  <TableRow key={route.id}>
                    <TableCell className="font-medium">{route.name}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{route.points.length} points</Badge>
                    </TableCell>
                    <TableCell>{new Date(route.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <DotsHorizontalIcon className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEditRoute(route)}>
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className='text-destructive focus:text-destructive' onClick={() => handleDeleteRoute(route.id)}>
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      <RouteFormDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSave={handleSaveRoute}
        route={editingRoute}
      />
    </>
  );
}
