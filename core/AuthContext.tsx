import {createContext, useContext, useEffect, useState} from "react";
import axios from "axios";
import storageUtil from "../utils/storage";

interface AuthProps {
  authState?: { token: string | null, authenticated: boolean | null };
  onRegister?: (email: string, password: string) => Promise<any>;
  onLogin?: (email: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
}

const TOKEN_KEY = "my-jwt";
export const API_URL = 'https://api.developbetterapps.com';
const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
}

export const AuthProvider = ({children}: any) => {
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null
  }>(
    {
      token: null,
      authenticated: null
    }
  )

  // NOTE: this block gets run at the start of the application once because no dependencies are
  // defined. If token from previous login still exists, it simply uses it without having to
  // login again.
  useEffect(() => {
    const loadToken = async () => {
      const token = await storageUtil.getItem(TOKEN_KEY);
      console.log('stored:', token);
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setAuthState({
          token: token,
          authenticated: true
        });
      }
    };
    loadToken();
  }, [])


  const register = async (email: string, password: string) => {
    try {
      return await axios.post(`${API_URL}/users`, {email, password});
    } catch (e) {
      return {error: true, msg: (e as any).response.data.msg};
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const result = await axios.post(`${API_URL}/auth`, {email, password});
      console.log(" ~ file: AuthContext.tsx:61 ~ login ~ result: ", result);

      setAuthState({
        token: result.data.token,
        authenticated: true
      })

      // NOTE: below line is crucial where it is defining that future API calls after login will include
      // the token in the headers. You may need to update the words, Bearer and Authorization based
      // on your specific API needs
      axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.token}`;

      // NOTE: secure way to store the token. It gets checked on app startup and forwards the user
      // to login page if not already logged in.
      await storageUtil.setItem(TOKEN_KEY, result.data.token);
      return result;
    } catch (e) {
      return {error: true, msg: (e as any).response.data.msg};
    }
  };

  /**
   * This implementation does not make any API calls on logout. But if you specific impl needs to
   * make an API call, do that and set the below after waiting for the API response.
   */
  const logout = async () => {
    // Delete token from storage
    await storageUtil.deleteItem(TOKEN_KEY);

    // Update HTTP Headers
    axios.defaults.headers.common['Authorization'] = '';

    // Reset auth state
    setAuthState({
      token: null,
      authenticated: false
    });
  };

  const value = {
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    authState: authState
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}