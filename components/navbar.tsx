import React from 'react';
import { ThemeToggle } from './theme-toggle';
import Link from 'next/link';

function Navbar() {
  return (
    <nav className="container max-w-3xl py-2 lg:py-4 flex justify-between border-b items-center">
      <Link href="/">
        <h3 className="lg:text-xl text-base font-semibold">Naufaliswriting.</h3>
      </Link>
      <ThemeToggle />
    </nav>
  );
}

export default Navbar;
