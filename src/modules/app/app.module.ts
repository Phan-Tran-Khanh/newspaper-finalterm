import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { ArticleModule } from '../article/article.module';
import databaseConfig from 'src/config/database.config';
import authConfig from 'src/config/auth.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.dev.env', '.prod.env'],
      load: [databaseConfig, authConfig],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync(databaseConfig.asProvider()),
    UserModule,
    AuthModule,
    ArticleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
