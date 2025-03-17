'use client';

import Link from 'next/link';
import { Search, Heart } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="font-bold text-xl text-blue-600 hover:text-blue-700"
          >
            Cocktail Explorer
          </Link>
          <div className="flex space-x-4">
            <Link
              href="/search"
              className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md"
            >
              <Search size={20} />
              <span>Search</span>
            </Link>
            <Link
              href="/favorites"
              className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md"
            >
              <Heart size={20} />
              <span>Favorites</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
