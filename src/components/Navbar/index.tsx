'use client';

import Link from 'next/link';
import { MessageCircle, User, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { logoutAction } from '@/features/sign-in/actions/logout';

interface NavbarProps {
  isAuthenticated?: boolean;
  userName?: string;
}

const Navbar = ({ isAuthenticated = false, userName }: NavbarProps) => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    const confirmed = window.confirm('Apakah Anda yakin ingin keluar dari akun?');
    
    if (confirmed && !isLoggingOut) {
      setIsLoggingOut(true);
      
      try {
        const result = await logoutAction();
        
        if (result.success) {
          // Close the profile menu
          setIsProfileMenuOpen(false);
          
          // Redirect to home page
          router.push('/');
          router.refresh();
        } else {
          console.error('Logout gagal:', result.error);
          alert('Gagal logout: ' + (result.error || 'Kesalahan tidak diketahui'));
        }
      } catch (error) {
        console.error('Logout gagal:', error);
        alert('Terjadi kesalahan saat logout. Silakan coba lagi.');
      } finally {
        setIsLoggingOut(false);
      }
    }
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
            <MessageCircle className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">KonfQ</span>
          </Link>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors duration-200"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Desktop Navigation Items */}
          <div className="hidden md:flex items-center space-x-4">
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
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
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
                        onClick={handleLogout}
                        disabled={isLoggingOut}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-700 hover:bg-red-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isLoggingOut ? (
                          <>
                            <div className="w-4 h-4 mr-2 animate-spin border-2 border-red-600 border-t-transparent rounded-full"></div>
                            Sedang Keluar...
                          </>
                        ) : (
                          <>
                            <LogOut className="w-4 h-4 mr-2" />
                            Keluar
                          </>
                        )}
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
                  href="/sign-up"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105"
                >
                  Daftar Gratis
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute w-full">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200 shadow-lg">
            {isAuthenticated ? (
              <>
                {/* User Info */}
                <div className="px-3 py-2 text-sm text-gray-900 border-b border-gray-100">
                  <div className="font-medium">{userName || 'Pengguna'}</div>
                  <div className="text-gray-500">Pengelola Konferensi</div>
                </div>

                <Link
                  href="/conferences"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Konferensi
                </Link>
                
                <Link
                  href="/conferences/create"
                  className="block px-3 py-2 rounded-md text-base font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200 mx-3"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Buat Konferensi
                </Link>

                <Link
                  href="/conferences"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Konferensi Saya
                </Link>
                
                <Link
                  href="/profile"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Pengaturan Profil
                </Link>
                
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleLogout();
                  }}
                  disabled={isLoggingOut}
                  className="flex items-center w-full px-3 py-2 rounded-md text-base font-medium text-red-700 hover:bg-red-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoggingOut ? (
                    <>
                      <div className="w-4 h-4 mr-2 animate-spin border-2 border-red-600 border-t-transparent rounded-full"></div>
                      Sedang Keluar...
                    </>
                  ) : (
                    <>
                      <LogOut className="w-4 h-4 mr-2" />
                      Keluar
                    </>
                  )}
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/conferences"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Jelajahi Konferensi
                </Link>
                
                <Link
                  href="/auth"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Masuk
                </Link>
                
                <Link
                  href="/sign-up"
                  className="block px-3 py-2 rounded-md text-base font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200 mx-3"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Daftar Gratis
                </Link>
              </>
            )}
          </div>
        </div>
      )}

      {/* Mobile Menu Overlay */}
      {(isProfileMenuOpen || isMobileMenuOpen) && (
        <div 
          className="fixed inset-0 z-40"
          onClick={() => {
            setIsProfileMenuOpen(false);
            setIsMobileMenuOpen(false);
          }}
        />
      )}
    </nav>
  );
};

export default Navbar;