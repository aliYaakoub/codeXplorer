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
import { signupFormSchema, signupFormSchemaType } from '@/schemas/signupSchema';
import {
  Card,
  CardTitle,
  CardFooter,
  CardHeader,
  CardContent,
} from '@/components/ui/card';
import {
  Select,
  SelectItem,
  SelectValue,
  SelectContent,
  SelectTrigger,
} from '@/components/ui/select';

export default function Auth() {
  const [file, setFile] = React.useState<File | undefined>();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const form = useForm<signupFormSchemaType>({
    resolver: zodResolver(signupFormSchema),
  });

  const onSubmit = async (values: signupFormSchemaType) => {
    setIsLoading(true);
    try {
      console.log(values);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };

  const handleSetFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) return;

    // reject files bigger than 50 MB
    if (selectedFile.size > 50 * 1024 * 1024) {
      form.setError('profile-image', {
        message: 'image is too big',
      });
    } else {
      setFile(selectedFile);
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen p-5'>
      <Card className='w-[650px]'>
        <CardHeader>
          <CardTitle className='text-center'>Create an account</CardTitle>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <CardContent>
              <div className='grid w-full items-center gap-4'>
                <div className='grid sm:grid-cols-2 gap-4'>
                  <FormItemWrapper
                    name='profile-image'
                    label='profile Image'
                    control={form.control}
                  >
                    {() => (
                      <Input
                        type='file'
                        accept='.jpg,.png,.jpeg'
                        onChange={handleSetFile}
                      />
                    )}
                  </FormItemWrapper>
                  <FormItemWrapper
                    required
                    name='username'
                    label='Username'
                    control={form.control}
                  >
                    {({ field }) => <Input placeholder='Username' {...field} />}
                  </FormItemWrapper>

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
                  <FormItemWrapper
                    required
                    name='confirmation-password'
                    label='Confirm Password'
                    control={form.control}
                  >
                    {({ field }) => (
                      <Input placeholder='Confirm Password' {...field} />
                    )}
                  </FormItemWrapper>
                  <FormItemWrapper
                    required
                    name='gender'
                    label='Gender'
                    control={form.control}
                  >
                    {({ field: { onChange, ...field } }) => (
                      <Select onValueChange={onChange} {...field}>
                        <SelectTrigger>
                          <SelectValue placeholder='Gender' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='Male'>Male</SelectItem>
                          <SelectItem value='Female'>Female</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  </FormItemWrapper>
                </div>
                <p className='text-sm text-center'>
                  Already have an account?
                  <Link href={'/auth/login'} className='px-1 text-primary'>
                    Login
                  </Link>
                </p>
                <div className='flex items-center gap-2'>
                  <Separator className='w-auto flex-grow' />
                  <p className='text-slate-500 text-sm'>OR</p>
                  <Separator className='w-auto flex-grow' />
                </div>
                <div className='grid sm:grid-cols-2 gap-4'>
                  <GoogleButton />
                  <GithubButton />
                </div>
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
