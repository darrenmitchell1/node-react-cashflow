import Link from 'next/link';
import { itemApi } from '@/lib/api';
import { ItemResource } from '@/lib/types';

export default async function ItemIndexPage() {
  let items: ItemResource[] = [];
  let error: string | null = null;

  try {
    items = await itemApi.list();
  } catch (err) {
    error = err instanceof Error ? err.message : 'Failed to load items';
  }

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Items</h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Cashflow line items linked to item types.
          </p>
        </div>
        <Link
          href="/item/create"
          className="rounded bg-zinc-900 px-4 py-2 text-sm text-white dark:bg-zinc-100 dark:text-zinc-900"
        >
          New item
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
              <th className="px-4 py-3 font-medium">Company</th>
              <th className="px-4 py-3 font-medium">Flow</th>
              <th className="px-4 py-3 font-medium">Amount</th>
              <th className="px-4 py-3 font-medium">Start date</th>
              <th className="px-4 py-3 font-medium" />
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-zinc-500">
                  No items yet.
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <tr key={item.uuid} className="border-t border-zinc-200 dark:border-zinc-800">
                  <td className="px-4 py-3">{item.company_name}</td>
                  <td className="px-4 py-3">{item.flow.label}</td>
                  <td className="px-4 py-3">{item.amount}</td>
                  <td className="px-4 py-3">{item.start_date}</td>
                  <td className="px-4 py-3 text-right">
                    <Link href={`/item/${item.uuid}/edit`} className="text-sm underline">
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
