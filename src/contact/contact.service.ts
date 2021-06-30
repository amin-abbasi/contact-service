import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';

import { Contact } from '../model/contact.entity';
import { configService } from '../config/config.service';

export interface IQuery {
  firstName?: string;
  lastName?: string;
  phone?: number;
}

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact, configService.getConnection())
    private readonly repository: Repository<Contact>,
  ) {}

  public async create(data: Contact): Promise<Contact> {
    const contact: Contact = new Contact(data);
    return this.repository.save(contact);
  }

  public async getAll(query?: IQuery): Promise<Contact[]> {
    const options: FindManyOptions<Contact> = {
      select: ['firstName', 'lastName', 'phone'],
    };
    if (query) options.where = query;
    return await this.repository.find(options);
  }

  public async getOne(id: string): Promise<Contact> {
    const contact: Contact = await this.repository.findOne(id);
    if (!contact) throw new HttpException('Contact not found.', 404);
    return contact;
  }
}
