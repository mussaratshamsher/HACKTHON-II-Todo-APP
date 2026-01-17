# Implementation Plan: Firebase Authentication

This plan outlines the steps to implement Firebase authentication in the Next.js frontend and FastAPI backend.

## Phase 1: Project Setup & Configuration

1.  **Firebase Project Setup:**
    *   Create a new Firebase project.
    *   Enable Email/Password and Google authentication providers.
    *   Create a web app in Firebase to get the frontend configuration.
    *   Generate a private key for the backend service account (Firebase Admin SDK).

2.  **Backend Setup:**
    *   Install the `firebase-admin` library.
    *   Add the Firebase Admin SDK private key to the backend environment variables securely.
    *   Initialize the Firebase Admin SDK in the FastAPI application startup.

3.  **Frontend Setup:**
    *   Install the `firebase` library.
    *   Add the Firebase web app configuration to the frontend environment variables.
    *   Initialize the Firebase client SDK in the Next.js application.

## Phase 2: Backend Implementation (FastAPI)

1.  **Authentication Dependency:**
    *   Create a reusable FastAPI dependency to verify Firebase ID tokens.
    *   This dependency will extract the token from the `Authorization` header, verify it using the Firebase Admin SDK, and return the decoded user UID.

2.  **Update Database Models:**
    *   Modify the `Todo` model to include a `user_id` field (string) to store the Firebase UID.
    *   Add a `created_by` field (string) to the `Todo` model, which will store either `"manual"` or `"agent"`.

3.  **Update API Endpoints:**
    *   Protect all existing todo-related endpoints (`/todos`, `/todos/{id}`) by adding the authentication dependency.
    *   Modify the `create_todo` endpoint to associate the new todo with the `user_id` from the token. It should also correctly set the `created_by` field.
    *   Update all data-access logic to ensure users can only access their own todos. Queries should always be filtered by the `user_id`.

4.  **User Profile Endpoint (Optional but Recommended):**
    *   Create an endpoint for user profile management (e.g., updating display name) if necessary.

## Phase 3: Frontend Implementation (Next.js)

1.  **Authentication Context:**
    *   Create a React Context to manage the user's authentication state (e.g., logged in, user object, ID token).
    *   This provider will handle login, logout, and token refresh logic.

2.  **UI Components:**
    *   Create login and registration pages/components for Email/Password and Google authentication.
    *   Create a user profile page to display user information and allow updates.

3.  **Route Protection:**
    *   Implement protected routes for all pages that require authentication (e.g., todo list, profile page).
    *   Unauthenticated users attempting to access protected routes should be redirected to the login page.

4.  **API Integration:**
    *   Update the API service layer to include the Firebase ID token in the `Authorization` header for all protected requests.
    *   The token should be retrieved from the authentication context.

5.  **Agent Integration:**
    *   Ensure that when the agent creates a todo, the request is sent with the same authenticated user's ID token.

## Phase 4: Testing

1.  **Backend Tests:**
    *   Do unit tests for the authentication dependency.
    *   Write integration tests for the protected API endpoints to ensure they handle valid and invalid tokens correctly.
    *   Test that users cannot access or modify other users' data.
    *  Don't create any file.

2.  **Frontend Tests:**
    *   Do unit tests for the authentication context and UI components.
    *   Do end-to-end tests for the login/logout flows and protected route access.
    *  Don't create any test files.


