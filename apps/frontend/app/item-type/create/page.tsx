import Link from 'next/link';
import { ItemTypeForm } from '../_components/item-type-form';

export default function ItemTypeCreatePage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 p-8">
      <div>
        <Link href="/item-type" className="text-sm text-zinc-600 underline dark:text-zinc-400">
          Back to item types
        </Link>
        <h1 className="mt-2 text-2xl font-semibold">Create item type</h1>
      </div>
      <ItemTypeForm mode="create" />
    </div>
  );
}
