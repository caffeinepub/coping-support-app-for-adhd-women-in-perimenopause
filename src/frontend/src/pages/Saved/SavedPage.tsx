import { useGetSavedItems, useGetCopingMechanisms } from '../../hooks/useQueries';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import RequireAuth from '../../components/auth/RequireAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bookmark, Loader2 } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { libraryTopics } from '../../content/libraryTopics';

export default function SavedPage() {
  const { identity } = useInternetIdentity();

  if (!identity) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2 flex items-center space-x-2">
            <Bookmark className="h-8 w-8 text-primary" />
            <span>Saved Items</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Your bookmarked coping strategies and library topics in one place.
          </p>
        </div>

        <Card className="text-center py-12">
          <CardContent className="space-y-4">
            <div className="flex justify-center">
              <img
                src="/assets/generated/icon-set.dim_512x512.png"
                alt=""
                className="w-32 h-32 opacity-50"
              />
            </div>
            <div>
              <p className="text-lg font-medium mb-2">Sign in to save your favorites</p>
              <p className="text-muted-foreground">
                Create an account to bookmark coping strategies and topics you want to revisit.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <RequireAuth>
      <SavedContent />
    </RequireAuth>
  );
}

function SavedContent() {
  const { data: savedItems = [], isLoading } = useGetSavedItems();
  const { data: mechanisms = [] } = useGetCopingMechanisms();

  const savedMechanisms = savedItems
    .filter((item) => item.itemType === 'CopingMechanism')
    .map((item) => mechanisms.find((m) => m.id === item.referenceId))
    .filter(Boolean);

  const savedTopics = savedItems
    .filter((item) => item.itemType === 'Topic')
    .map((item) => libraryTopics.find((t) => BigInt(t.id) === item.referenceId))
    .filter(Boolean);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2 flex items-center space-x-2">
          <Bookmark className="h-8 w-8 text-primary" />
          <span>Saved Items</span>
        </h1>
        <p className="text-lg text-muted-foreground">
          Your bookmarked coping strategies and library topics in one place.
        </p>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : savedItems.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent className="space-y-4">
            <div className="flex justify-center">
              <img
                src="/assets/generated/icon-set.dim_512x512.png"
                alt=""
                className="w-32 h-32 opacity-50"
              />
            </div>
            <div>
              <p className="text-lg font-medium mb-2">No saved items yet</p>
              <p className="text-muted-foreground">
                Browse the Coping Toolkit and Library to bookmark items you want to revisit.
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-8">
          {savedMechanisms.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Coping Strategies</h2>
              <div className="grid gap-6 md:grid-cols-2">
                {savedMechanisms.map((mechanism) => (
                  <Link key={Number(mechanism!.id)} to="/toolkit/$id" params={{ id: mechanism!.id.toString() }}>
                    <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
                      <CardHeader>
                        <div className="flex items-start justify-between mb-2">
                          <CardTitle className="text-xl">{mechanism!.title}</CardTitle>
                          <Badge variant="secondary">{mechanism!.category}</Badge>
                        </div>
                        <CardDescription className="text-base leading-relaxed">
                          {mechanism!.description}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {savedTopics.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Library Topics</h2>
              <div className="grid gap-6 md:grid-cols-2">
                {savedTopics.map((topic) => (
                  <Link key={topic!.id} to="/library/$id" params={{ id: topic!.id.toString() }}>
                    <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
                      <CardHeader>
                        <CardTitle className="text-xl">{topic!.title}</CardTitle>
                        <CardDescription className="text-base leading-relaxed">
                          {topic!.description}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
