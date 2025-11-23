import { useState, useEffect, useCallback } from "react";
import { saveJSON } from "../services/json-store";

export const MOCK_USER_KEY = "blog_app_user";

export const useAuth = () => {
  const [authState, setAuthState] = useState({
    user: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const storedUser = localStorage.getItem(MOCK_USER_KEY);
    if (storedUser) {
      try {
        setAuthState({
          user: JSON.parse(storedUser),
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

      // Create mock user
      const user = {
        id: "user-1",
        email,
        full_name: email.split("@")[0], // Mock name from email
      };

      saveJSON(MOCK_USER_KEY, JSON.stringify(user));

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

      const user = {
        id: "user-" + Date.now(),
        email,
        full_name: fullName || email.split("@")[0],
      };

      localStorage.setItem(MOCK_USER_KEY, JSON.stringify(user));

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

  const logout = useCallback(async () => {
    try {
      setAuthState((prev) => ({ ...prev, loading: true, error: null }));

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 300));

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

  return {
    user: authState.user,
    loading: authState.loading,
    error: authState.error,
    isAuthenticated: !!authState.user,
    login,
    register,
    logout,
  };
};
