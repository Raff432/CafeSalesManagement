import React, { useState } from 'react';
import { LayoutDashboardIcon, CoffeeIcon, UtensilsIcon, HistoryIcon, LogOutIcon, MenuIcon, UserIcon, SettingsIcon } from 'lucide-react';
import { SettingsPanel } from './SettingsPanel';
import { LogoutModal } from './LogoutModal';
export const Layout = ({
  children,
  user,
  onLogout,
  activeSection,
  onSectionChange
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const handleLogout = () => {
    setShowLogoutModal(true);
  };
  const confirmLogout = () => {
    setShowLogoutModal(false);
    onLogout();
  };
  const menuItems = [{
    id: 'dashboard',
    icon: LayoutDashboardIcon,
    label: 'Dashboard'
  }, {
    id: 'drinks',
    icon: CoffeeIcon,
    label: 'Drinks'
  }, {
    id: 'food',
    icon: UtensilsIcon,
    label: 'Food'
  }, {
    id: 'history',
    icon: HistoryIcon,
    label: 'History'
  }];
  return <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white border-b px-4 py-3 flex items-center justify-between">
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-500 hover:text-gray-700">
          <MenuIcon size={24} />
        </button>
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
            <UserIcon size={20} className="text-pink-600" />
          </div>
          <span className="font-medium">{user.name}</span>
        </div>
      </div>
      {/* Sidebar */}
      <aside className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-white border-r transform transition-transform duration-200 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}>
        <div className="h-full flex flex-col">
          <div className="p-4 border-b">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <img src="/pasted-image.jpg" alt="Coffee Cloud Logo" className="w-full h-full object-cover" />
              </div>
              <div>
                <h1 className="font-bold text-xl">Cloud Coffee</h1>
                <p className="text-sm text-gray-500">{user.role}</p>
              </div>
            </div>
          </div>
          <nav className="flex-1 p-4 space-y-1">
            {menuItems.map(item => <button key={item.id} onClick={() => {
            onSectionChange(item.id);
            setIsMobileMenuOpen(false);
          }} className={`
                  w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200
                  ${activeSection === item.id ? 'bg-pink-100 text-pink-600' : 'text-gray-600 hover:bg-gray-100'}
                `}>
                <item.icon size={20} />
                <span>{item.label}</span>
              </button>)}
          </nav>
          <div className="p-4 border-t space-y-2">
            <button onClick={() => setIsSettingsOpen(true)} className="w-full flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200">
              <SettingsIcon size={20} />
              <span>Settings</span>
            </button>
            <button onClick={handleLogout} className="w-full flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200">
              <LogOutIcon size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>
      {/* Main Content */}
      <main className={`lg:ml-64 min-h-screen transition-all duration-200`}>
        <div className="p-6">{children}</div>
      </main>
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsMobileMenuOpen(false)} />}
      {/* Settings Panel */}
      {isSettingsOpen && <SettingsPanel user={user} onClose={() => setIsSettingsOpen(false)} />}
      {/* Logout Modal */}
      {showLogoutModal && <LogoutModal onConfirm={confirmLogout} onCancel={() => setShowLogoutModal(false)} />}
    </div>;
};