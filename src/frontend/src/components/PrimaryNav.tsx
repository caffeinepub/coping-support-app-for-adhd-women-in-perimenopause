import { Link, useRouterState } from '@tanstack/react-router';
import { Menu, X, Heart, BookOpen, Calendar, PenLine, Bookmark } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import LoginButton from './auth/LoginButton';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetCallerUserProfile } from '../hooks/useQueries';

export default function PrimaryNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { identity } = useInternetIdentity();
  const { data: userProfile } = useGetCallerUserProfile();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const isAuthenticated = !!identity;

  const navItems = [
    { path: '/toolkit', label: 'Coping Toolkit', icon: Heart },
    { path: '/library', label: 'Library', icon: BookOpen },
    { path: '/check-in', label: 'Daily Check-in', icon: Calendar },
    { path: '/journal', label: 'Journal', icon: PenLine },
    { path: '/saved', label: 'Saved', icon: Bookmark },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between max-w-6xl">
        <Link to="/" className="flex items-center space-x-2 text-xl font-semibold text-primary hover:text-primary/80 transition-colors">
          <Heart className="h-6 w-6" />
          <span className="hidden sm:inline">Flourish</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPath === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-1 ${
                  isActive
                    ? 'bg-accent text-accent-foreground'
                    : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated && userProfile && (
            <span className="text-sm text-muted-foreground">
              Hello, <span className="font-medium text-foreground">{userProfile.name}</span>
            </span>
          )}
          <LoginButton />
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </nav>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="container mx-auto px-4 py-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPath === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-accent text-accent-foreground'
                      : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
            <div className="pt-4 border-t border-border space-y-2">
              {isAuthenticated && userProfile && (
                <div className="px-3 py-2 text-sm text-muted-foreground">
                  Hello, <span className="font-medium text-foreground">{userProfile.name}</span>
                </div>
              )}
              <LoginButton />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
