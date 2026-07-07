import Link from 'next/link';
import { ItemForm } from '../_components/item-form';

export default function ItemCreatePage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 p-8">
      <div>
        <Link href="/item" className="text-sm text-zinc-600 underline dark:text-zinc-400">
          Back to items
        </Link>
        <h1 className="mt-2 text-2xl font-semibold">Create item</h1>
      </div>
      <ItemForm mode="create" />
    </div>
  );
}
