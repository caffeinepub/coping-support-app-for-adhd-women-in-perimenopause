import { useState } from 'react';
import { useGetCopingMechanismsByCategory } from '../../hooks/useQueries';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Link } from '@tanstack/react-router';
import { Heart, Loader2 } from 'lucide-react';
import { CopingCategory } from '../../backend';

const categories: { value: CopingCategory | 'All'; label: string }[] = [
  { value: 'All', label: 'All' },
  { value: CopingCategory.Focus, label: 'Focus' },
  { value: CopingCategory.EmotionalRegulation, label: 'Emotional Regulation' },
  { value: CopingCategory.Sleep, label: 'Sleep' },
  { value: CopingCategory.HotFlashes, label: 'Hot Flashes' },
  { value: CopingCategory.BrainFog, label: 'Brain Fog' },
  { value: CopingCategory.Anxiety, label: 'Anxiety' },
  { value: CopingCategory.Relationships, label: 'Relationships' },
  { value: CopingCategory.Work, label: 'Work' },
  { value: CopingCategory.SelfCare, label: 'Self-Care' },
];

export default function ToolkitListPage() {
  const [selectedCategory, setSelectedCategory] = useState<CopingCategory | null>(null);
  const { data: mechanisms = [], isLoading } = useGetCopingMechanismsByCategory(selectedCategory);

  const getCategoryLabel = (category: CopingCategory): string => {
    const found = categories.find((c) => c.value === category);
    return found?.label || category;
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2 flex items-center space-x-2">
          <Heart className="h-8 w-8 text-primary" />
          <span>Coping Toolkit</span>
        </h1>
        <p className="text-lg text-muted-foreground">
          Evidence-based strategies to help you navigate daily challenges with ADHD and perimenopause.
        </p>
      </div>

      <Tabs defaultValue="All" className="w-full" onValueChange={(value) => setSelectedCategory(value === 'All' ? null : value as CopingCategory)}>
        <TabsList className="flex flex-wrap h-auto gap-2 bg-muted/50 p-2">
          {categories.map((cat) => (
            <TabsTrigger key={cat.value} value={cat.value} className="text-sm">
              {cat.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : mechanisms.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No coping mechanisms found in this category.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {mechanisms.map((mechanism) => (
            <Link key={Number(mechanism.id)} to="/toolkit/$id" params={{ id: mechanism.id.toString() }}>
              <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <CardTitle className="text-xl">{mechanism.title}</CardTitle>
                    <Badge variant="secondary">{getCategoryLabel(mechanism.category)}</Badge>
                  </div>
                  <CardDescription className="text-base leading-relaxed">
                    {mechanism.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {mechanism.hasEvidence && (
                      <Badge variant="outline" className="text-xs">Evidence-Based</Badge>
                    )}
                    {mechanism.isHolistic && (
                      <Badge variant="outline" className="text-xs">Holistic</Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
