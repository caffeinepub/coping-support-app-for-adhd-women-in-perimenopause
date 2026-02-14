import { useState } from 'react';
import { useGetDailyCheckIns, useAddDailyCheckIn } from '../../hooks/useQueries';
import RequireAuth from '../../components/auth/RequireAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { Link } from '@tanstack/react-router';
import { format } from 'date-fns';

export default function CheckInPage() {
  return (
    <RequireAuth message="Sign in to track your daily check-ins and view your history.">
      <CheckInContent />
    </RequireAuth>
  );
}

function CheckInContent() {
  const { data: checkIns = [], isLoading } = useGetDailyCheckIns();
  const addCheckIn = useAddDailyCheckIn();

  const [focus, setFocus] = useState([5]);
  const [mood, setMood] = useState([5]);
  const [energy, setEnergy] = useState([5]);
  const [sleepQuality, setSleepQuality] = useState([5]);
  const [hotFlashSeverity, setHotFlashSeverity] = useState([5]);
  const [anxiety, setAnxiety] = useState([5]);
  const [irritability, setIrritability] = useState([5]);
  const [notes, setNotes] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await addCheckIn.mutateAsync({
        date: BigInt(Date.now() * 1000000),
        focus: BigInt(focus[0]),
        mood: BigInt(mood[0]),
        energy: BigInt(energy[0]),
        sleepQuality: BigInt(sleepQuality[0]),
        hotFlashSeverity: BigInt(hotFlashSeverity[0]),
        anxiety: BigInt(anxiety[0]),
        irritability: BigInt(irritability[0]),
        notes: notes.trim() || undefined,
      });

      toast.success('Check-in saved successfully!');
      setNotes('');
    } catch (error) {
      toast.error('Failed to save check-in');
    }
  };

  const sortedCheckIns = [...checkIns].sort((a, b) => Number(b.date - a.date));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2 flex items-center space-x-2">
          <Calendar className="h-8 w-8 text-primary" />
          <span>Daily Check-in</span>
        </h1>
        <p className="text-lg text-muted-foreground">
          Take a moment to check in with yourself. This quick assessment helps you track patterns over time.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>How are you feeling today?</CardTitle>
          <CardDescription>Rate each area from 1 (low) to 10 (high)</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Focus: {focus[0]}</Label>
                <Slider value={focus} onValueChange={setFocus} min={1} max={10} step={1} />
              </div>

              <div className="space-y-2">
                <Label>Mood: {mood[0]}</Label>
                <Slider value={mood} onValueChange={setMood} min={1} max={10} step={1} />
              </div>

              <div className="space-y-2">
                <Label>Energy: {energy[0]}</Label>
                <Slider value={energy} onValueChange={setEnergy} min={1} max={10} step={1} />
              </div>

              <div className="space-y-2">
                <Label>Sleep Quality: {sleepQuality[0]}</Label>
                <Slider value={sleepQuality} onValueChange={setSleepQuality} min={1} max={10} step={1} />
              </div>

              <div className="space-y-2">
                <Label>Hot Flash Severity: {hotFlashSeverity[0]}</Label>
                <Slider value={hotFlashSeverity} onValueChange={setHotFlashSeverity} min={1} max={10} step={1} />
              </div>

              <div className="space-y-2">
                <Label>Anxiety: {anxiety[0]}</Label>
                <Slider value={anxiety} onValueChange={setAnxiety} min={1} max={10} step={1} />
              </div>

              <div className="space-y-2">
                <Label>Irritability: {irritability[0]}</Label>
                <Slider value={irritability} onValueChange={setIrritability} min={1} max={10} step={1} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes (optional)</Label>
                <Textarea
                  id="notes"
                  placeholder="Any additional thoughts or observations..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                />
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={addCheckIn.isPending}>
              {addCheckIn.isPending ? 'Saving...' : 'Save Check-in'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Your History</h2>
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : sortedCheckIns.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">No check-ins yet. Complete your first one above!</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {sortedCheckIns.map((checkIn) => (
              <Link key={Number(checkIn.id)} to="/check-in/$id" params={{ id: checkIn.id.toString() }}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {format(new Date(Number(checkIn.date) / 1000000), 'MMMM d, yyyy')}
                    </CardTitle>
                    <CardDescription>
                      Focus: {Number(checkIn.focus)} • Mood: {Number(checkIn.mood)} • Energy: {Number(checkIn.energy)}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
