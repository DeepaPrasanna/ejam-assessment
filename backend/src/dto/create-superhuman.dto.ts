import { IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';

export class CreateSuperhumanDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  superpower: string;

  @IsInt()
  @Min(1)
  @Max(10)
  humilityScore: number;
}
