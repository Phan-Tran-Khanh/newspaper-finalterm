import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from 'src/modules/user/user.module';
import { AuthModule } from 'src/modules/auth/auth.module';
import { ArticleModule } from 'src/modules/article/article.module';
import { CategoryModule } from 'src/modules/category/category.module';
import databaseConfig from 'src/config/database.config';
import authConfig from 'src/config/auth.config';
import { EmailModule } from '../email/email.module';
import emailConfig from 'src/config/email.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.dev.env', '.prod.env'],
      load: [databaseConfig, authConfig, emailConfig],
      isGlobal: true,
      expandVariables: true,
    }),
    TypeOrmModule.forRootAsync(databaseConfig.asProvider()),
    CacheModule.register({
      isGlobal: true,
    }),
    UserModule,
    AuthModule,
    ArticleModule,
    CategoryModule,
    EmailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
