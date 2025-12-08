'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { UserNav } from './user-nav';
import { cn } from '@/lib/utils';
import { useMemo } from 'react';

const navItems = [
  { href: '/app', label: 'Dashboard', icon: Icons.dashboard },
  { href: '/app/live', label: 'Live Feed', icon: Icons.live },
  { href: '/app/routes', label: 'Routes', icon: Icons.routes },
  { href: '/app/media', label: 'Media', icon: Icons.media },
  { href: '/app/control', label: 'Manual Control', icon: Icons.control },
  { href: '/app/settings', label: 'Settings', icon: Icons.settings },
];

export function Header() {
  const pathname = usePathname();

  const pageTitle = useMemo(() => {
    const currentNav = [...navItems].reverse().find(item => pathname.startsWith(item.href));
    return currentNav ? currentNav.label : 'Dashboard';
  }, [pathname]);

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <Icons.menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="#"
              className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
            >
              <Icons.logo className="h-5 w-5 transition-all group-hover:scale-110" />
              <span className="sr-only">HomeGuard Drone</span>
            </Link>
            {navItems.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground',
                  pathname.startsWith(item.href) && 'text-foreground'
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
      
      <h1 className="flex-1 text-xl font-headline font-semibold tracking-tight">{pageTitle}</h1>
      
      <div className="ml-auto flex items-center gap-2">
        <UserNav />
      </div>
    </header>
  );
}
