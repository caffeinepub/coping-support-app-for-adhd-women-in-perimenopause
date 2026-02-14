import { useState } from 'react';
import { useGetJournalEntries, useAddJournalEntry, useGetPrompts } from '../../hooks/useQueries';
import RequireAuth from '../../components/auth/RequireAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PenLine, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';

export default function JournalPage() {
  return (
    <RequireAuth message="Sign in to create journal entries and keep your reflections private.">
      <JournalContent />
    </RequireAuth>
  );
}

function JournalContent() {
  const { data: entries = [], isLoading } = useGetJournalEntries();
  const { data: prompts = [] } = useGetPrompts();
  const addEntry = useAddJournalEntry();

  const [selectedPrompt, setSelectedPrompt] = useState<string>('');
  const [entryText, setEntryText] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!entryText.trim()) {
      toast.error('Please write something in your journal entry');
      return;
    }

    try {
      await addEntry.mutateAsync({
        date: BigInt(Date.now() * 1000000),
        prompt: selectedPrompt || undefined,
        entry: entryText.trim(),
      });

      toast.success('Journal entry saved!');
      setEntryText('');
      setSelectedPrompt('');
    } catch (error) {
      toast.error('Failed to save journal entry');
    }
  };

  const sortedEntries = [...entries].sort((a, b) => Number(b.date - a.date));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2 flex items-center space-x-2">
          <PenLine className="h-8 w-8 text-primary" />
          <span>Journal</span>
        </h1>
        <p className="text-lg text-muted-foreground">
          A safe space to reflect, process, and explore your thoughts and feelings.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>New Entry</CardTitle>
          <CardDescription>Write freely or choose a prompt to guide your reflection</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="prompt">Prompt (optional)</Label>
              <Select value={selectedPrompt} onValueChange={setSelectedPrompt}>
                <SelectTrigger id="prompt">
                  <SelectValue placeholder="Choose a prompt or write freely" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">No prompt</SelectItem>
                  {prompts.map((prompt, index) => (
                    <SelectItem key={index} value={prompt}>
                      {prompt}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="entry">Your Entry</Label>
              <Textarea
                id="entry"
                placeholder="Start writing..."
                value={entryText}
                onChange={(e) => setEntryText(e.target.value)}
                rows={8}
                className="resize-none"
              />
            </div>

            <Button type="submit" className="w-full" disabled={addEntry.isPending}>
              {addEntry.isPending ? 'Saving...' : 'Save Entry'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Your Entries</h2>
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : sortedEntries.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">No journal entries yet. Start writing above!</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {sortedEntries.map((entry) => (
              <Card key={Number(entry.id)}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">
                        {format(new Date(Number(entry.date) / 1000000), 'MMMM d, yyyy')}
                      </CardTitle>
                      {entry.prompt && (
                        <CardDescription className="mt-1 italic">"{entry.prompt}"</CardDescription>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                    {entry.entry}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
