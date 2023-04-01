import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Article } from 'src/entity/article.entity';
import { Category } from 'src/entity/category.entity';
import { Lable } from 'src/entity/lable.entity';
import { Role } from 'src/entity/role.entity';
import { User } from 'src/entity/user.entity';
import { Comment } from 'src/entity/comment.entity';
import { Initialize1680094762128 } from 'src/migrations/1680094762128-Initialize';

export default registerAs('database', () => ({
    type: process.env.DATABASE_TYPE,
    url: process.env.DATABASE_URL,
    entities: [Category, Article, Lable, User, Role, Lable, Comment],
    migrations: [Initialize1680094762128],
    // synchronize: true, // WARNING: DO NOT USE IN PRODUCTION
    logging: process.env.NODE_ENV === 'development',
  } as TypeOrmModuleOptions),
);
