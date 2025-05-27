import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Camera, Save } from 'lucide-react';
import MobileSidebar from '../../components/MobileSidebar';
import axios from 'axios';

const Profile: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [profilePhoto, setProfilePhoto] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Fetch user data on component mount
  useEffect(() => {
    if (user) {
      setUsername(user.username || '');
      setEmail(user.email || '');
      setDob(user.dob ? new Date(user.dob).toISOString().split('T')[0] : '');
      setProfilePhoto(user.profilePhoto || '');
    }
  }, [user]);

  // Handle profile update
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const updatedData = {
        username,
        dob,
        profilePhoto,
      };
      
      // Call backend API to update profile
      await axios.put(`http://localhost:5000/api/users/${user._id}`, updatedData, {
        headers: { 'Content-Type': 'application/json' },
      });
      
      // Update local user data
      updateProfile(updatedData);
      
      setSuccess('Profile updated successfully!');
      
      // Clear success message after 2 seconds
      setTimeout(() => {
        setSuccess(null);
      }, 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update profile. Please try again.');
      console.error('Profile update error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleProfilePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; 
    if (!file) return; 
  
    try {
      setLoading(true); 
      setError(null); 
  
      const allowedTypes = ['image/jpeg', 'image/png'];
  
      if (!allowedTypes.includes(file.type)) {
        setError('Please upload a JPEG or PNG image.');
        return;
      }
  
      // Validate file size (e.g., 5MB limit)
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        setError('File size must be less than 5MB.');
        return;
      }
  
      // Create FormData object and append the file and userId
      const formData = new FormData();
      formData.append('file', file);
      formData.append('userId', user?._id || ''); 
  
      // Upload file to the server
      const response = await axios.post('http://localhost:5000/api/upload-profile-photo', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
  
      // Check if the response contains the URL of the uploaded file
      if (!response.data.url) {
        throw new Error('Failed to retrieve the uploaded file URL.');
      }
  
      // Update profile photo URL in the state
      setProfilePhoto(response.data.url);
  
      // Show success message
      setSuccess('Profile photo updated successfully!');
  
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess(null);
      }, 3000);
    } catch (err: any) {
      // Handle errors
      setError(
        err.response?.data?.message ||
        err.message ||
        'Failed to upload profile photo. Please try again.'
      );
      console.error('Profile photo upload error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle password change
  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();

    const currentPassword = (document.getElementById('currentPassword') as HTMLInputElement).value;
    const newPassword = (document.getElementById('newPassword') as HTMLInputElement).value;
    const confirmPassword = (document.getElementById('confirmPassword') as HTMLInputElement).value;

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match.');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Call backend API to change password
      await axios.post('http://localhost:5000/api/auth/change-password', {
        userId: user?._id,
        currentPassword,
        newPassword,
      });

      setSuccess('Password updated successfully!');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update password. Please try again.');
      console.error('Password change error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="md:hidden mb-4">
          <MobileSidebar />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Profile</h1>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          {error && (
            <div className="mb-6 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 rounded-md">
              {error}
            </div>
          )}
          
          {success && (
            <div className="mb-6 p-3 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-100 rounded-md">
              {success}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3 mb-6 md:mb-0">
                <div className="flex flex-col items-center">
                  <div className="relative">
                    <div className="h-32 w-32 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                      {profilePhoto ? (
                        <img 
                          src={profilePhoto} 
                          alt="Profile" 
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center">
                          <span className="text-gray-400 dark:text-gray-500 text-4xl">
                            {username.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      )}
                    </div>
                    <label htmlFor="profilePhoto" className="absolute bottom-0 right-0 bg-green-600 hover:bg-green-700 text-white rounded-full p-2 cursor-pointer">
                      <Camera className="h-5 w-5" />
                      <input
                        type="file"
                        id="profilePhoto"
                        accept="image/*"
                        onChange={handleProfilePhotoChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Click the camera icon to upload a profile photo
                  </p>
                </div>
              </div>
              
              <div className="md:w-2/3 md:pl-8">
                <div className="mb-4">
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-400"
                  />
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Email cannot be changed as it's used for account identification
                  </p>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="dob" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    id="dob"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                  >
                    {loading ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Saving...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <Save className="mr-2 h-5 w-5" />
                        Save Changes
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
        
        {/* Account Security */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mt-8">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Account Security</h2>
          
          <form onSubmit={handlePasswordChange}>
            <div className="mb-6">
              <h3 className="text-md font-medium text-gray-800 dark:text-gray-200 mb-2">Change Password</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                It's a good idea to use a strong password that you don't use elsewhere
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    id="currentPassword"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Enter current password"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Enter new password"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Confirm new password"
                    required
                  />
                </div>
              </div>
              
              <div className="mt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Update Password
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;