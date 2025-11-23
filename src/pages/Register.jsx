import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { UserPlus } from "lucide-react";
import Input from "../components/Input";
import ShowToast from "../components/ShowToast";
import { Button } from "../components/common/Button";

export const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "Full name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
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

    const result = await register(
      formData.email,
      formData.password,
      formData.fullName
    );

    if (result.success) {
      ShowToast("Registration successful!", "success");
      navigate("/dashboard");
    } else {
      ShowToast(result.error || "Failed to register", "error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
          <div className="flex items-center justify-center mb-2">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <UserPlus className="w-6 h-6 text-white" />
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-center text-slate-900 mb-2">
            Create Account
          </h1>
          <p className="text-center text-slate-600 mb-6 sm:mb-8 text-sm sm:text-base">
            Join our blogging community today
          </p>

          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
            <Input
              id="fullName"
              type="text"
              label="Full Name"
              value={formData.fullName}
              onChange={handleChange("fullName")}
              placeholder="Saurav Luitel"
              disabled={loading}
              error={errors.fullName}
              required
            />

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
              placeholder="At least 6 characters"
              disabled={loading}
              error={errors.password}
              required
            />

            <Input
              id="confirmPassword"
              type="password"
              label="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange("confirmPassword")}
              placeholder="Confirm your password"
              disabled={loading}
              error={errors.confirmPassword}
              required
            />

            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? "Creating account..." : "Create Account"}
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
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-600 font-medium hover:text-blue-700 transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
