'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SubmitEvent, useEffect, useState } from 'react';
import { itemTypeApi } from '@/lib/api';
import {
  CATEGORY_OPTIONS,
  CreateItemTypeInput,
  ItemTypeResource,
  UpdateItemTypeInput,
} from '@/lib/types';

interface ItemTypeFormProps {
  mode: 'create' | 'update';
  uuid?: string;
  initial?: ItemTypeResource;
}

const emptyForm: CreateItemTypeInput = {
  category: 'operating',
  code: '',
  name: '',
  descriptiom: '',
};

export function ItemTypeForm({ mode, uuid, initial }: ItemTypeFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<CreateItemTypeInput>(emptyForm);
  const [updateForm, setUpdateForm] = useState<UpdateItemTypeInput>({
    name: '',
    descriptiom: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (initial) {
      setForm({
        category: initial.category.id,
        code: initial.code,
        name: initial.name,
        descriptiom: initial.descriptiom,
      });
      setUpdateForm({
        name: initial.name,
        descriptiom: initial.descriptiom,
      });
    }
  }, [initial]);

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      if (mode === 'create') {
        await itemTypeApi.create(form);
      } else if (uuid) {
        await itemTypeApi.update(uuid, updateForm);
      }

      router.push('/item-type');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-xl flex-col gap-4">
      {mode === 'create' && (
        <>
          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium">Category</span>
            <select
              required
              value={form.category}
              onChange={(e) =>
                setForm({ ...form, category: e.target.value as CreateItemTypeInput['category'] })
              }
              className="rounded border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
            >
              {CATEGORY_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium">Code</span>
            <input
              required
              value={form.code}
              onChange={(e) => setForm({ ...form, code: e.target.value.toLowerCase() })}
              className="rounded border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
            />
          </label>
        </>
      )}

      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">Name</span>
        <input
          required
          value={mode === 'create' ? form.name : updateForm.name}
          onChange={(e) =>
            mode === 'create'
              ? setForm({ ...form, name: e.target.value })
              : setUpdateForm({ ...updateForm, name: e.target.value })
          }
          className="rounded border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
        />
      </label>

      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">Description</span>
        <textarea
          required
          rows={4}
          value={mode === 'create' ? form.descriptiom : updateForm.descriptiom}
          onChange={(e) =>
            mode === 'create'
              ? setForm({ ...form, descriptiom: e.target.value })
              : setUpdateForm({ ...updateForm, descriptiom: e.target.value })
          }
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
          {submitting
            ? 'Saving…'
            : mode === 'create'
              ? 'Create item type'
              : 'Update item type'}
        </button>
        <Link
          href="/item-type"
          className="rounded border border-zinc-300 px-4 py-2 dark:border-zinc-700"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
