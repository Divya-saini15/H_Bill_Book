import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from './account.entity';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
  ) {}

  create(data: Partial<Account>) {
    const account = this.accountRepository.create(data);
    return this.accountRepository.save(account);
  }

  findAll() {
    return this.accountRepository.find();
  }

  findOne(id: number) {
    return this.accountRepository.findOneBy({ id });
  }

  update(id: number, data: Partial<Account>) {
    return this.accountRepository.update(id, data);
  }

  remove(id: number) {
    return this.accountRepository.delete(id);
  }
}
