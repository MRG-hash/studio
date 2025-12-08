import {
  LayoutDashboard,
  Clapperboard,
  Map,
  Library,
  Gamepad2,
  Settings,
  BatteryFull,
  Signal,
  LocateFixed,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  RotateCcw,
  RotateCw,
  PlusCircle,
  Download,
  Eye,
  Trash2,
  Moon,
  Sun,
  LogOut,
  User,
  PanelLeft,
  Video,
  PlayCircle,
  type LucideIcon,
  Bot,
} from 'lucide-react';

export type Icon = LucideIcon;

export const Icons = {
  logo: (props: React.ComponentProps<'svg'>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      <title>HomeGuard Drone</title>
    </svg>
  ),
  dashboard: LayoutDashboard,
  live: Clapperboard,
  routes: Map,
  media: Library,
  control: Gamepad2,
  settings: Settings,
  battery: BatteryFull,
  connection: Signal,
  gps: LocateFixed,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  chevronUp: ChevronUp,
  chevronDown: ChevronDown,
  rotateLeft: RotateCcw,
  rotateRight: RotateCw,
  add: PlusCircle,
  download: Download,
  view: Eye,
  delete: Trash2,
  moon: Moon,
  sun: Sun,
  logout: LogOut,
  user: User,
  menu: PanelLeft,
  video: Video,
  play: PlayCircle,
  ai: Bot,
  google: (props: React.ComponentProps<'svg'>) => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <title>Google</title>
      <path fill="currentColor" d="M12.48 10.92v3.28h7.84c-.24 1.84-.85 3.18-1.73 4.1-1.05 1.05-2.36 1.62-4.38 1.62-3.82 0-6.92-3.1-6.92-6.92s3.1-6.92 6.92-6.92c2.21 0 3.54 1.23 4.38 1.95l2.4-2.4C17.46 2.52 15.21 1.5 12.48 1.5c-6.18 0-11.16 4.98-11.16 11.16s4.98 11.16 11.16 11.16c6.32 0 10.74-4.4 10.74-10.92 0-.75-.08-1.48-.2-2.18z" />
    </svg>
  )
};
