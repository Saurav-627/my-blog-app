import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { usePosts } from "../hooks/usePosts";
import { Header } from "../components/layout/Header";
import { PostGrid } from "../components/blog/PostGrid";
import { EmptyState } from "../components/blog/EmptyState";
import { LoadingSpinner } from "../components/common/LoadingSpinner";
import ShowToast from "../components/ShowToast";

export const Dashboard = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { posts, loading, fetchPosts, deletePost } = usePosts();
  const navigate = useNavigate();
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    if (posts.length === 0) {
      fetchPosts();
    }
  }, []);

  const handleLogout = useCallback(async () => {
    const result = await logout();
    if (result.success) {
      ShowToast("Logged out successfully", "success");
      navigate("/login");
    }
  }, [logout, navigate]);

  const handleDelete = useCallback(
    async (id) => {
      if (window.confirm("Are you sure you want to delete this post?")) {
        setDeletingId(id);
        const result = await deletePost(id);
        if (result.success) {
          ShowToast("Post deleted successfully", "success");
          setDeletingId(null);
        } else {
          ShowToast(result.error || "Failed to delete post", "error");
          setDeletingId(null);
        }
      }
    },
    [deletePost]
  );

  const handleEdit = useCallback(
    (id) => {
      navigate(`/posts/edit/${id}`);
    },
    [navigate]
  );

  const handleNavigate = useCallback(
    (path) => {
      navigate(path);
    },
    [navigate]
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <Header
        isAuthenticated={isAuthenticated}
        user={user}
        onLogout={handleLogout}
        onNavigate={handleNavigate}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-slate-900">All Posts</h2>
          <p className="text-slate-600 mt-1">
            {posts.length} {posts.length === 1 ? "post" : "posts"}
          </p>
        </div>

        {loading && posts.length === 0 ? (
          <LoadingSpinner message="Loading posts..." />
        ) : posts.length === 0 ? (
          <EmptyState
            isAuthenticated={isAuthenticated}
            onCreatePost={() => navigate("/posts/new")}
          />
        ) : (
          <PostGrid
            posts={posts}
            isAuthenticated={isAuthenticated}
            onEdit={handleEdit}
            onDelete={handleDelete}
            deletingId={deletingId}
          />
        )}
      </main>
    </div>
  );
};
