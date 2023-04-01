import { repl } from '@nestjs/core';
import { AppModule } from 'src/modules/app/app.module';

async function bootstrap() {
  await repl(AppModule);
}
bootstrap();