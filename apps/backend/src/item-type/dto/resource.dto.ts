import { Exclude, Expose, Transform, instanceToPlain, plainToInstance } from 'class-transformer';
import { ItemType } from '../entities/item-type.entity';
import { Category } from '../enums/category/category';
import { CategoryResourceDto } from '../enums/category/resource.dto';

@Exclude()
export class ItemTypeResourceDto {
  @Expose()
  uuid: string;

  @Expose()
  @Transform(({ value }) => CategoryResourceDto.from(value as Category))
  category: Category;

  @Expose()
  code: string;

  @Expose()
  name: string;

  @Expose({ name: 'descriptiom' })
  description: string;

  @Expose({ name: 'created_at' })
  @Transform(({ value }) => (value instanceof Date ? value.toISOString() : value))
  createdAt: string;

  @Expose({ name: 'updated_at' })
  @Transform(({ value }) => (value instanceof Date ? value.toISOString() : value))
  updatedAt: string;

  static from(entity: ItemType): Record<string, unknown> {
    const dto = plainToInstance(ItemTypeResourceDto, entity, { excludeExtraneousValues: true });
    return instanceToPlain(dto, { excludeExtraneousValues: true });
  }

  static fromMany(entities: ItemType[]): Record<string, unknown>[] {
    return entities.map((entity) => ItemTypeResourceDto.from(entity));
  }
}
