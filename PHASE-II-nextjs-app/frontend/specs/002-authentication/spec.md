# Functional Specification: Firebase Authentication Integration

## 1. Authentication Flows

### 1.1. Email/Password Authentication
- **Registration:**
  - User provides email and password.
  - Frontend calls Firebase `createUserWithEmailAndPassword`.
  - On success, Firebase returns a user object and an ID token.
- **Login:**
  - User provides email and password.
  - Frontend calls Firebase `signInWithEmailAndPassword`.
  - On success, Firebase returns a user object and an ID token.

### 1.2. Google OAuth Authentication
- **Login:**
  - User clicks "Sign in with Google".
  - Frontend calls Firebase `signInWithPopup` with `GoogleAuthProvider`.
  - On success, Firebase returns a user object and an ID token.

### 1.3. Token Management
- **Token Retrieval:** The Firebase ID token is retrieved from the authenticated user object.
- **Token Refresh:** The Firebase SDK automatically refreshes the ID token.
- **Token Transmission:** The current ID token must be included in the `Authorization` header of every protected backend request as a Bearer token (`Authorization: Bearer <token>`).

## 2. Authorization Rules

- **Backend Verification:** The backend must verify the Firebase ID token for every protected endpoint using the Firebase Admin SDK.
- **UID as Authority:** The Firebase UID, extracted from the verified token, is the sole identifier for a user.
- **Endpoint Protection:** All endpoints for viewing, creating, updating, or deleting todos are protected and require a valid Firebase ID token.

## 3. User Profile Management

### 3.1. Profile Data
- The application will display the following user profile information:
  - **Display Name:** User's display name.
  - **Email Address:** User's email address.
  - **Authentication Provider:** "Google" or "Email/Password".
  - **Profile Photo:** URL to the user's profile photo (if available from Google).

### 3.2. Profile Actions
- **View Profile:** Accessible via a user avatar in the UI.
- **Update Display Name:** Users can update their display name.
- **Change Password:**
  - **Email/Password Users:** Can change their password.
  - **Google Users:** Cannot change their password through the application.

## 4. Todo Ownership and Tracking

### 4.1. Todo Creation
- **Manual Creation:**
  - When a todo is created via the UI form, the backend will associate it with the Firebase UID from the token.
  - The `created_by` field in the todo document will be set to `"manual"`.
- **Agent-Based Creation:**
  - When a todo is created by the AI agent, the request must include the Firebase ID token.
  - The backend will associate the todo with the Firebase UID from the token.
  - The `created_by` field in the todo document will be set to `"agent"`.

### 4.2. Data Access
- **Ownership:** Users can only view, update, or delete todos that are associated with their Firebase UID.
- **Isolation:** Cross-user data access is strictly prohibited.

## 5. Agent Interaction Model

- **Authentication:** Agent-triggered requests to the backend must include the same Firebase ID token as user-initiated requests.
- **Authorization:** The backend will enforce the same authorization rules for agent-created todos as for manually created todos.

## 6. Error Handling

| Error State                 | Backend HTTP Status Code | Frontend Behavior                                  |
| --------------------------- | ------------------------ | -------------------------------------------------- |
| Invalid Credentials         | 401 Unauthorized         | Display "Invalid email or password."               |
| Expired Session             | 401 Unauthorized         | Redirect to login page.                            |
| Missing Token               | 401 Unauthorized         | Redirect to login page.                            |
| Invalid Token               | 401 Unauthorized         | Redirect to login page.                            |
| Unauthorized Resource Access| 403 Forbidden            | Display "You do not have permission to access this."|

## 7. Assumptions and Constraints

- **Firebase as Single Source of Truth:** Firebase Authentication is the only authentication system.
- **Stateless Backend:** The backend is stateless and relies on token-based authentication.
- **No Sensitive Data in localStorage:** No sensitive user data will be stored in `localStorage`.
- **Firebase Admin SDK:** The Firebase Admin SDK is the only mechanism for token verification on the backend.
- **Production-Ready:** The implementation must be secure and scalable.
- **Environment Parity:** Authentication logic must function identically in local and deployed environments.
