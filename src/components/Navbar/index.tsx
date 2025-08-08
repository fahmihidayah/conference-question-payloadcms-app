'use client';

import Link from 'next/link';
import { MessageCircle, User, LogOut } from 'lucide-react';
import { useState } from 'react';

interface NavbarProps {
  isAuthenticated?: boolean;
  userName?: string;
}

const Navbar = ({ isAuthenticated = false, userName }: NavbarProps) => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const onLogout = () => {

  }

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
            <MessageCircle className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">KonfQ</span>
          </Link>

          {/* Navigation Items */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                {/* Authenticated User Menu */}
                <Link
                  href="/conferences"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md font-medium transition-colors duration-200"
                >
                  Konferensi
                </Link>
                
                <Link
                  href="/conferences/create"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                >
                  Buat Konferensi
                </Link>

                {/* User Profile Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                    className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md font-medium transition-colors duration-200"
                  >
                    <User className="w-5 h-5" />
                    <span>{userName || 'Pengguna'}</span>
                  </button>

                  {/* Dropdown Menu */}
                  {isProfileMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1">
                      <div className="px-4 py-2 text-sm text-gray-900 border-b border-gray-100">
                        <div className="font-medium">{userName || 'Pengguna'}</div>
                        <div className="text-gray-500">Pengelola Konferensi</div>
                      </div>
                      
                      <Link
                        href="/conferences"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
                        Konferensi Saya
                      </Link>
                      
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
                        Pengaturan Profil
                      </Link>
                      
                      <button
                        onClick={() => {
                          setIsProfileMenuOpen(false);
                          onLogout?.();
                        }}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-700 hover:bg-red-50 transition-colors duration-200"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Keluar
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                {/* Guest Navigation */}
                <Link
                  href="/conferences"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md font-medium transition-colors duration-200"
                >
                  Jelajahi Konferensi
                </Link>
                
                <Link
                  href="/auth"
                  className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md font-medium transition-colors duration-200"
                >
                  Masuk
                </Link>
                
                <Link
                  href="/auth"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105"
                >
                  Daftar Gratis
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isProfileMenuOpen && (
        <div 
          className="fixed inset-0 z-40"
          onClick={() => setIsProfileMenuOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;