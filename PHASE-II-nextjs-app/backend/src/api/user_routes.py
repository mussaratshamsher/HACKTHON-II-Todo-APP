from fastapi import APIRouter, Depends, HTTPException, status
from firebase_admin import auth
from ..auth.dependencies import get_current_user

router = APIRouter()

@router.get("/me", response_model=dict)
async def read_users_me(current_user: dict = Depends(get_current_user)):
    """
    Get current user's information from the Firebase ID token.
    """
    return current_user

@router.post("/logout")
async def logout_user(current_user: dict = Depends(get_current_user)):
    """
    Endpoint for user logout.
    For Firebase ID tokens, client-side discard of the token is usually sufficient.
    This endpoint can be extended to revoke refresh tokens if managed server-side.
    """
    # Firebase ID tokens are typically short-lived and self-validating.
    # Revoking them directly on the backend is not straightforward without
    # custom session management or revoking refresh tokens.
    # For now, this endpoint serves as a signal that the client should
    # clear its token.
    # If custom session management is implemented (e.g., storing refresh tokens),
    # this is where they would be revoked.

    # Example of revoking refresh tokens (requires user's uid)
    # try:
    #     auth.revoke_refresh_tokens(current_user["uid"])
    #     return {"message": "Successfully logged out and revoked refresh tokens"}
    # except Exception as e:
    #     raise HTTPException(
    #         status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
    #         detail=f"Failed to revoke refresh tokens: {e}"
    #     )
    return {"message": "Logout successful (client should clear token)"}
