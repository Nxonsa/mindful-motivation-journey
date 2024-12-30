import { createContext, useContext, useState } from 'react';

interface AuthContextType {
  userId: string | null;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({ userId: null, isLoading: true });

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // For development, we'll use a fixed userId and set isLoading to false
  const [userId] = useState<string>('development-user-id');
  const [isLoading] = useState(false);

  return (
    <AuthContext.Provider value={{ userId, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};