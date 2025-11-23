# Project Structure and Overview

## Project: My Blog App

This is a React-based blog application that uses Redux for state management and LocalStorage for data persistence (mocking a backend).

### Tech Stack

*   **Frontend Framework**: React (Vite)
*   **State Management**: Redux Toolkit
*   **Routing**: React Router DOM
*   **Styling**: Tailwind CSS
*   **Mock Backend**: LocalStorage + JSONPlaceholder (for initial data)

### Directory Structure

```
src/
├── components/         # Reusable UI components
│   └── ProtectedRoute.jsx  # Route wrapper for auth protection
├── hooks/              # Custom React hooks
│   ├── useAuth.js      # Authentication logic (Mocked with LocalStorage)
│   └── usePosts.js     # Post management logic (Mocked with LocalStorage + JSONPlaceholder)
├── pages/              # Page components
│   ├── Dashboard.jsx   # Main user dashboard
│   ├── Login.jsx       # Login page
│   ├── Register.jsx    # Registration page
│   └── PostForm.jsx    # Create/Edit post form
├── store/              # Redux store configuration
│   ├── store.js        # Store setup
│   ├── postsSlice.js   # Redux slice for posts
│   └── hook.js         # Typed Redux hooks
├── App.jsx             # Main application component with routing
└── main.jsx            # Entry point
```

### Key Features

1.  **Authentication**:
    *   Mock login and registration using LocalStorage.
    *   Any email/password combination works for login if registered, or you can register a new user.
    *   Session persists via LocalStorage.

2.  **Post Management**:
    *   **Read**: Fetches initial posts from JSONPlaceholder API, transforms them, and stores them in LocalStorage. Subsequent reads come from LocalStorage.
    *   **Create**: Adds new posts to LocalStorage.
    *   **Update**: Updates existing posts in LocalStorage.
    *   **Delete**: Removes posts from LocalStorage.

3.  **Routing**:
    *   Protected routes for Dashboard and Post management.
    *   Redirects to Login if not authenticated.

### How to Run

1.  Install dependencies: `npm install`
2.  Start development server: `npm run dev` or `make dev`
3.  Open browser at the provided URL (usually `http://localhost:3000`).


