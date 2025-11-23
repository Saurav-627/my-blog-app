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
import { loadJSON, saveJSON } from '../services/json-store';
import { MOCK_USER_KEY } from './useAuth';

const STORAGE_KEY = 'blog_app_posts';

export const usePosts = () => {
  const dispatch = useAppDispatch();
  const { posts, loading, error } = useAppSelector((state) => state.posts);

  const fetchPosts = useCallback(async () => {
    try {
      dispatch(setLoading(true));

      const storedPosts = loadJSON(STORAGE_KEY);
      
      if (storedPosts) {
        dispatch(setPosts(storedPosts));
      } else {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) throw new Error('Failed to fetch posts');
        
        const data = await response.json();
        
        const transformedPosts = data.slice(0, 10).map(post => ({
          id: post.id,
          title: post.title,
          excerpt: post.body.substring(0, 100) + '...',
          content: post.body,
          user_id: post.userId,
          created_at: new Date().toISOString(),
          published: true,
          category: 'General',
          tags: ['mock', 'placeholder'],
          profiles: {
            full_name: 'Saurav Luitel',
            email: 'saurav@gmail.com'
          }
        }));

        saveJSON(STORAGE_KEY, transformedPosts);
        dispatch(setPosts(transformedPosts));
      }
      
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
      
      await new Promise(resolve => setTimeout(resolve, 500));

      const user = loadJSON(MOCK_USER_KEY);
      
      const newPost = {
        ...postData,
        id: Date.now(), // Generate mock ID
        user_id: user?.id,
        created_at: new Date().toISOString(),
        profiles: {
          full_name: user?.full_name || 'Current User',
          email: user?.email || 'user@gmail.com'
        }
      };

      // Update local storage
      const currentPosts = loadJSON(STORAGE_KEY);
      const updatedPosts = [newPost, ...currentPosts];
      saveJSON(STORAGE_KEY, updatedPosts);

      dispatch(addPostAction(newPost));
      return { success: true, data: newPost };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to add post';
      dispatch(setError(errorMessage));
      return { success: false, error: errorMessage };
    }
  }, [dispatch]);

  const updatePost = useCallback(async (id, postData) => {
    try {
      dispatch(setLoading(true));

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Update local storage
      const currentPosts = loadJSON(STORAGE_KEY);
      const index = currentPosts.findIndex(p => p.id === id);
      
      if (index === -1) throw new Error('Post not found');

      const updatedPost = { ...currentPosts[index], ...postData };
      currentPosts[index] = updatedPost;
      
      saveJSON(STORAGE_KEY, currentPosts);

      dispatch(updatePostAction(updatedPost));
      return { success: true, data: updatedPost };
    } catch (err) {
      console.error(err); 
      const errorMessage = err instanceof Error ? err.message : 'Failed to update post';
      dispatch(setError(errorMessage));
      return { success: false, error: errorMessage };
    }
  }, [dispatch]);

  const deletePost = useCallback(async (id) => {
    try {
      dispatch(setLoading(true));

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Update local storage
      const currentPosts = loadJSON(STORAGE_KEY) || [];
      const updatedPosts = currentPosts.filter(p => p.id !== id);
      
      saveJSON(STORAGE_KEY, updatedPosts);

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