import { useState, useEffect, useCallback, useMemo } from "react";
import { loadJSON, saveJSON } from "../services/json-store";

export const MOCK_USER_KEY = "blog_app_user";

export const useAuth = () => {
  const [authState, setAuthState] = useState({
    user: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const storedUser = loadJSON(MOCK_USER_KEY);
    if (storedUser) {
      try {
        setAuthState({
          user: storedUser,
          loading: false,
          error: null,
        });
      } catch (e) {
        console.error(e);
        saveJSON(MOCK_USER_KEY, null);
        setAuthState({ user: null, loading: false, error: null });
      }
    } else {
      setAuthState({ user: null, loading: false, error: null });
    }
  }, []);

  const login = useCallback(async (email, password) => {
    try {
      setAuthState((prev) => ({ ...prev, loading: true, error: null }));

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Simple mock validation
      if (!email || !password) {
        throw new Error("Email and password are required");
      }

      // Create mock user with token
      const token = btoa(JSON.stringify({ email, time: Date.now() }));
      const user = {
        id: "user-1",
        email,
        full_name: email.split("@")[0], // Mock name from email
        access_token: token,
      };

      saveJSON(MOCK_USER_KEY, user);

      setAuthState({
        user,
        loading: false,
        error: null,
      });

      return { success: true };
    } catch (error) {
      setAuthState((prev) => ({
        ...prev,
        loading: false,
        error: error.message,
      }));

      return { success: false, error: error.message };
    }
  }, []);

  const register = useCallback(async (email, password, fullName) => {
    try {
      setAuthState((prev) => ({ ...prev, loading: true, error: null }));

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (!email || !password) {
        throw new Error("Email and password are required");
      }

      const token = btoa(JSON.stringify({ email, time: Date.now() }));
      const user = {
        id: "user-" + Date.now(),
        email,
        full_name: fullName || email.split("@")[0],
        access_token: token,
      };

      saveJSON(MOCK_USER_KEY, user);

      setAuthState({
        user,
        loading: false,
        error: null,
      });

      return { success: true };
    } catch (error) {
      setAuthState((prev) => ({
        ...prev,
        loading: false,
        error: error.message,
      }));

      return { success: false, error: error.message };
    }
  }, []);

  const logout = useCallback(() => {
    try {
      setAuthState((prev) => ({ ...prev, loading: true, error: null }));

      saveJSON(MOCK_USER_KEY, null);

      setAuthState({
        user: null,
        loading: false,
        error: null,
      });

      return { success: true };
    } catch (error) {
      setAuthState((prev) => ({
        ...prev,
        loading: false,
        error: error.message,
      }));

      return { success: false, error: error.message };
    }
  }, []);

  // Memoize the return object to prevent unnecessary re-renders
  return useMemo(
    () => ({
      user: authState.user,
      loading: authState.loading,
      error: authState.error,
      isAuthenticated: !!authState.user,
      login,
      register,
      logout,
    }),
    [
      authState.user,
      authState.loading,
      authState.error,
      login,
      register,
      logout,
    ]
  );
};
