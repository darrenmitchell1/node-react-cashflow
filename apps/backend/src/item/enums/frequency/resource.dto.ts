import { Exclude, Expose, instanceToPlain, plainToInstance } from 'class-transformer';
import { Frequency, FrequencyLabels } from './frequency';

@Exclude()
export class FrequencyResourceDto {
  @Expose()
  id: string;

  @Expose()
  label: string;

  static from(value: Frequency): Record<string, unknown> {
    const dto = plainToInstance(
      FrequencyResourceDto,
      { id: value, label: FrequencyLabels[value] },
      { excludeExtraneousValues: true },
    );
    return instanceToPlain(dto, { excludeExtraneousValues: true });
  }

  static list(): Record<string, unknown>[] {
    return Object.values(Frequency).map((value) => FrequencyResourceDto.from(value));
  }
}
