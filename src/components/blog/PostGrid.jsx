import PostCard from "./PostCard";

export const PostGrid = ({
  posts,
  isAuthenticated,
  onEdit,
  onDelete,
  deletingId,
}) => {
  return (
    <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          isAuthenticated={isAuthenticated}
          onEdit={onEdit}
          onDelete={onDelete}
          deletingId={deletingId}
        />
      ))}
    </div>
  );
};
