import { LoginRequest, UserResponse } from "@/models/user/user.model";
import { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { api } from "@/api/api";
import { router } from "expo-router";
import { isTokenValid } from "@/services/authService";
import { fetchCurrentUser } from "@/api/user";

interface AuthState {
  token: string | null;
  userData: UserResponse | null;
  authenticated: boolean | null;
}

interface AuthProps {
  authState?: AuthState;
  onLogin?: (req: LoginRequest) => Promise<void>;
  onLogout?: () => Promise<void>;
}

const tokenKey = process.env.EXPO_PUBLIC_TOKEN_KEY || "token";

export const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<AuthState | undefined>(undefined);

  useEffect(() => {
    (async () => {
      const token = await SecureStore.getItemAsync(tokenKey);
      if (token && (await isTokenValid(token))) {
        const userData = await fetchCurrentUser();
        setAuthState({ token, userData, authenticated: true });
        router.push("/(root)/(tabs)/documetnsToSign");
      } else {
        setAuthState({ token: null, userData: null, authenticated: false });
        router.push("/(auth)/welcome");
      }
    })();
  }, []);

  const login = async (req: LoginRequest) => {
    const result = await api.post(`/login`, req);
    if (result.data) {
      await SecureStore.setItemAsync(process.env.EXPO_PUBLIC_TOKEN_KEY || "token ", result.data.token);
      const userData = await fetchCurrentUser();
      setAuthState({ token: result.data.token, userData, authenticated: true });
    }
  };

  const logout = async () => {
    console.error("logout");
    await SecureStore.deleteItemAsync(tokenKey);
    setAuthState({ token: null, userData: null, authenticated: false });
  };

  const value = { onLogin: login, onLogout: logout, authState };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
