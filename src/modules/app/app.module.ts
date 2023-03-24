import { Module } from '@nestjs/common';
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

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.dev.env', '.prod.env'],
      load: [databaseConfig, authConfig],
      isGlobal: true,
      expandVariables: true,
    }),
    TypeOrmModule.forRootAsync(databaseConfig.asProvider()),
    UserModule,
    AuthModule,
    ArticleModule,
    CategoryModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
