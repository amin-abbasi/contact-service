import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactModule } from './contact/contact.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [ContactModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
