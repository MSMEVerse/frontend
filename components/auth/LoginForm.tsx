'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Link from 'next/link';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['MSME', 'CREATOR']).optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const role = watch('role');

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    try {
      await login(data.email, data.password, data.role);
      toast.success('Login successful!');
      // Redirect based on role
      if (data.role === 'MSME') {
        router.push('/dashboard');
      } else if (data.role === 'CREATOR') {
        router.push('/dashboard');
      } else {
        router.push('/dashboard');
      }
    } catch (error: any) {
      toast.error(error?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          {...register('email')}
          className={errors.email ? 'border-red-500' : ''}
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="Enter your password"
          {...register('password')}
          className={errors.password ? 'border-red-500' : ''}
        />
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="role">Role (Optional)</Label>
        <Select
          value={role}
          onValueChange={(value) => setValue('role', value as 'MSME' | 'CREATOR')}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select your role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="MSME">MSME</SelectItem>
            <SelectItem value="CREATOR">Creator</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center justify-between">
        <Link
          href="/forgot-password"
          className="text-sm text-primary hover:underline"
        >
          Forgot password?
        </Link>
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </Button>

      <div className="text-center text-sm space-y-2">
        <div className="p-3 bg-muted rounded-md text-xs">
          <p className="font-semibold mb-1">Demo Credentials:</p>
          <p>Password: <code className="bg-background px-1 py-0.5 rounded">demo123</code></p>
          <p className="mt-1 text-muted-foreground">Use any email + select role, or use existing emails like:</p>
          <p className="text-muted-foreground">• <code className="bg-background px-1 py-0.5 rounded">msme@example.com</code> (MSME)</p>
          <p className="text-muted-foreground">• <code className="bg-background px-1 py-0.5 rounded">creator@example.com</code> (Creator)</p>
        </div>
        <div>
          Don't have an account?{' '}
          <Link href="/register" className="text-primary hover:underline">
            Register
          </Link>
        </div>
      </div>
    </form>
  );
}


