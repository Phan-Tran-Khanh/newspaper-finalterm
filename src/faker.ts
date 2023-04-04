import { User } from 'src/entity/user.entity';
import { faker } from '@faker-js/faker';

function createRandomUser(): User {
  const user = new User();
  user.firstName = faker.name.firstName();

  user.lastName = faker.name.lastName();

  user.username = faker.internet.userName();
  user.email = faker.internet.email();
  user.password = faker.internet.password();
  return user;
}
