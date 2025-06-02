import React, { useState } from 'react';
import { LockIcon, UserIcon } from 'lucide-react';
export const LoginPage = ({
  onLogin
}) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const handleSubmit = e => {
    e.preventDefault();
    if (credentials.username === 'admin' && credentials.password === 'password') {
      onLogin({
        name: 'Admin User',
        role: 'admin'
      });
    } else if (credentials.username === 'staff' && credentials.password === 'password') {
      onLogin({
        name: 'Staff User',
        role: 'staff'
      });
    } else {
      setError('Invalid credentials');
    }
  };
  return <div className="min-h-screen bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
              <img src="/pasted-image.jpg" alt="Cloud Coffee Logo" className="w-full h-full object-cover" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">
              Welcome to Cloud Coffee
            </h1>
            <p className="text-gray-500 mt-2">Sign in to your account</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserIcon size={20} className="text-gray-400" />
                </div>
                <input type="text" value={credentials.username} onChange={e => setCredentials({
                ...credentials,
                username: e.target.value
              })} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500" placeholder="Enter your username" required />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockIcon size={20} className="text-gray-400" />
                </div>
                <input type="password" value={credentials.password} onChange={e => setCredentials({
                ...credentials,
                password: e.target.value
              })} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500" placeholder="Enter your password" required />
              </div>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button type="submit" className="w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700 transition-colors duration-200">
              Sign In
            </button>
          </form>
          <div className="mt-6 text-center text-sm text-gray-500">
            <p>Demo Accounts:</p>
            <p>admin/password or staff/password</p>
          </div>
        </div>
      </div>
    </div>;
};