import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { usePosts } from "../hooks/usePosts";
import { Save } from "lucide-react";
import Input from "../components/Input";
import ShowToast from "../components/ShowToast";
import { FormHeader } from "../components/forms/FormHeader";
import { CategorySelect } from "../components/forms/CategorySelect";

export const PostForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { posts, addPost, updatePost, loading } = usePosts();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    category: "general",
    tags: "",
    published: true,
  });

  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const isEditMode = !!id;

  useEffect(() => {
    if (isEditMode && id) {
      const post = posts.find((p) => +p?.id === +id);
      if (post) {
        setFormData({
          title: post.title,
          content: post.content,
          excerpt: post.excerpt || "",
          category: post.category,
          tags: post.tags ? post.tags.join(", ") : "",
          published: post.published,
        });
      }
    }
  }, [isEditMode, id, posts]);

  const validateForm = useCallback(() => {
    if (!formData.title.trim()) {
      setError("Title is required");
      return false;
    }
    if (!formData.content.trim()) {
      setError("Content is required");
      return false;
    }
    if (formData.title.length > 200) {
      setError("Title must be less than 200 characters");
      return false;
    }
    return true;
  }, [formData.title, formData.content]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setError("");

      if (!validateForm()) {
        ShowToast("Failed to submit. please check the form ", "error");
        return;
      }

      setSubmitting(true);

      const postData = {
        title: formData.title.trim(),
        content: formData.content.trim(),
        excerpt: formData.excerpt.trim() || undefined,
        category: formData.category,
        tags: formData.tags
          ? formData.tags
              .split(",")
              .map((tag) => tag.trim())
              .filter((tag) => tag)
          : [],
        published: formData.published,
        created_at: new Date().toISOString(),
      };

      const result =
        isEditMode && id
          ? await updatePost(id, postData)
          : await addPost(postData);

      setSubmitting(false);

      if (result.success) {
        ShowToast(
          isEditMode
            ? "Post updated successfully!"
            : "Post created successfully!",
          "success"
        );
        navigate("/dashboard");
      } else {
        ShowToast(result.error || "Failed to save post", "error");
        setError(result.error || "Failed to save post");
      }
    },
    [formData, validateForm, isEditMode, id, updatePost, addPost, navigate]
  );

  const handleFieldChange = useCallback(
    (field) => (e) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    },
    []
  );

  const handlePublishedChange = useCallback((e) => {
    setFormData((prev) => ({ ...prev, published: e.target.checked }));
  }, []);

  const handleBack = useCallback(() => {
    navigate("/dashboard");
  }, [navigate]);

  return (
    <div className="min-h-screen bg-slate-50">
      <FormHeader isEditMode={isEditMode} onBack={handleBack} />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6">
          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <Input
              id="title"
              type="text"
              label="Title"
              value={formData.title}
              onChange={handleFieldChange("title")}
              placeholder="Enter post title"
              disabled={submitting || loading}
              required
            />

            <Input
              id="excerpt"
              type="textarea"
              label="Excerpt"
              value={formData.excerpt}
              onChange={handleFieldChange("excerpt")}
              rows={2}
              placeholder="Brief summary of your post"
              disabled={submitting || loading}
            />

            <Input
              id="content"
              type="textarea"
              label="Content"
              value={formData.content}
              onChange={handleFieldChange("content")}
              rows={12}
              placeholder="Write your post content here..."
              disabled={submitting || loading}
              required
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
              <CategorySelect
                value={formData.category}
                onChange={handleFieldChange("category")}
                disabled={submitting || loading}
              />

              <div>
                <Input
                  id="tags"
                  type="text"
                  label="Tags"
                  value={formData.tags}
                  onChange={handleFieldChange("tags")}
                  placeholder="react, javascript, web"
                  disabled={submitting || loading}
                />
                <p className="text-xs text-slate-500 mt-1">
                  Separate tags with commas
                </p>
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="published"
                type="checkbox"
                checked={formData.published}
                onChange={handlePublishedChange}
                className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-2 focus:ring-blue-500"
                disabled={submitting || loading}
              />
              <label
                htmlFor="published"
                className="ml-2 text-sm font-medium text-slate-700"
              >
                Publish immediately
              </label>
            </div>

            <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center sm:justify-between gap-3 pt-6 border-t border-slate-200">
              <button
                type="button"
                onClick={handleBack}
                disabled={submitting}
                className="w-full sm:w-auto px-6 py-3 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition-colors border border-slate-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={submitting || loading}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-4 h-4" />
                {submitting
                  ? "Saving..."
                  : isEditMode
                  ? "Update Post"
                  : "Create Post"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};
