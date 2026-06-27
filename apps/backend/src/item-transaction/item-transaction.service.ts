import { Injectable } from '@nestjs/common';
import { CreateItemTransactionDto } from './dto/create-item-transaction.dto';
import { UpdateItemTransactionDto } from './dto/update-item-transaction.dto';

@Injectable()
export class ItemTransactionService {
  create(createItemTransactionDto: CreateItemTransactionDto) {
    return 'This action adds a new itemTransaction';
  }

  findAll() {
    return `This action returns all itemTransaction`;
  }

  findOne(id: number) {
    return `This action returns a #${id} itemTransaction`;
  }

  update(id: number, updateItemTransactionDto: UpdateItemTransactionDto) {
    return `This action updates a #${id} itemTransaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} itemTransaction`;
  }
}
