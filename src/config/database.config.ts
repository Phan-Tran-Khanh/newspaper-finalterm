import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Article } from 'src/entities/article.entity';
import { Category } from 'src/entities/category.entity';
import { Comment } from 'src/entities/comment.entity';
import { Lable } from 'src/entities/lable.entity';
import { User } from 'src/entities/user.entity';

export default registerAs(
  'database',
  () =>
    ({
      type: process.env.DATABASE_TYPE,
      url: process.env.DATABASE_URL,
      entities: [User, Article, Category, Comment, Lable],
      synchronize: true, // WARNING: DO NOT USE IN PRODUCTION
    } as TypeOrmModuleOptions),
);
