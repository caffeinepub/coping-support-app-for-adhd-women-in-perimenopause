import { Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const appIdentifier = typeof window !== 'undefined' ? window.location.hostname : 'flourish-app';

  return (
    <footer className="border-t border-border bg-muted/30 py-8 mt-auto">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col items-center space-y-4 text-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Flourish. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center space-x-1">
            <span>Built with</span>
            <Heart className="h-4 w-4 text-primary fill-primary" />
            <span>using</span>
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(appIdentifier)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary hover:underline"
            >
              caffeine.ai
            </a>
          </p>
          <p className="text-xs text-muted-foreground max-w-2xl">
            This app provides informational content and coping strategies. It is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
          </p>
        </div>
      </div>
    </footer>
  );
}
