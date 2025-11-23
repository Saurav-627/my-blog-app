import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { LogIn } from "lucide-react";
import Input from "../components/Input";
import ShowToast from "../components/ShowToast";
import { Button } from "../components/common/Button";

export const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      ShowToast("Failed to submit. please check the form", "error");
      return;
    }

    const result = await login(formData.email, formData.password);

    if (result.success) {
      ShowToast("Login successful!", "success");
      navigate("/dashboard");
    } else {
      ShowToast(result.error || "Failed to login", "error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
          <div className="flex items-center justify-center mb-6 sm:mb-8">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
              <LogIn className="w-6 h-6 text-white" />
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-center text-slate-900 mb-2">
            Welcome Back
          </h1>
          <p className="text-center text-slate-600 mb-6 sm:mb-8 text-sm sm:text-base">
            Sign in to continue to your blog
          </p>

          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
            <Input
              id="email"
              type="email"
              label="Email Address"
              value={formData.email}
              onChange={handleChange("email")}
              placeholder="saurav@example.com"
              disabled={loading}
              error={errors.email}
              required
            />

            <Input
              id="password"
              type="password"
              label="Password"
              value={formData.password}
              onChange={handleChange("password")}
              placeholder="Enter your password"
              disabled={loading}
              error={errors.password}
              required
            />

            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>

            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate("/dashboard")}
            >
              View Dashboard as Guest
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-slate-600 text-sm sm:text-base">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-blue-600 font-medium hover:text-blue-700 transition-colors"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
