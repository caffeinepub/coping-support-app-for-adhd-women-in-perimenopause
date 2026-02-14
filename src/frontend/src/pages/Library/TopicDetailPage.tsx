import { useParams, Link, useNavigate } from '@tanstack/react-router';
import { useGetSavedItems, useAddTopicToSaved } from '../../hooks/useQueries';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft, Bookmark, BookmarkCheck, Info } from 'lucide-react';
import { libraryTopics } from '../../content/libraryTopics';
import { toast } from 'sonner';

export default function TopicDetailPage() {
  const { id } = useParams({ from: '/library/$id' });
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const { data: savedItems = [] } = useGetSavedItems();
  const addToSaved = useAddTopicToSaved();

  const topic = libraryTopics.find((t) => t.id.toString() === id);
  const isSaved = savedItems.some(
    (item) => item.itemType === 'Topic' && item.referenceId.toString() === id
  );

  const handleSave = async () => {
    if (!identity) {
      toast.error('Please sign in to save items');
      return;
    }

    if (isSaved) {
      toast.info('This topic is already saved');
      return;
    }

    try {
      await addToSaved.mutateAsync(BigInt(id));
      toast.success('Added to your saved items');
    } catch (error) {
      toast.error('Failed to save topic');
    }
  };

  if (!topic) {
    return (
      <div className="space-y-4">
        <Button variant="ghost" onClick={() => navigate({ to: '/library' })}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Library
        </Button>
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">Topic not found.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <Button variant="ghost" asChild>
        <Link to="/library">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Library
        </Link>
      </Button>

      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          This content is for informational purposes only and is not medical advice. Please consult your healthcare provider.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <CardTitle className="text-3xl">{topic.title}</CardTitle>
            <Button
              variant={isSaved ? 'secondary' : 'outline'}
              size="icon"
              onClick={handleSave}
              disabled={addToSaved.isPending}
            >
              {isSaved ? <BookmarkCheck className="h-5 w-5" /> : <Bookmark className="h-5 w-5" />}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 prose prose-slate max-w-none">
          {topic.sections.map((section, index) => (
            <div key={index}>
              <h3 className="text-xl font-semibold mb-3">{section.heading}</h3>
              <ul className="space-y-2 list-disc list-inside text-muted-foreground">
                {section.points.map((point, pointIndex) => (
                  <li key={pointIndex} className="leading-relaxed">{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
