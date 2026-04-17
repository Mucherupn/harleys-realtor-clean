import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function AdminLoginPage() {
  return (
    <div className="mx-auto max-w-md space-y-4 px-4 py-16">
      <h1 className="text-3xl font-semibold">Admin Login</h1>
      <Input placeholder="Email" type="email" />
      <Input placeholder="Password" type="password" />
      <Button className="w-full">Sign in</Button>
    </div>
  );
}
