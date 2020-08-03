import React, {createContext, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import * as auth from '../services/auth';
import api from '../services/api';

interface User {
  name: string;
  email: string;
}

interface AuthContextData {
  signed: boolean;
  user: User | null;
  loading: boolean;
  signin(): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({children}) => {
  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    async function loadStoragedData() {
      const storagedUser = await AsyncStorage.getItem('@RNAuth:user');
      const storageToken = await AsyncStorage.getItem('@RNAuth:token');

      if (storagedUser && storageToken) {
        api.defaults.headers.Authorization = `Bearer ${storageToken}`;

        setUser(JSON.parse(storagedUser));
        setLoading(false);
      }
    }
    loadStoragedData();
  }, []);

  async function signin() {
    const response = await auth.signIn();

    setUser(response.user);

    api.defaults.headers['Authorization'] = `Bearer ${response.token}`;

    await AsyncStorage.setItem('@RNAuth:user', JSON.stringify(response.user));
    await AsyncStorage.setItem('@RNAuth:token', response.token);
  }

  function signOut() {
    AsyncStorage.clear().then(() => {
      setUser(null);
    });
  }

  return (
    <AuthContext.Provider
      value={{signed: !!user, user, loading, signin, signOut}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

// export function useAuth() {
//    const context = useContext(contextValue);

//    return context
// }
