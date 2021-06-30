import * as Nest from '@nestjs/common';
import { Contact } from '../model/contact.entity';
import { ContactService, IQuery } from './contact.service';

@Nest.Controller('contact')
export class ContactController {
  constructor(private service: ContactService) {}

  // Create a new Contact
  @Nest.Post()
  public async create(@Nest.Body() contactData: Contact): Promise<Contact> {
    try {
      const contact: Contact = await this.service.create(contactData);
      return contact;
    } catch (error) {
      console.log('Error: ', error);
      throw new Nest.BadRequestException(error.message);
    }
  }

  // Lists all Contacts in database
  @Nest.Get()
  public async getAll(
    @Nest.Query('firstName') firstName: string,
    @Nest.Query('lastName') lastName: string,
    @Nest.Query('phone') phone: number,
  ): Promise<{ total: number; list: Contact[] }> {
    try {
      const query: IQuery = {};
      if (firstName) query.firstName = firstName;
      if (lastName) query.lastName = lastName;
      if (phone) query.phone = phone;

      const contacts: Contact[] = await this.service.getAll(query);
      return { total: contacts.length, list: contacts };
    } catch (error) {
      console.log('Error: ', error);
      throw new Nest.BadRequestException(error.message);
    }
  }

  // Gets a Contact details
  @Nest.Get(':contactId')
  public async getContact(
    @Nest.Param('contactId') contactId: string,
  ): Promise<Contact> {
    try {
      const contact: Contact = await this.service.getOne(contactId);
      return contact;
    } catch (error) {
      console.log('Error: ', error);
      throw new Nest.BadRequestException(error.message);
    }
  }
}
