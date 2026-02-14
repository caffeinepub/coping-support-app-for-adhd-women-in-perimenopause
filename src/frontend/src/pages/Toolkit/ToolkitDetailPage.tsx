import { useParams, Link, useNavigate } from '@tanstack/react-router';
import { useGetCopingMechanisms, useGetSavedItems, useAddCopingMechanismToSaved } from '../../hooks/useQueries';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Bookmark, BookmarkCheck, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function ToolkitDetailPage() {
  const { id } = useParams({ from: '/toolkit/$id' });
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const { data: mechanisms = [], isLoading } = useGetCopingMechanisms();
  const { data: savedItems = [] } = useGetSavedItems();
  const addToSaved = useAddCopingMechanismToSaved();

  const mechanism = mechanisms.find((m) => m.id.toString() === id);
  const isSaved = savedItems.some(
    (item) => item.itemType === 'CopingMechanism' && item.referenceId.toString() === id
  );

  const handleSave = async () => {
    if (!identity) {
      toast.error('Please sign in to save items');
      return;
    }

    if (isSaved) {
      toast.info('This item is already saved');
      return;
    }

    try {
      await addToSaved.mutateAsync(BigInt(id));
      toast.success('Added to your saved items');
    } catch (error) {
      toast.error('Failed to save item');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!mechanism) {
    return (
      <div className="space-y-4">
        <Button variant="ghost" onClick={() => navigate({ to: '/toolkit' })}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Toolkit
        </Button>
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">Coping mechanism not found.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <Button variant="ghost" asChild>
        <Link to="/toolkit">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Toolkit
        </Link>
      </Button>

      <Card>
        <CardHeader>
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <CardTitle className="text-3xl mb-2">{mechanism.title}</CardTitle>
              <CardDescription className="text-lg">{mechanism.description}</CardDescription>
            </div>
            <Button
              variant={isSaved ? 'secondary' : 'outline'}
              size="icon"
              onClick={handleSave}
              disabled={addToSaved.isPending}
            >
              {isSaved ? <BookmarkCheck className="h-5 w-5" /> : <Bookmark className="h-5 w-5" />}
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            <Badge>{mechanism.category}</Badge>
            {mechanism.hasEvidence && <Badge variant="outline">Evidence-Based</Badge>}
            {mechanism.isHolistic && <Badge variant="outline">Holistic</Badge>}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-3">How to Use This Strategy</h3>
            <p className="text-muted-foreground leading-relaxed">{mechanism.notes}</p>
          </div>

          <div className="bg-muted/50 rounded-lg p-6">
            <h4 className="font-medium mb-2">Why This Helps</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              This coping mechanism is designed to address challenges commonly experienced with ADHD and perimenopause. 
              {mechanism.hasEvidence && ' It is supported by research evidence.'}
              {mechanism.isHolistic && ' It takes a holistic approach to well-being.'}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
