import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export default async function EditPropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div className="mx-auto max-w-3xl space-y-4 px-4 py-16">
      <h1 className="text-3xl font-semibold">Edit Property #{id}</h1>
      <Input placeholder="Title" />
      <Input placeholder="Location" />
      <Textarea placeholder="Overview" rows={6} />
      <Button>Save changes</Button>
    </div>
  );
}
