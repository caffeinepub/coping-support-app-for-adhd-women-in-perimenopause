import { useParams, Link, useNavigate } from '@tanstack/react-router';
import { useGetDailyCheckIns } from '../../hooks/useQueries';
import RequireAuth from '../../components/auth/RequireAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { format } from 'date-fns';

export default function CheckInDetailPage() {
  return (
    <RequireAuth>
      <CheckInDetailContent />
    </RequireAuth>
  );
}

function CheckInDetailContent() {
  const { id } = useParams({ from: '/check-in/$id' });
  const navigate = useNavigate();
  const { data: checkIns = [], isLoading } = useGetDailyCheckIns();

  const checkIn = checkIns.find((c) => c.id.toString() === id);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!checkIn) {
    return (
      <div className="space-y-4">
        <Button variant="ghost" onClick={() => navigate({ to: '/check-in' })}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Check-ins
        </Button>
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">Check-in not found.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <Button variant="ghost" asChild>
        <Link to="/check-in">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Check-ins
        </Link>
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">
            {format(new Date(Number(checkIn.date) / 1000000), 'MMMM d, yyyy')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-1">Focus</p>
              <p className="text-2xl font-semibold">{Number(checkIn.focus)}/10</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-1">Mood</p>
              <p className="text-2xl font-semibold">{Number(checkIn.mood)}/10</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-1">Energy</p>
              <p className="text-2xl font-semibold">{Number(checkIn.energy)}/10</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-1">Sleep Quality</p>
              <p className="text-2xl font-semibold">{Number(checkIn.sleepQuality)}/10</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-1">Hot Flash Severity</p>
              <p className="text-2xl font-semibold">{Number(checkIn.hotFlashSeverity)}/10</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-1">Anxiety</p>
              <p className="text-2xl font-semibold">{Number(checkIn.anxiety)}/10</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4 col-span-2">
              <p className="text-sm text-muted-foreground mb-1">Irritability</p>
              <p className="text-2xl font-semibold">{Number(checkIn.irritability)}/10</p>
            </div>
          </div>

          {checkIn.notes && (
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-2">Notes</p>
              <p className="text-foreground leading-relaxed">{checkIn.notes}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
