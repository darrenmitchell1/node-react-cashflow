import { Module } from '@nestjs/common';
import { ItemTransactionService } from './item-transaction.service';
import { ItemTransactionController } from './item-transaction.controller';

@Module({
  controllers: [ItemTransactionController],
  providers: [ItemTransactionService],
})
export class ItemTransactionModule {}
