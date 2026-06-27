import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ItemTransactionService } from './item-transaction.service';
import { CreateItemTransactionDto } from './dto/create-item-transaction.dto';
import { UpdateItemTransactionDto } from './dto/update-item-transaction.dto';

@Controller('item-transaction')
export class ItemTransactionController {
  constructor(private readonly itemTransactionService: ItemTransactionService) {}

  @Post()
  create(@Body() createItemTransactionDto: CreateItemTransactionDto) {
    return this.itemTransactionService.create(createItemTransactionDto);
  }

  @Get()
  findAll() {
    return this.itemTransactionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemTransactionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateItemTransactionDto: UpdateItemTransactionDto) {
    return this.itemTransactionService.update(+id, updateItemTransactionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemTransactionService.remove(+id);
  }
}
