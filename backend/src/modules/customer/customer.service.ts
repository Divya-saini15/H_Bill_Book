import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './customer.entity';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  create(data: Partial<Customer>) {
    const customer = this.customerRepository.create(data);
    return this.customerRepository.save(customer);
  }

  findAll(accountId: number) {
    return this.customerRepository.find({ where: { account: { id: accountId } } });
  }

  async findOne(id: number, accountId: number) {
    const customer = await this.customerRepository.findOne({ where: { id, account: { id: accountId } } });
    if (!customer) throw new NotFoundException('Customer not found or access denied');
    return customer;
  }

  update(id: number, data: Partial<Customer>, accountId: number) {
    return this.customerRepository.update({ id, account: { id: accountId } }, data);
  }

  remove(id: number, accountId: number) {
    return this.customerRepository.delete({ id, account: { id: accountId } });
  }
}
