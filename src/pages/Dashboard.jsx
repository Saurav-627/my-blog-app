import { useEffect, useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { usePosts } from "../hooks/usePosts";
import { Header } from "../components/layout/Header";
import { PostGrid } from "../components/blog/PostGrid";
import { EmptyState } from "../components/blog/EmptyState";
import { LoadingSpinner } from "../components/common/LoadingSpinner";
import { SearchBar } from "../components/blog/SearchBar";
import { CategoryFilter } from "../components/blog/CategoryFilter";
import ShowToast from "../components/ShowToast";

export const Dashboard = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { posts, loading, fetchPosts, deletePost } = usePosts();
  const navigate = useNavigate();
  const [deletingId, setDeletingId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    if (posts.length === 0) {
      fetchPosts();
    }
  }, []);

  // Extract unique categories from posts
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(posts.map((post) => post.category))];
    return uniqueCategories.sort();
  }, [posts]);

  // Filter posts based on search query and category
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      // Category filter
      const matchesCategory =
        selectedCategory === "all" || post.category === selectedCategory;

      // Search filter
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        searchQuery === "" ||
        post.title.toLowerCase().includes(searchLower) ||
        post.content.toLowerCase().includes(searchLower) ||
        post.excerpt?.toLowerCase().includes(searchLower) ||
        post.tags?.some((tag) => tag.toLowerCase().includes(searchLower));

      return matchesCategory && matchesSearch;
    });
  }, [posts, searchQuery, selectedCategory]);

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

  const handleClearSearch = useCallback(() => {
    setSearchQuery("");
  }, []);

  const handleCategoryChange = useCallback((category) => {
    setSelectedCategory(category);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <Header
        isAuthenticated={isAuthenticated}
        user={user}
        onLogout={handleLogout}
        onNavigate={handleNavigate}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header Section */}
        <div className="mb-6">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-900">
            All Posts
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-1">
            {filteredPosts.length}{" "}
            {filteredPosts.length === 1 ? "post" : "posts"}
            {searchQuery || selectedCategory !== "all"
              ? ` (filtered from ${posts.length} total)`
              : ""}
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-6 space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Search Bar - Takes 2 columns on large screens */}
            <div className="lg:col-span-2">
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                onClear={handleClearSearch}
              />
            </div>

            {/* Category Filter - Takes 1 column on large screens */}
            <div className="lg:col-span-1">
              <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onChange={handleCategoryChange}
              />
            </div>
          </div>

          {/* Active Filters Display */}
          {(searchQuery || selectedCategory !== "all") && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs sm:text-sm text-slate-600">
                Active filters:
              </span>
              {searchQuery && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-100 text-blue-700 text-xs sm:text-sm rounded-full">
                  Search: "{searchQuery}"
                </span>
              )}
              {selectedCategory !== "all" && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-purple-100 text-purple-700 text-xs sm:text-sm rounded-full">
                  Category: {selectedCategory}
                </span>
              )}
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="text-xs sm:text-sm text-slate-600 hover:text-slate-900 underline"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* Posts Grid */}
        {loading && posts.length === 0 ? (
          <LoadingSpinner message="Loading posts..." />
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sm:p-8">
              <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-2">
                No posts found
              </h3>
              <p className="text-sm sm:text-base text-slate-600 mb-4">
                {searchQuery || selectedCategory !== "all"
                  ? "Try adjusting your filters or search query"
                  : "No posts available yet"}
              </p>
              {(searchQuery || selectedCategory !== "all") && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                  }}
                  className="px-4 py-2 text-sm sm:text-base bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Clear filters
                </button>
              )}
              {posts.length === 0 && isAuthenticated && (
                <button
                  onClick={() => navigate("/posts/new")}
                  className="px-4 py-2 text-sm sm:text-base bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create your first post
                </button>
              )}
            </div>
          </div>
        ) : (
          <PostGrid
            posts={filteredPosts}
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
