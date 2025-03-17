'use client';

import Link from 'next/link';
import { Search, Heart } from 'lucide-react';

interface FABProps {
  type: 'search' | 'favorites';
}

export function FloatingActionButton({ type }: FABProps) {
  const Icon = type === 'search' ? Search : Heart;
  const href = `/${type}`;
  const bgColor =
    type === 'search'
      ? 'bg-blue-500 hover:bg-blue-600'
      : 'bg-pink-500 hover:bg-pink-600';

  return (
    <Link
      href={href}
      className={`fixed bottom-4 right-4 ${bgColor} text-white p-4 rounded-full shadow-lg z-40 transition-transform hover:scale-110`}
    >
      <Icon size={24} />
    </Link>
  );
}
