import { Exclude, Expose, instanceToPlain, plainToInstance } from 'class-transformer';
import { Category, CategoryLabels } from './category';

@Exclude()
export class CategoryResourceDto {
  @Expose()
  id: string;

  @Expose()
  label: string;

  static from(value: Category): Record<string, unknown> {
    const dto = plainToInstance(
      CategoryResourceDto,
      { id: value, label: CategoryLabels[value] },
      { excludeExtraneousValues: true },
    );
    return instanceToPlain(dto, { excludeExtraneousValues: true });
  }

  static list(): Record<string, unknown>[] {
    return Object.values(Category).map((value) => CategoryResourceDto.from(value));
  }
}
