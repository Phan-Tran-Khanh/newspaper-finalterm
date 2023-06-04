import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/modules/user/user.module';
import { AuthModule } from 'src/modules/auth/auth.module';
import { ArticleModule } from 'src/modules/article/article.module';
import { CategoryModule } from 'src/modules/category/category.module';
import { LabelModule } from '../label/label.module';
import { EmailModule } from 'src/modules/email/email.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import databaseConfig from 'src/config/database.config';
import { jwtConfig, googleConfig, bcryptConfig } from 'src/config/auth.config';
import emailConfig from 'src/config/email.config';
import configuration from 'src/config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.dev.env', '.prod.env'],
      load: [
        databaseConfig,
        jwtConfig,
        googleConfig,
        bcryptConfig,
        emailConfig,
        configuration,
      ],
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
    LabelModule,
    EmailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
