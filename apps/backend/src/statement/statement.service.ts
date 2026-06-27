import { Injectable } from '@nestjs/common';
import { CreateStatementDto } from './dto/create-statement.dto';
import { UpdateStatementDto } from './dto/update-statement.dto';

@Injectable()
export class StatementService {
  create(createStatementDto: CreateStatementDto) {
    return 'This action adds a new statement';
  }

  findAll() {
    return `This action returns all statement`;
  }

  findOne(id: number) {
    return `This action returns a #${id} statement`;
  }

  update(id: number, updateStatementDto: UpdateStatementDto) {
    return `This action updates a #${id} statement`;
  }

  remove(id: number) {
    return `This action removes a #${id} statement`;
  }
}
