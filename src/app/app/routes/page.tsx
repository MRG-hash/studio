import { RoutesTable } from '@/components/routes/routes-table';
import { SuggestRoutes } from '@/components/routes/suggest-routes';

export default function RoutesPage() {
  return (
    <div className="grid gap-8">
      <RoutesTable />
      <SuggestRoutes />
    </div>
  );
}
