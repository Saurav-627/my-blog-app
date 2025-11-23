import { lazy } from "react";
import { Navigate } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";

// Lazy load components for better performance
const Login = lazy(() =>
  import("./pages/Login").then((module) => ({ default: module.Login }))
);
const Register = lazy(() =>
  import("./pages/Register").then((module) => ({ default: module.Register }))
);
const Dashboard = lazy(() =>
  import("./pages/Dashboard").then((module) => ({ default: module.Dashboard }))
);
const PostForm = lazy(() =>
  import("./pages/PostForm").then((module) => ({ default: module.PostForm }))
);

// Root redirect component
const RootRedirect = ({ isAuthenticated }) => {
  return isAuthenticated ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <Navigate to="/login" replace />
  );
};

// Create router configuration
export const createRouterConfig = (isAuthenticated) => [
  {
    path: "/",
    element: <RootRedirect isAuthenticated={isAuthenticated} />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/posts/new",
    element: (
      <ProtectedRoute>
        <PostForm />
      </ProtectedRoute>
    ),
  },
  {
    path: "/posts/edit/:id",
    element: (
      <ProtectedRoute>
        <PostForm />
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
];
