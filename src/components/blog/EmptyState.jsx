import { Eye, Plus } from "lucide-react";

export const EmptyState = ({ isAuthenticated, onCreatePost }) => {
  return (
    <div className="text-center py-12 bg-white rounded-xl shadow-sm">
      <Eye className="w-12 h-12 text-slate-400 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-slate-900 mb-2">No posts yet</h3>
      {isAuthenticated ? (
        <>
          <p className="text-slate-600 mb-6">
            Create your first blog post to get started
          </p>
          <button
            onClick={onCreatePost}
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Create Post
          </button>
        </>
      ) : (
        <p className="text-slate-600">Login to create your first blog post</p>
      )}
    </div>
  );
};
