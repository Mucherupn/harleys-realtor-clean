import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export default function NewBlogPostPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-4 px-4 py-16">
      <h1 className="text-3xl font-semibold">New Article</h1>
      <Input placeholder="Title" />
      <Textarea placeholder="Content" rows={10} />
      <Button>Create draft</Button>
    </div>
  );
}
