import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hook';
import {
  setLoading,
  setPosts,
  addPost as addPostAction,
  updatePost as updatePostAction,
  deletePost as deletePostAction,
  setError,
} from '../store/postsSlice';
import api from '../services/api';

export const usePosts = () => {
  const dispatch = useAppDispatch();
  const { posts, loading, error } = useAppSelector((state) => state.posts);

  const fetchPosts = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      const response = await api.get('/posts');
      
      // Transform JSONPlaceholder data to our expected format
      const transformedPosts = response.data.slice(0, 20).map(post => ({
        id: post.id,
        title: post.title,
        content: post.body,
        excerpt: post.body.substring(0, 100) + '...',
        user_id: post.userId,
        created_at: new Date().toISOString(),
        published: true,
        category: 'General',
        tags: ['api', 'blog'],
        profiles: {
          full_name: `User ${post.userId}`,
          email: `user${post.userId}@example.com`
        }
      }));
      
      dispatch(setPosts(transformedPosts));
      return { success: true };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch posts';
      dispatch(setError(errorMessage));
      return { success: false, error: errorMessage };
    }
  }, [dispatch]);

  const addPost = useCallback(async (postData) => {
    try {
      dispatch(setLoading(true));
      const response = await api.post('/posts', postData);
      dispatch(addPostAction(response.data));
      return { success: true, data: response.data };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to add post';
      dispatch(setError(errorMessage));
      return { success: false, error: errorMessage };
    }
  }, [dispatch]);

  const updatePost = useCallback(async (id, postData) => {
    try {
      dispatch(setLoading(true));
      const response = await api.put(`/posts/${id}`, postData);
      dispatch(updatePostAction(response.data));
      return { success: true, data: response.data };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update post';
      dispatch(setError(errorMessage));
      return { success: false, error: errorMessage };
    }
  }, [dispatch]);

  const deletePost = useCallback(async (id) => {
    try {
      dispatch(setLoading(true));
      await api.delete(`/posts/${id}`);
      dispatch(deletePostAction(id));
      return { success: true };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete post';
      dispatch(setError(errorMessage));
      return { success: false, error: errorMessage };
    }
  }, [dispatch]);

  return {
    posts,
    loading,
    error,
    fetchPosts,
    addPost,
    updatePost,
    deletePost,
  };
};