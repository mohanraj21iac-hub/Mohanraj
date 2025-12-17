import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Zap, ShoppingCart, User, Menu } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount }) => {
  const location = useLocation();
  const isBusiness = location.pathname.includes('/admin') || location.pathname.includes('/business');

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight text-gray-900">SeaCharge</span>
            </Link>
            <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
              <Link to="/" className="border-transparent text-gray-500 hover:border-blue-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Personal
              </Link>
              <Link to="/business" className="border-transparent text-gray-500 hover:border-blue-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Business
              </Link>
              {isBusiness && (
                <Link to="/admin" className="border-transparent text-gray-500 hover:border-blue-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Admin Dashboard
                </Link>
              )}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/checkout" className="relative p-2 text-gray-400 hover:text-gray-500">
              <span className="sr-only">View notifications</span>
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
            <Link to="/dashboard" className="p-2 text-gray-400 hover:text-gray-500">
              <User className="h-6 w-6" />
            </Link>
            <div className="sm:hidden p-2 text-gray-400">
                <Menu className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};