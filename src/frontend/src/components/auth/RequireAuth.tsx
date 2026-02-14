import { ReactNode } from 'react';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LogIn } from 'lucide-react';

interface RequireAuthProps {
  children: ReactNode;
  message?: string;
}

export default function RequireAuth({ children, message }: RequireAuthProps) {
  const { identity, login, loginStatus } = useInternetIdentity();

  if (!identity) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle>Sign In Required</CardTitle>
            <CardDescription>
              {message || 'Please sign in to access this feature and keep your data private and secure.'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={login} disabled={loginStatus === 'logging-in'} className="w-full">
              <LogIn className="h-4 w-4 mr-2" />
              {loginStatus === 'logging-in' ? 'Logging in...' : 'Sign In'}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
}
