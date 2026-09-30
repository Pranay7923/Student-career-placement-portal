import React, { createContext, useContext, useState, useEffect } from 'react';
import { getItem, setItem, STORAGE_KEYS, initializeStorage } from '../utils/storage';
import { initialSeedData } from '../data/initialSeedData';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize storage and load current user on mount
  useEffect(() => {
    initializeStorage();
    const user = getItem(STORAGE_KEYS.CURRENT_USER);
    if (user) {
      setCurrentUser(user);
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    const users = getItem(STORAGE_KEYS.USERS, initialSeedData.users);
    const foundUser = users.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (foundUser) {
      setCurrentUser(foundUser);
      setItem(STORAGE_KEYS.CURRENT_USER, foundUser);
      return { success: true, user: foundUser };
    }

    return { success: false, message: 'Invalid email or password. Please check your credentials.' };
  };

  const loginDemo = (role = 'student') => {
    const users = getItem(STORAGE_KEYS.USERS, initialSeedData.users);
    const targetUser = users.find(u => u.role === role) || (role === 'admin' ? initialSeedData.users[2] : initialSeedData.users[0]);
    if (targetUser) {
      setCurrentUser(targetUser);
      setItem(STORAGE_KEYS.CURRENT_USER, targetUser);
      return { success: true, user: targetUser };
    }
    return { success: false, message: 'Demo account not found.' };
  };

  const register = ({ name, email, password, college, branch, year }) => {
    const users = getItem(STORAGE_KEYS.USERS, initialSeedData.users);
    const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (existing) {
      return { success: false, message: 'An account with this email address already exists.' };
    }

    const newUserId = 'usr_' + Date.now();
    const newUser = {
      id: newUserId,
      name,
      email,
      password,
      role: 'student',
      college,
      branch,
      year,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`,
      createdAt: new Date().toISOString()
    };

    // Save in users list
    const updatedUsers = [...users, newUser];
    setItem(STORAGE_KEYS.USERS, updatedUsers);

    // Initialize student profile
    const profiles = getItem(STORAGE_KEYS.STUDENT_PROFILES, {});
    profiles[newUserId] = {
      id: newUserId,
      fullName: name,
      email,
      phone: '',
      college,
      branch,
      year,
      semester: '1st Semester',
      cgpa: '',
      location: '',
      linkedin: '',
      github: '',
      portfolio: '',
      bio: '',
      careerObjective: '',
      achievements: []
    };
    setItem(STORAGE_KEYS.STUDENT_PROFILES, profiles);

    // Log the new user in
    setCurrentUser(newUser);
    setItem(STORAGE_KEYS.CURRENT_USER, newUser);

    return { success: true, user: newUser };
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  };

  const updateCurrentUser = (updatedFields) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...updatedFields };
    setCurrentUser(updated);
    setItem(STORAGE_KEYS.CURRENT_USER, updated);

    // Update in users array
    const users = getItem(STORAGE_KEYS.USERS, []);
    const updatedUsers = users.map(u => u.id === currentUser.id ? updated : u);
    setItem(STORAGE_KEYS.USERS, updatedUsers);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        loading,
        login,
        loginDemo,
        register,
        logout,
        updateCurrentUser,
        isAuthenticated: !!currentUser,
        isAdmin: currentUser?.role === 'admin'
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
