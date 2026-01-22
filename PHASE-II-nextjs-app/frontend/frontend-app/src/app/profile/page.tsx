'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { updateProfile, updatePassword, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { toast } from 'react-hot-toast';
import { apiClient } from '@/services/api-client';

const ProfilePage = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [email, setEmail] = useState(user?.email || ''); // Email is usually not directly editable this way via Firebase
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login'); // Redirect to login if not authenticated
    }
    if (user) {
      setDisplayName(user.displayName || '');
      setEmail(user.email || '');
    }
  }, [user, loading, router]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsUpdatingProfile(true);
    try {
      await updateProfile(user, { displayName });
      toast.success('Profile updated successfully!');
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast.error(`Error updating profile: ${error.message}`);
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    if (newPassword !== confirmPassword) {
      toast.error('New password and confirm password do not match.');
      return;
    }
    if (newPassword.length < 6) {
      toast.error('Password should be at least 6 characters.');
      return;
    }

    setIsUpdatingPassword(true);
    try {
      await updatePassword(user, newPassword);
      toast.success('Password updated successfully! Please re-login.');
      // After password change, Firebase recommends re-authenticating the user
      // or signing them out for security reasons.
      // For simplicity, we'll sign them out and redirect to login.
      await signOut(auth);
      await apiClient.post('/users/logout', {}); // Inform backend about logout
      router.push('/login');
    } catch (error: any) {
      console.error('Error updating password:', error);
      toast.error(`Error updating password: ${error.message}. Please re-authenticate.`);
    } finally {
      setIsUpdatingPassword(false);
      setNewPassword('');
      setConfirmPassword('');
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth); // Firebase client-side logout
      await apiClient.post('/users/logout', {}); // Backend logout
      toast.success('Logged out successfully!');
      router.push('/login');
    } catch (error) {
      console.error('Error during logout:', error);
      toast.error('Error logging out.');
    }
  };

  if (loading) {
    return <div className="text-center text-white text-lg">Loading profile...</div>;
  }

  if (!user) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="container mx-auto p-4 md:p-8 bg-gray-800 rounded-lg shadow-xl max-w-2xl mt-10">
      <h1 className="text-3xl font-bold text-white mb-6 text-center">User Profile</h1>

      <div className="flex flex-col items-center mb-8">
        {user.photoURL && (
          <img
            src={user.photoURL}
            alt="Profile"
            className="w-24 h-24 rounded-full mb-4 object-cover border-4 border-primary"
            referrerPolicy="no-referrer"
          />
        )}
        <p className="text-xl font-semibold text-white">{user.displayName || 'N/A'}</p>
        <p className="text-gray-400">{user.email}</p>
      </div>

      <div className="space-y-8">
        {/* Update Display Name Form */}
        <div className="bg-gray-700 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-white mb-4">Update Profile</h2>
          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div>
              <label htmlFor="displayName" className="block text-gray-300 text-sm font-bold mb-2">
                Display Name
              </label>
              <input
                type="text"
                id="displayName"
                className="shadow appearance-none border border-gray-600 rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline bg-gray-900"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200"
              disabled={isUpdatingProfile}
            >
              {isUpdatingProfile ? 'Updating...' : 'Update Display Name'}
            </button>
          </form>
        </div>

        {/* Update Password Form */}
        <div className="bg-gray-700 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-white mb-4">Change Password</h2>
          <form onSubmit={handleUpdatePassword} className="space-y-4">
            <div>
              <label htmlFor="newPassword" className="block text-gray-300 text-sm font-bold mb-2">
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                className="shadow appearance-none border border-gray-600 rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline bg-gray-900"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-gray-300 text-sm font-bold mb-2">
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="shadow appearance-none border border-gray-600 rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline bg-gray-900"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200"
              disabled={isUpdatingPassword}
            >
              {isUpdatingPassword ? 'Changing Password...' : 'Change Password'}
            </button>
          </form>
        </div>

        {/* Logout Button */}
        <div className="text-center mt-8">
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-full focus:outline-none focus:shadow-outline transition-colors duration-200 text-lg"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;