import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Request } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('transactions')
@UseGuards(JwtAuthGuard)
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  create(@Body() body: any, @Request() req: any) {
    // Assume req.user.userId is the account id (tenant)
    return this.transactionService.create({ ...body, account: { id: req.user.userId } });
  }

  @Get()
  findAll(@Request() req: any) {
    return this.transactionService.findAll(req.user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req: any) {
    return this.transactionService.findOne(Number(id), req.user.userId);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: any, @Request() req: any) {
    return this.transactionService.update(Number(id), body, req.user.userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req: any) {
    return this.transactionService.remove(Number(id), req.user.userId);
  }
}
