import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from '../config/config.service';
import { Contact } from '../model/contact.entity';

@Module({
  imports: [TypeOrmModule.forRoot(configService.getTypeOrmConfig([Contact]))],
})
export class DatabaseModule {}
