import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { toast } from '@/hooks/use-toast';

interface AuthContextType {
  userId: string | null;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({ userId: null, isLoading: true });

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check active session
    const checkSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error('Session check error:', error);
          toast({
            title: "Session Error",
            description: error.message,
            variant: "destructive",
          });
          return;
        }
        setUserId(session?.user?.id ?? null);
        setIsLoading(false);
      } catch (err) {
        console.error('Session check failed:', err);
        setIsLoading(false);
      }
    };

    checkSession();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event);
      
      if (event === 'SIGNED_IN') {
        setUserId(session?.user?.id ?? null);
        toast({
          title: "Welcome!",
          description: "You have successfully signed in.",
        });
        navigate('/');
      } else if (event === 'SIGNED_OUT') {
        setUserId(null);
        toast({
          title: "Signed out",
          description: "You have been signed out successfully.",
        });
      } else if (event === 'PASSWORD_RECOVERY') {
        toast({
          title: "Password Reset",
          description: "Check your email for the password reset link.",
        });
      } else if (event === 'USER_UPDATED') {
        toast({
          title: "Profile Updated",
          description: "Your profile has been updated successfully.",
        });
      }
      
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleError = (error: Error | null) => {
    if (!error) return;
    
    console.error('Auth error:', error);
    
    // Parse error message from response body if available
    let errorMessage = error.message;
    try {
      if ('body' in error && typeof (error as any).body === 'string') {
        const bodyError = JSON.parse((error as any).body);
        errorMessage = bodyError.message;
      }
    } catch (e) {
      console.error('Error parsing error body:', e);
    }

    // Handle specific error cases
    if (errorMessage.includes('invalid_credentials')) {
      toast({
        title: "Login Failed",
        description: "Invalid email or password. Please try again.",
        variant: "destructive",
      });
    } else if (errorMessage.includes('user_already_exists')) {
      toast({
        title: "Sign Up Failed",
        description: "An account with this email already exists. Please try logging in instead.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Authentication Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
    </div>;
  }

  if (!userId) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Welcome to Goal Tracker</h1>
        <Auth
          supabaseClient={supabase}
          appearance={{ 
            theme: ThemeSupa,
            style: {
              button: { background: 'rgb(59 130 246)', color: 'white' },
              anchor: { color: 'rgb(59 130 246)' },
            }
          }}
          theme="light"
          providers={[]}
          redirectTo={window.location.origin}
          onAuthError={handleError}
        />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ userId, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};