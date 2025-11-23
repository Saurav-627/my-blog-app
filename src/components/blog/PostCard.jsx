import { memo } from "react";
import { Edit, Trash2 } from "lucide-react";

const PostCard = memo(
  ({ post, isAuthenticated, onEdit, onDelete, deletingId }) => {
    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    };

    return (
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
        <div className="p-4 sm:p-6">
          <div className="flex items-start justify-between mb-3">
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
              {post.category}
            </span>
            {isAuthenticated && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onEdit(post.id)}
                  className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                  title="Edit post"
                  aria-label="Edit post"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDelete(post.id)}
                  disabled={deletingId === post.id}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                  title="Delete post"
                  aria-label="Delete post"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2">
            {post.title}
          </h3>

          {post.excerpt && (
            <p className="text-slate-600 text-sm mb-4 line-clamp-3">
              {post.excerpt}
            </p>
          )}

          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="text-xs px-2 py-1 bg-slate-100 text-slate-700 rounded"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between text-sm text-slate-500 pt-4 border-t border-slate-100">
            <span className="text-xs sm:text-sm">
              {formatDate(post.created_at)}
            </span>
            <span
              className={`px-2 py-1 rounded text-xs font-medium ${
                post.published
                  ? "bg-green-100 text-green-700"
                  : "bg-amber-100 text-amber-700"
              }`}
            >
              {post.published ? "Published" : "Draft"}
            </span>
          </div>
        </div>
      </div>
    );
  }
);

PostCard.displayName = "PostCard";

export default PostCard;
