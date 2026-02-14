import { Link } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { BookOpen, Info } from 'lucide-react';
import { libraryTopics } from '../../content/libraryTopics';

export default function LibraryListPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2 flex items-center space-x-2">
          <BookOpen className="h-8 w-8 text-primary" />
          <span>Library</span>
        </h1>
        <p className="text-lg text-muted-foreground">
          Learn about the unique intersection of ADHD and perimenopause with curated educational content.
        </p>
      </div>

      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          <strong>Please note:</strong> This content is for informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always consult with your healthcare provider.
        </AlertDescription>
      </Alert>

      <div className="grid gap-6 md:grid-cols-2">
        {libraryTopics.map((topic) => (
          <Link key={topic.id} to="/library/$id" params={{ id: topic.id.toString() }}>
            <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="text-xl">{topic.title}</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  {topic.description}
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
