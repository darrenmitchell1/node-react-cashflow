import { Exclude, Expose, instanceToPlain, plainToInstance } from 'class-transformer';
import { Flow, FlowLabels } from './flow';

@Exclude()
export class FlowResourceDto {
  @Expose()
  id: Flow;

  @Expose()
  label: string;

  static from(value: Flow): Record<string, unknown> {
    const dto = plainToInstance(
      FlowResourceDto,
      { id: value, label: FlowLabels[value] },
      { excludeExtraneousValues: true },
    );
    return instanceToPlain(dto, { excludeExtraneousValues: true });
  }

  static list(): Record<string, unknown>[] {
    return Object.values(Flow).map((value) => FlowResourceDto.from(value));
  }
}
