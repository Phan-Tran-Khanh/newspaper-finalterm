import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Article } from 'src/entity/article.entity';
import { Category } from 'src/entity/category.entity';
import { Comment } from 'src/entity/comment.entity';
import { Lable } from 'src/entity/lable.entity';
import { Role } from 'src/entity/role.entity';
import { User } from 'src/entity/user.entity';

export default registerAs(
  'database',
  () =>
    ({
      type: process.env.DATABASE_TYPE,
      url: process.env.DATABASE_URL,
      entities: [User, Article, Category, Comment, Lable, Role],
      synchronize: true, // WARNING: DO NOT USE IN PRODUCTION
    } as TypeOrmModuleOptions),
);
