import React, {createContext} from 'react';
import * as auth from '../services/auth';

interface AuthContextData {
  signed: boolean;
  user: object | null;
  signin(): Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({children}) => {
  const [user, setUser] = React.useState<object | null>(null);

  async function signin() {
    const response = await auth.signIn();

    setUser(response.user);
  }
  return (
    <AuthContext.Provider value={{signed: !!user, user, signin}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
