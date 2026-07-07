import Link from 'next/link';
import { itemTypeApi } from '@/lib/api';
import { ItemTypeResource } from '@/lib/types';

export default async function ItemTypeIndexPage() {
  let itemTypes: ItemTypeResource[] = [];
  let error: string | null = null;

  try {
    itemTypes = await itemTypeApi.list();
  } catch (err) {
    error = err instanceof Error ? err.message : 'Failed to load item types';
  }

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Item types</h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Categories and codes for cashflow items.
          </p>
        </div>
        <Link
          href="/item-type/create"
          className="rounded bg-zinc-900 px-4 py-2 text-sm text-white dark:bg-zinc-100 dark:text-zinc-900"
        >
          New item type
        </Link>
      </div>

      {error && (
        <p className="rounded border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}

      <div className="overflow-hidden rounded border border-zinc-200 dark:border-zinc-800">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-zinc-50 dark:bg-zinc-900">
            <tr>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Code</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium" />
            </tr>
          </thead>
          <tbody>
            {itemTypes.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-zinc-500">
                  No item types yet.
                </td>
              </tr>
            ) : (
              itemTypes.map((itemType) => (
                <tr
                  key={itemType.uuid}
                  className="border-t border-zinc-200 dark:border-zinc-800"
                >
                  <td className="px-4 py-3">{itemType.name}</td>
                  <td className="px-4 py-3">{itemType.code}</td>
                  <td className="px-4 py-3">{itemType.category.label}</td>
                  <td className="px-4 py-3 text-right">
                    <Link href={`/item-type/${itemType.uuid}/edit`} className="text-sm underline">
                      Edit
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
