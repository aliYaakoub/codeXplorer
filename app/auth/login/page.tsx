'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import LoadingButton from '@/components/LoadingButton';
import { loginFormSchema, loginFormSchemaType } from '@/schemas/loginSchema';
import {
  Card,
  CardTitle,
  CardFooter,
  CardHeader,
  CardContent,
} from '@/components/ui/card';
import {
  Form,
  FormItem,
  FormLabel,
  FormField,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import Link from 'next/link';
import { Separator } from '@radix-ui/react-select';
import GoogleButton from '@/components/GoogleButton';

export default function Auth() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const form = useForm<loginFormSchemaType>({
    resolver: zodResolver(loginFormSchema),
  });

  form.watch();

  function onSubmit(values: loginFormSchemaType) {
    console.log(values);
  }

  return (
    <div className='flex justify-center items-center min-h-screen p-5'>
      <Card className='w-[350px]'>
        <CardHeader>
          <CardTitle className='text-center'>Please Login</CardTitle>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <CardContent>
              <div className='grid w-full items-center gap-4'>
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder='Email' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input placeholder='Password' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <p className='text-sm text-center'>
                  Don&apos;t have an account?
                  <Link href={'/auth/signup'} className='px-1 text-primary'>
                    Signup
                  </Link>
                </p>
                <div className='flex items-center gap-2'>
                  <Separator className='bg-gray-300 w-full h-[0.5px]' />
                  <p className='text-gray-600 text-sm'>OR</p>
                  <Separator className='bg-gray-300 w-full h-[0.5px]' />
                </div>
                <GoogleButton />
              </div>
            </CardContent>
            <CardFooter className='flex justify-end'>
              <LoadingButton
                type='submit'
                label='Submit'
                isLoading={isLoading}
              />
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
