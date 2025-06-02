import React from 'react';
import { LogOutIcon, XIcon } from 'lucide-react';
export const LogoutModal = ({
  onConfirm,
  onCancel
}) => {
  return <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center animate-fade-in">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 transform transition-all duration-300 scale-100 animate-scale-in">
        <div className="text-center">
          <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <LogOutIcon size={32} className="text-pink-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Confirm Logout
          </h2>
          <p className="text-gray-500 mb-6">
            Are you sure you want to logout? Any unsaved changes will be lost.
          </p>
          <div className="flex space-x-4">
            <button onClick={onCancel} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200">
              Cancel
            </button>
            <button onClick={onConfirm} className="flex-1 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors duration-200">
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>;
};