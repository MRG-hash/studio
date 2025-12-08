import { BatteryStatus } from '@/components/dashboard/battery-status';
import { ConnectionStatus } from '@/components/dashboard/connection-status';
import { GpsStatus } from '@/components/dashboard/gps-status';
import { PatrolControls } from '@/components/dashboard/patrol-controls';
import { RecentActivity } from '@/components/dashboard/recent-activity';
import { LiveFeedPreview } from '@/components/dashboard/live-feed-preview';

export default function DashboardPage() {
  return (
    <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
          <BatteryStatus />
          <ConnectionStatus />
          <GpsStatus />
          <PatrolControls />
        </div>
        <LiveFeedPreview />
      </div>
      <RecentActivity />
    </div>
  );
}
