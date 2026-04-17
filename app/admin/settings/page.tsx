import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function AdminSettingsPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-4 px-4 py-16">
      <h1 className="text-3xl font-semibold">Settings</h1>
      <Input placeholder="Office location" />
      <Input placeholder="Support email" />
      <Input placeholder="Phone number" />
      <Button>Save settings</Button>
    </div>
  );
}
