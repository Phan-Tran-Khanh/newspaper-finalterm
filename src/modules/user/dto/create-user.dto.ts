import { Gender } from 'src/enum/Gender.enum';

export class CreateUserDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  gender: Gender;
}
