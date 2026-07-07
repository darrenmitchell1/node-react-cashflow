export type Flow = 'in' | 'out';
export type Frequency = 'single' | 'daily' | 'weekly' | 'monthly';
export type Category = 'investing' | 'financing' | 'operating';

export interface EnumResource<T extends string = string> {
  id: T;
  label: string;
}

export interface ItemResource {
  uuid: string;
  item_type_id: string;
  flow: EnumResource<Flow>;
  frequency: EnumResource<Frequency>;
  start_date: string;
  number_of_transactions: number;
  descriptiom: string;
  company_name: string;
  amount: string;
  reference?: string | null;
  created_at: string;
  updated_at: string;
}

export interface ItemTypeResource {
  uuid: string;
  category: EnumResource<Category>;
  code: string;
  name: string;
  descriptiom: string;
  created_at: string;
  updated_at: string;
}

export interface CreateItemInput {
  item_type_id: string;
  flow: Flow;
  frequency: Frequency;
  start_date: string;
  number_of_transactions: number;
  descriptiom: string;
  company_name: string;
  amount: string;
  reference?: string;
}

export interface UpdateItemInput extends CreateItemInput {}

export interface CreateItemTypeInput {
  category: Category;
  code: string;
  name: string;
  descriptiom: string;
}

export interface UpdateItemTypeInput {
  name: string;
  descriptiom: string;
}

export const FLOW_OPTIONS: { value: Flow; label: string }[] = [
  { value: 'in', label: 'In' },
  { value: 'out', label: 'Out' },
];

export const FREQUENCY_OPTIONS: { value: Frequency; label: string }[] = [
  { value: 'single', label: 'Single' },
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
];

export const CATEGORY_OPTIONS: { value: Category; label: string }[] = [
  { value: 'investing', label: 'Investing' },
  { value: 'financing', label: 'Financing' },
  { value: 'operating', label: 'Operating' },
];
