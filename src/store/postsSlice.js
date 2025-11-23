import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  posts: [],
  status: 'idle',
  error: null,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setPosts(state, action) {
      state.posts = action.payload;
      state.loading = false;
      state.error = null;
    },
    addPost(state, action) {
      state.posts.unshift(action.payload);
      state.loading = false;
      state.error = null;
    },
    updatePost(state, action) {
      const index = state.posts.findIndex(post => post.id === action.payload.id);
      if (index !== -1) {
        state.posts[index] = action.payload;
      }
      state.loading = false;
      state.error = null;
    },
    deletePost(state, action) {
      state.posts = state.posts.filter(post => post.id !== action.payload);
      state.loading = false;
      state.error = null;
    },
    setError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setLoading, setPosts, addPost, updatePost, deletePost, setError } = postsSlice.actions;

export default postsSlice.reducer;
