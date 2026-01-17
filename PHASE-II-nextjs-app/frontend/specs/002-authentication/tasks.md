# Tasks for Firebase Authentication Implementation

This document outlines the detailed tasks for implementing Firebase Authentication based on the provided plan.

## Phase 1: Project Setup & Configuration

1.  **Firebase Project Setup:**
    *   [ ] Create a new Firebase project in the Firebase console.
    *   [ ] Enable "Email/Password" authentication provider in Firebase Authentication.
    *   [ ] Enable "Google" authentication provider in Firebase Authentication.
    *   [ ] Register a new web app in the Firebase project to obtain frontend configuration details.
    *   [ ] Generate a new private key for the Firebase Admin SDK service account for backend use.

2.  **Backend Setup:**
    *   [ ] Install the `firebase-admin` Python library in the backend project (`pip install firebase-admin`).
    *   [ ] Securely add the Firebase Admin SDK private key (as a JSON string or path) to the backend's environment variables (e.g., `.env` file).
    *   [ ] Initialize the Firebase Admin SDK in the FastAPI application startup sequence (`main.py` or similar).

3.  **Frontend Setup:**
    *   [ ] Install the `firebase` JavaScript library in the frontend project (`npm install firebase` or `yarn add firebase`).
    *   [ ] Add the Firebase web app configuration details to the frontend's environment variables (e.g., `.env.local` for Next.js).
    *   [ ] Initialize the Firebase client SDK in the Next.js application, preferably in a utility file or context provider.

## Phase 2: Backend Implementation (FastAPI)

1.  **Authentication Dependency:**
    *   [ ] Create a new Python file (e.g., `src/auth/dependencies.py`) for authentication-related dependencies.
    *   [ ] Implement a FastAPI dependency function (e.g., `get_current_user`) that:
        *   Extracts the token from the `Authorization: Bearer <token>` header.
        *   Verifies the token using `firebase_admin.auth.verify_id_token()`.
        *   Handles invalid/expired token exceptions and raises appropriate `HTTPException` (401 Unauthorized).
        *   Returns the decoded user's UID.

2.  **Update Database Models:**
    *   [ ] Modify the `Todo` database model (e.g., `src/models.py`) to include a `user_id: str` field.
    *   [ ] Modify the `Todo` database model to include a `created_by: str` field (with allowed values like "manual", "agent").

3.  **Update API Endpoints:**
    *   [ ] Apply the `get_current_user` dependency to all protected todo-related API endpoints in `src/api/routes.py` (e.g., `/todos`, `/todos/{id}`).
    *   [ ] Modify the `POST /todos` endpoint:
        *   Retrieve the `user_id` from the `get_current_user` dependency.
        *   Set the `user_id` of the new todo to the retrieved UID.
        *   Set `created_by` field based on the request context (if derivable, otherwise default to "manual" for now).
    *   [ ] Update the `GET /todos` endpoint to filter todos by the `user_id` obtained from the dependency.
    *   [ ] Update the `GET /todos/{id}` endpoint to verify that the requested todo belongs to the `user_id` from the dependency.
    *   [ ] Update the `PUT /todos/{id}` and `DELETE /todos/{id}` endpoints to verify ownership using `user_id` before performing the operation.

4.  **User Profile Endpoint (Optional):**
    *   [ ] Implement a `GET /user/profile` endpoint to return basic user information from the token (e.g., UID, email).
    *   [ ] (Future) Implement `PUT /user/profile` to allow updating display name, etc.

## Phase 3: Frontend Implementation (Next.js)

1.  **Authentication Context/Provider:**
    *   [ ] Create a React Context (`src/context/AuthContext.tsx`) to hold user authentication state.
    *   [ ] Implement functions within the context for `loginWithEmailAndPassword`, `registerWithEmailAndPassword`, `signInWithGoogle`, `logout`.
    *   [ ] Handle Firebase `onAuthStateChanged` listener to keep the context state synchronized with Firebase auth state.
    *   [ ] Implement logic to automatically refresh/retrieve the Firebase ID token and store it.
    *   [ ] Wrap the application with the `AuthContext.Provider`.

2.  **UI Components:**
    *   [ ] Create a login page (`src/app/login/page.tsx`) with forms for email/password and a Google Sign-In button.
    *   [ ] Create a registration page (`src/app/register/page.tsx`) with forms for email/password.
    *   [ ] Create a user profile page (`src/app/profile/page.tsx`) to display user details (display name, email, provider, photo).
    *   [ ] Implement functionality on the profile page for users to update their display name.
    *   [ ] Implement functionality on the profile page for email/password users to change their password, and disable it for Google users.
    *   [ ] Add a user avatar/menu in the header to display user status and link to the profile/logout.

3.  **Route Protection:**
    *   [ ] Implement a middleware or higher-order component (HOC) in Next.js to protect client-side routes.
    *   [ ] Redirect unauthenticated users from protected routes (e.g., `/todos`, `/profile`) to the login page.
    *   [ ] Hide/show UI elements based on authentication status.

4.  **API Integration:**
    *   [ ] Modify the frontend API client/utility (e.g., `src/lib/api.ts`) to automatically include the current Firebase ID token in the `Authorization` header for all backend requests to protected endpoints.
    *   [ ] Handle 401/403 responses from the backend (e.g., redirect to login, display error messages).

5.  **Agent Integration:**
    *   [ ] Ensure that any agent-triggered requests from the frontend also retrieve and send the current authenticated user's Firebase ID token to the backend.

## Phase 4: Testing

1.  **Backend Tests:**
    *   [ ] Write unit tests for `get_current_user` dependency (e.g., valid token, invalid token, no token scenarios).
    *   [ ] Write integration tests for `POST /todos` ensuring `user_id` and `created_by` are correctly set and ownership is enforced.
    *   [ ] Write integration tests for `GET /todos`, `GET /todos/{id}`, `PUT /todos/{id}`, `DELETE /todos/{id}` ensuring proper authorization and data filtering by `user_id`.

2.  **Frontend Tests:**
    *   [ ] Do unit tests for `AuthContext` functions (login, logout, registration).
    *   [ ] Do integration tests for login/registration UI components.
    *   [ ] Do end-to-end tests for the complete authentication flow (register, login, access protected page, logout).
    *   [ ] Do end-to-end tests for protected route redirection.
    *   [ ] Do end-to-end tests for todo creation/modification/deletion with authentication.
    *   [ ] Do integration tests for the user profile page.
    *   [ ] you wil not create any test file.
