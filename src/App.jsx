import { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import { createRouterConfig } from "./router";

function App() {
  const { isAuthenticated, loading } = useAuth();

  const routes = useRoutes(createRouterConfig(isAuthenticated));

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-600 text-lg">Loading...</p>
          </div>
        </div>
      }
    >
      {routes}
    </Suspense>
  );
}

export default App;
