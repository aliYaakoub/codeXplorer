import {
  FormItem,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
} from './ui/form';
import React from 'react';
import {
  Control,
  UseFormStateReturn,
  ControllerFieldState,
  ControllerRenderProps,
} from 'react-hook-form';

interface Iprops {
  name: string;
  label: string;
  required?: boolean;
  control: Control<any>;
  children: (form: {
    field: ControllerRenderProps<any, string>;
    fieldState: ControllerFieldState;
    formState: UseFormStateReturn<any>;
  }) => React.ReactNode;
}

const FormItemWrapper: React.FC<Iprops> = ({
  name,
  label,
  control,
  children,
  required = false,
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={(form) => (
        <FormItem>
          <FormLabel>
            {label}
            {required && <span className='text-red-500'>*</span>}
          </FormLabel>
          <FormControl>{children(form)}</FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormItemWrapper;
