import { LogOut, Plus, LogIn } from "lucide-react";

export const Header = ({ isAuthenticated, user, onLogout, onNavigate }) => {
  return (
    <header className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">My Blog</h1>
            {isAuthenticated && (
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Welcome back, {user?.email}
              </p>
            )}
          </div>
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <button
                  onClick={() => onNavigate("/posts/new")}
                  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm sm:text-base"
                >
                  <Plus className="w-4 h-4" />
                  <span className="hidden sm:inline">New Post</span>
                  <span className="sm:hidden text-xs">New</span>
                </button>
                <button
                  onClick={onLogout}
                  className="flex items-center gap-2 bg-slate-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-slate-700 transition-colors text-sm sm:text-base"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => onNavigate("/login")}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm sm:text-base"
              >
                <LogIn className="w-4 h-4" />
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
