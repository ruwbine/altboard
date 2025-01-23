import { IsNumber, IsOptional } from 'class-validator';

export class UpdateStatsDto {
  @IsOptional()
  @IsNumber()
  exp: number;

  @IsOptional()
  @IsNumber()
  level: number;

  @IsOptional()
  @IsNumber()
  completedQuests: number;

  @IsOptional()
  @IsNumber()
  createdQuests: number;
}
