import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invoice } from './invoice.entity';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(Invoice)
    private invoiceRepository: Repository<Invoice>,
  ) {}

  create(data: Partial<Invoice>) {
    const invoice = this.invoiceRepository.create(data);
    return this.invoiceRepository.save(invoice);
  }

  findAll(accountId: number) {
    return this.invoiceRepository.find({ where: { account: { id: accountId } } });
  }

  async findOne(id: number, accountId: number) {
    const invoice = await this.invoiceRepository.findOne({ where: { id, account: { id: accountId } } });
    if (!invoice) throw new NotFoundException('Invoice not found or access denied');
    return invoice;
  }

  update(id: number, data: Partial<Invoice>, accountId: number) {
    return this.invoiceRepository.update({ id, account: { id: accountId } }, data);
  }

  remove(id: number, accountId: number) {
    return this.invoiceRepository.delete({ id, account: { id: accountId } });
  }
}
