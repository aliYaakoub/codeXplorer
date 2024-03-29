'use client';

import Link from 'next/link';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import GoogleButton from '@/components/GoogleButton';
import GithubButton from '@/components/GithubButton';
import { Separator } from '@/components/ui/separator';
import { zodResolver } from '@hookform/resolvers/zod';
import LoadingButton from '@/components/LoadingButton';
import FormItemWrapper from '@/components/FormItemWrapper';
import { loginFormSchema, loginFormSchemaType } from '@/schemas/loginSchema';
import {
  Card,
  CardTitle,
  CardFooter,
  CardHeader,
  CardContent,
} from '@/components/ui/card';

export default function Auth() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const form = useForm<loginFormSchemaType>({
    resolver: zodResolver(loginFormSchema),
  });

  form.watch();

  const onSubmit = async (values: loginFormSchemaType) => {
    console.log(values);
  };

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
                <FormItemWrapper
                  required
                  name='email'
                  label='Email'
                  control={form.control}
                >
                  {({ field }) => <Input placeholder='Email' {...field} />}
                </FormItemWrapper>
                <FormItemWrapper
                  required
                  name='password'
                  label='Password'
                  control={form.control}
                >
                  {({ field }) => <Input placeholder='Password' {...field} />}
                </FormItemWrapper>
                <p className='text-sm text-center'>
                  Don&apos;t have an account?
                  <Link href={'/auth/signup'} className='px-1 text-primary'>
                    Signup
                  </Link>
                </p>
                <div className='flex items-center gap-2'>
                  <Separator className='w-auto flex-grow' />
                  <p className='text-slate-500 text-sm'>OR</p>
                  <Separator className='w-auto flex-grow' />
                </div>
                <GoogleButton />
                <GithubButton />
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
