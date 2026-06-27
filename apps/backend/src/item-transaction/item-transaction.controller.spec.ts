import { Test, TestingModule } from '@nestjs/testing';
import { ItemTransactionController } from './item-transaction.controller';
import { ItemTransactionService } from './item-transaction.service';

describe('ItemTransactionController', () => {
  let controller: ItemTransactionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemTransactionController],
      providers: [ItemTransactionService],
    }).compile();

    controller = module.get<ItemTransactionController>(ItemTransactionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
