import { Test, TestingModule } from '@nestjs/testing';
import { ItemTransactionService } from './item-transaction.service';

describe('ItemTransactionService', () => {
  let service: ItemTransactionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemTransactionService],
    }).compile();

    service = module.get<ItemTransactionService>(ItemTransactionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
