import React, {createContext} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import * as auth from '../services/auth';

interface AuthContextData {
  signed: boolean;
  user: object | null;
  signin(): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({children}) => {
  const [user, setUser] = React.useState<object | null>(null);

  React.useEffect(() => {
    async function loadStoragedData() {
      const storagedUser = await AsyncStorage.getItem('@RNAuth:user');
      const storageToken = await AsyncStorage.getItem('@RNAuth:token');

      if (storagedUser && storageToken) {
        setUser(JSON.parse(storagedUser));
      }
    }
    loadStoragedData();
  }, []);

  async function signin() {
    const response = await auth.signIn();

    setUser(response.user);

    await AsyncStorage.setItem('@RNAuth:user', JSON.stringify(response.user));
    await AsyncStorage.setItem('@RNAuth:token', response.token);
  }

  function signOut() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{signed: !!user, user, signin, signOut}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
