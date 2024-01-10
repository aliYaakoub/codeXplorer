import React from 'react';
import { Loader2 } from 'lucide-react';
import { Button, ButtonProps } from './ui/button';

interface Props extends ButtonProps {
  label: string;
  isLoading: boolean;
}

const LoadingButton: React.FC<Props> = ({ isLoading, label, ...props }) => {
  return (
    <Button disabled={isLoading} {...props}>
      {isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
      {label}
    </Button>
  );
};

export default LoadingButton;
