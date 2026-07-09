'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SubmitEvent, useEffect, useState } from 'react';
import { itemApi, itemTypeApi } from '@/lib/api';
import {
  CreateItemInput,
  FLOW_OPTIONS,
  FREQUENCY_OPTIONS,
  ItemResource,
  ItemTypeResource,
  UpdateItemInput,
} from '@/lib/types';

interface ItemFormProps {
  mode: 'create' | 'update';
  uuid?: string;
  initial?: ItemResource;
}

const emptyForm: CreateItemInput = {
  item_type_id: '',
  flow: 'in',
  frequency: 'single',
  start_date: '',
  number_of_transactions: 1,
  descriptiom: '',
  company_name: '',
  amount: '0.01',
  reference: '',
};

export function ItemForm({ mode, uuid, initial }: ItemFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<CreateItemInput>(emptyForm);
  const [itemTypes, setItemTypes] = useState<ItemTypeResource[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    itemTypeApi
      .list()
      .then(setItemTypes)
      .catch(() => setItemTypes([]));
  }, []);

  useEffect(() => {
    if (initial) {
      setForm({
        item_type_id: initial.item_type_id,
        flow: initial.flow.id,
        frequency: initial.frequency.id,
        start_date: initial.start_date,
        number_of_transactions: initial.number_of_transactions,
        descriptiom: initial.descriptiom,
        company_name: initial.company_name,
        amount: initial.amount,
        reference: initial.reference ?? '',
      });
    }
  }, [initial]);

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const payload: UpdateItemInput = {
        ...form,
        number_of_transactions:
          form.frequency === 'single' ? 1 : form.number_of_transactions,
        reference: form.reference || undefined,
      };

      if (mode === 'create') {
        await itemApi.create(payload);
      } else if (uuid) {
        await itemApi.update(uuid, payload);
      }

      router.push('/item');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-xl flex-col gap-4">
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">Item type</span>
        <select
          required
          value={form.item_type_id}
          onChange={(e) => setForm({ ...form, item_type_id: e.target.value })}
          className="rounded border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
        >
          <option value="">Select item type</option>
          {itemTypes.map((itemType) => (
            <option key={itemType.uuid} value={itemType.uuid}>
              {itemType.name} ({itemType.code})
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">Flow</span>
        <select
          required
          value={form.flow}
          onChange={(e) => setForm({ ...form, flow: e.target.value as CreateItemInput['flow'] })}
          className="rounded border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
        >
          {FLOW_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">Frequency</span>
        <select
          required
          value={form.frequency}
          onChange={(e) =>
            setForm({
              ...form,
              frequency: e.target.value as CreateItemInput['frequency'],
              number_of_transactions: e.target.value === 'single' ? 1 : form.number_of_transactions,
            })
          }
          className="rounded border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
        >
          {FREQUENCY_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">Start date</span>
        <input
          required
          type="date"
          value={form.start_date}
          onChange={(e) => setForm({ ...form, start_date: e.target.value })}
          className="rounded border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
        />
      </label>

      {form.frequency !== 'single' && (
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium">Number of transactions</span>
          <input
            required
            type="number"
            min={1}
            value={form.number_of_transactions}
            onChange={(e) =>
              setForm({ ...form, number_of_transactions: Number(e.target.value) })
            }
            className="rounded border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
          />
        </label>
      )}

      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">Description</span>
        <textarea
          required
          rows={4}
          value={form.descriptiom}
          onChange={(e) => setForm({ ...form, descriptiom: e.target.value })}
          className="rounded border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
        />
      </label>

      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">Company name</span>
        <input
          required
          value={form.company_name}
          onChange={(e) => setForm({ ...form, company_name: e.target.value })}
          className="rounded border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
        />
      </label>

      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">Amount</span>
        <input
          required
          type="text"
          inputMode="decimal"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
          className="rounded border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
        />
      </label>

      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">Reference (optional)</span>
        <input
          value={form.reference}
          onChange={(e) => setForm({ ...form, reference: e.target.value })}
          className="rounded border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
        />
      </label>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={submitting}
          className="rounded bg-zinc-900 px-4 py-2 text-white disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900"
        >
          {submitting ? 'Saving…' : mode === 'create' ? 'Create item' : 'Update item'}
        </button>
        <Link
          href="/item"
          className="rounded border border-zinc-300 px-4 py-2 dark:border-zinc-700"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
