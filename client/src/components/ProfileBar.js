import { useRouter } from 'next/router';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import api from '../services/api';

const ProfileBar = () => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [user, setUser] = useState(false);
    const dropdownRef = useRef(null);
    const profileButtonRef = useRef(null);

    const router = useRouter();

    useEffect(() => {
        const fetchUser = async () => {
        try {
            let response = await api.get('http://localhost:5002/api/users/me', {
            withCredentials: true,
            });
            setUser(response.data);
        } catch (error) {
            if (error.response && error.response.status === 401) {
            try {
                const refreshResponse = await api.get('http://localhost:5002/api/token/refresh-token', { // NOTE: This is where the issue with CSRF Token happens
                withCredentials: true, // httpOnly cookies
                });
                if (refreshResponse) {
                // Retry the original request with the new access token
                const response = await api.get('http://localhost:5002/api/users/me', {
                    withCredentials: true, // EhttpOnly cookies
                });
                setUser(response.data);
                } else {
                // If refresh token is expired sent user to log in page. It will be 1 week just like session cookie so that they expire at the same time
                console.log('Refresh token expired or invalid. Please log in again.');
                router.replace('/login');
                }
            } catch (refreshError) {
                console.error('Error refreshing token:', refreshError);
            }
            } else {
            console.error('Error fetching user data:', error);
            }
        }
        };

        fetchUser();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
          if (dropdownRef.current && !dropdownRef.current.contains(event.target) && !profileButtonRef.current.contains(event.target)) {
            setIsProfileOpen(false);
          }
        };
    
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleProfileDetails = () => {
        setIsProfileOpen(!isProfileOpen);
    };

    const toggleNotifications = () => {
        setIsNotificationOpen(!isNotificationOpen);
    };

    const handleLogout = () => {
        window.location.href = 'http://localhost:5002/api/auth/logout';
    };

    const handleProfile = () => {
        window.location.href = `http://localhost:3002/profile/${user._id}`;
    };

  return (
    <div className='flex flex-row w-20 h-20 mr-4 bg-white items-center justify-end'>
        <div className='flex w-65 h-65 items-center justify-self-end'>
            <button onClick={toggleNotifications} className="flex flex-col items-center justify-end w-7 h-7 bg-transparent text-black rounded-lg hover:text-gray-200 active:text-gray-400">
                <Image
                    src='/images/notifications.png'
                    alt="Notifications"
                    width={65}
                    height={65}
                    className='w-36 h-36 rounded-full object-cover bg-white'
                />
            </button>
        </div>
        <div className='flex w-65 h-65 ml-4 mr-4'>
            <button onClick={toggleProfileDetails} className="flex flex-col items-center justify-end w-7 h-7 bg-transparent text-black rounded-lg hover:text-gray-200 active:text-gray-400" ref={profileButtonRef}>
                <Image
                    src={user.profile_picture || '/images/profilepic.png'}
                    alt="Profile Pic"
                    width={65}
                    height={65}
                    className='w-36 h-36 rounded-full object-cover bg-white'
                />
            </button>
            <div className={`absolute right-0 mt-12 mr-8 p-28 pt-24 pb-10 bg-white shadow-md shadow-black rounded-lg flex flex-col items-center justify-center ${isProfileOpen ? 'max-h-screen opacity-100 translate-y-0 pointer-events-auto' : 'max-h-0 opacity-0 -translate-y-5 pointer-events-none' } z-30`} ref={dropdownRef}>
                {user && (
                <>
                    <p className="mb-10 text-black font-semibold text-center whitespace-nowrap">Welcome, {user.first_name} {user.last_name}!</p>
                    <Image
                        src={user.profile_picture}
                        alt="Profile Pic"
                        width={120}
                        height={120}
                        className='w-36 h-36 m-8 mb-10 rounded-full object-cover bg-white'
                    />
                    <p className="text-black font-semibold text-center">{user.first_name} {user.last_name}</p>
                    <p className="text-black text-sm text-center">{user.email}</p>
                    <button onClick={handleProfile} className="mt-6 mb-10 px-12 py-2 border bg-black border-black rounded-lg font-bold text-lg hover:bg-gray-700 active:bg-gray-500 text-white cursor-pointer z-40">Profile</button>
                    <button onClick={handleLogout} className="mt-4 text-sm text-blue-700 hover:underline cursor-pointer z-1">Logout</button>
                </>
                )}
            </div>
        </div>
    </div>
  );
};

export default ProfileBar;