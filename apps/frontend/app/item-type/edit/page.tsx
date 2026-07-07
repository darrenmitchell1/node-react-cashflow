import Link from 'next/link';
import { notFound } from 'next/navigation';
import { itemTypeApi } from '@/lib/api';
import { ItemTypeForm } from '../_components/item-type-form';

interface ItemTypeEditPageProps {
  params: Promise<{ uuid: string }>;
}

export default async function ItemTypeEditPage({ params }: ItemTypeEditPageProps) {
  const { uuid } = await params;

  let itemType;
  try {
    itemType = await itemTypeApi.get(uuid);
  } catch {
    notFound();
  }

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 p-8">
      <div>
        <Link href="/item-type" className="text-sm text-zinc-600 underline dark:text-zinc-400">
          Back to item types
        </Link>
        <h1 className="mt-2 text-2xl font-semibold">Update item type</h1>
      </div>
      <ItemTypeForm mode="update" uuid={uuid} initial={itemType} />
    </div>
  );
}
