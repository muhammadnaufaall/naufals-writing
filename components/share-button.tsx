'use client';
import { toast } from 'sonner';
import { Icons } from './icons';
import { Button, ButtonProps } from './ui/button';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { useState } from 'react';

interface ShareButtonProps extends Omit<ButtonProps, 'children'> {}

function ShareButton(props: ShareButtonProps) {
  const [open, setOpen] = useState(false);
  function handleCopy() {
    toast('Link copied to clipboard');
    navigator.clipboard.writeText(window.location.href);
    setOpen(false);
  }
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" {...props}>
          Share <Icons.share className="h-4 w-4 ml-2" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-full p-0">
        <div
          onClick={handleCopy}
          className="text-xs lg:text-sm cursor-pointer py-2 px-3"
        >
          Copy to clipboard
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default ShareButton;
