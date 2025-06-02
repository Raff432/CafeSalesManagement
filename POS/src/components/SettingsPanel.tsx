import React, { useState } from 'react';
import { UserIcon, BellIcon, EyeIcon, SaveIcon, CheckCircleIcon } from 'lucide-react';
import { useFontSize } from '../contexts/FontSizeContext';
import { toast } from 'sonner';
export const SettingsPanel = ({
  user,
  onClose
}) => {
  const {
    fontSize,
    setFontSize
  } = useFontSize();
  const [settings, setSettings] = useState({
    notifications: true
  });
  const handleSave = () => {
    toast.success('Settings saved successfully!');
    onClose();
  };
  return <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end transition-opacity duration-300">
      <div className="bg-white w-full max-w-md h-full shadow-lg">
        <div className="h-full flex flex-col">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">Settings</h2>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                ×
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                Profile
              </h3>
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center">
                  <UserIcon size={32} className="text-pink-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">{user.name}</p>
                  <p className="text-gray-500 capitalize">{user.role}</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                Notifications
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between bg-gray-50 p-4 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <BellIcon className="text-gray-600" size={20} />
                    <span className="font-medium text-gray-700">
                      Push Notifications
                    </span>
                  </div>
                  <button onClick={() => setSettings(s => ({
                  ...s,
                  notifications: !s.notifications
                }))} className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 ${settings.notifications ? 'bg-pink-600' : 'bg-gray-300'}`}>
                    <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform duration-200 ${settings.notifications ? 'translate-x-6' : 'translate-x-0'}`} />
                  </button>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                Accessibility
              </h3>
              <div className="space-y-4 bg-gray-50 p-4 rounded-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <EyeIcon className="text-gray-600" size={20} />
                    <span className="font-medium text-gray-700">Font Size</span>
                  </div>
                  <select value={fontSize} onChange={e => setFontSize(e.target.value as 'small' | 'medium' | 'large')} className="bg-white border border-gray-300 rounded-lg px-3 py-1">
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="p-6 border-t border-gray-200">
            <button onClick={handleSave} className="w-full bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 transition-colors duration-200 flex items-center justify-center space-x-2">
              <SaveIcon size={20} />
              <span>Save Changes</span>
            </button>
          </div>
        </div>
      </div>
    </div>;
};