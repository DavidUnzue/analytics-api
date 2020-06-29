import { IsNotEmpty, IsDate, IsOptional, IsString } from 'class-validator';

export class CreatePageViewDto {
  @IsNotEmpty()
  @IsString()
  pageId: string;

  @IsOptional()
  @IsString()
  country: string;

  @IsOptional()
  @IsString()
  browserName: string;

  @IsOptional()
  @IsString()
  userId: string;
}
