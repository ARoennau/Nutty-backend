import { IsString, Length } from 'class-validator'

export class UserCreateDto {
  @IsString()
  @Length(5, 18)
  username: string

  @IsString()
  password: string
}
