'use client';

import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import { Icons } from './icons';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { ReactNode, useState } from 'react';

export function ThemeToggle() {
  const { setTheme } = useTheme();

  const [open, setOpen] = useState(false);

  function PopoverItem({
    children,
    onClick,
  }: {
    children: ReactNode;
    onClick: () => void;
  }) {
    return (
      <div
        className="text-sm px-3 py-1 cursor-pointer hover:bg-muted rounded"
        onClick={() => {
          onClick();
          setOpen(false);
        }}
      >
        {children}
      </div>
    );
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon">
          <Icons.sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Icons.moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-full p-0">
        <div className="p-2">
          <PopoverItem onClick={() => setTheme('light')}>Light</PopoverItem>
          <PopoverItem onClick={() => setTheme('dark')}>Dark</PopoverItem>
          <PopoverItem onClick={() => setTheme('system')}>System</PopoverItem>
        </div>
      </PopoverContent>
    </Popover>
  );
}
