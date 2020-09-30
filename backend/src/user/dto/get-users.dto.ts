import { Type } from 'class-transformer';
import { Max, Min } from 'class-validator';

export class GetUsersDto {
  @Type(() => Number)
  @Min(5)
  @Max(50)
  limit?: number = 20;

  @Type(() => Number)
  @Min(1)
  page?: number = 1;
}
