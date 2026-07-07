import { Exclude, Expose, Transform, instanceToPlain, plainToInstance } from 'class-transformer';
import { Item } from '../entities/item.entity';
import { Flow } from '../enums/flow/flow';
import { FlowResourceDto } from '../enums/flow/resource.dto';
import { Frequency } from '../enums/frequency/frequency';
import { FrequencyResourceDto } from '../enums/frequency/resource.dto';

@Exclude()
export class ItemResourceDto {
  @Expose()
  uuid: string;

  @Expose({ name: 'item_type_id' })
  @Transform(({ obj }: { obj: Item & { itemType?: { uuid: string } } }) =>
    obj.itemType?.uuid ?? String(obj.item_type_id),
  )
  item_type_id: string;

  @Expose()
  @Transform(({ value }) => FlowResourceDto.from(value as Flow))
  flow: Flow;

  @Expose()
  @Transform(({ value }) => FrequencyResourceDto.from(value as Frequency))
  frequency: Frequency;

  @Expose({ name: 'start_date' })
  @Transform(({ value }) => (value instanceof Date ? value.toISOString().slice(0, 10) : value))
  startDate: string;

  @Expose({ name: 'number_of_transactions' })
  numberOfTransactions: number;

  @Expose({ name: 'descriptiom' })
  description: string;

  @Expose({ name: 'company_name' })
  companyName: string;

  @Expose()
  @Transform(({ value }) => (typeof value === 'number' ? value.toFixed(2) : value))
  amount: string;

  @Expose()
  reference: string | null;

  @Expose({ name: 'created_at' })
  @Transform(({ value }) => (value instanceof Date ? value.toISOString() : value))
  createdAt: string;

  @Expose({ name: 'updated_at' })
  @Transform(({ value }) => (value instanceof Date ? value.toISOString() : value))
  updatedAt: string;

  static from(entity: Item): Record<string, unknown> {
    const dto = plainToInstance(ItemResourceDto, entity, { excludeExtraneousValues: true });
    return instanceToPlain(dto, { excludeExtraneousValues: true });
  }

  static fromMany(entities: Item[]): Record<string, unknown>[] {
    return entities.map((entity) => ItemResourceDto.from(entity));
  }
}
