import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, User, Tag, Edit, Trash2 } from "lucide-react";
import { usePosts } from "../hooks/usePosts";
import { useAuth } from "../hooks/useAuth";
import { Header } from "../components/layout/Header";
import { LoadingSpinner } from "../components/common/LoadingSpinner";
import ShowToast from "../components/ShowToast";

export const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { posts, deletePost } = usePosts();
  const { user, logout, isAuthenticated } = useAuth();
  const [post, setPost] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const foundPost = posts.find((p) => p.id === parseInt(id));
    if (foundPost) {
      setPost(foundPost);
    } else {
      // If post not found in state, redirect to dashboard
      ShowToast("Post not found", "error");
      navigate("/dashboard");
    }
  }, [id, posts, navigate]);

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      ShowToast("Logged out successfully", "success");
      navigate("/login");
    }
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleEdit = () => {
    navigate(`/posts/edit/${id}`);
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      setDeleting(true);
      const result = await deletePost(parseInt(id));
      if (result.success) {
        ShowToast("Post deleted successfully", "success");
        navigate("/dashboard");
      } else {
        ShowToast(result.error || "Failed to delete post", "error");
        setDeleting(false);
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header
          isAuthenticated={isAuthenticated}
          user={user}
          onLogout={handleLogout}
          onNavigate={handleNavigate}
        />
        <LoadingSpinner message="Loading post..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header
        isAuthenticated={isAuthenticated}
        user={user}
        onLogout={handleLogout}
        onNavigate={handleNavigate}
      />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 text-sm sm:text-base text-slate-600 hover:text-slate-900 mb-6 transition-colors group"
        >
          <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to Dashboard</span>
        </button>

        {/* Blog Post Card */}
        <article className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          {/* Header Section */}
          <div className="p-4 sm:p-6 lg:p-8 border-b border-slate-200">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs sm:text-sm font-medium rounded-full w-fit">
                {post.category}
              </span>

              {isAuthenticated && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleEdit}
                    className="flex items-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                    title="Edit post"
                  >
                    <Edit className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span className="font-medium">Edit</span>
                  </button>
                  <button
                    onClick={handleDelete}
                    disabled={deleting}
                    className="flex items-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors disabled:opacity-50"
                    title="Delete post"
                  >
                    <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span className="font-medium">
                      {deleting ? "Deleting..." : "Delete"}
                    </span>
                  </button>
                </div>
              )}
            </div>

            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-4 leading-tight">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="text-base sm:text-lg text-slate-600 mb-6 leading-relaxed">
                {post.excerpt}
              </p>
            )}

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 lg:gap-6 text-xs sm:text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <User className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span>{post.profiles?.full_name || "Anonymous"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span>{formatDate(post.created_at)}</span>
              </div>
              <span
                className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                  post.published
                    ? "bg-green-100 text-green-700"
                    : "bg-amber-100 text-amber-700"
                }`}
              >
                {post.published ? "Published" : "Draft"}
              </span>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-4 sm:p-6 lg:p-8">
            <div className="prose prose-slate max-w-none">
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed whitespace-pre-wrap">
                {post.content}
              </p>
            </div>
          </div>

          {/* Tags Section */}
          {post.tags && post.tags.length > 0 && (
            <div className="px-4 sm:px-6 lg:px-8 pb-4 sm:pb-6 lg:pb-8">
              <div className="flex items-center gap-2 mb-3">
                <Tag className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-slate-600" />
                <span className="text-xs sm:text-sm font-medium text-slate-700">
                  Tags
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2.5 sm:px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs sm:text-sm hover:bg-slate-200 transition-colors cursor-default"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </article>
      </main>
    </div>
  );
};
