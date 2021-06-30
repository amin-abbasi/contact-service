import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';
import { configService } from '../config/config.service';
import { Contact } from '../model/contact.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Contact], configService.getConnection())],
  controllers: [ContactController],
  providers: [ContactService],
})
export class ContactModule {}
