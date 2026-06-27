import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemTypeModule } from './item-type/item-type.module';
import { ItemModule } from './item/item.module';
import { StatementModule } from './statement/statement.module';
import { ItemTransactionModule } from './item-transaction/item-transaction.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.name'),
        autoLoadEntities: true,
        synchronize: configService.get<string>('nodeEnv') !== 'production',
      }),
    }),
    ItemTypeModule,
    ItemModule,
    ItemTransactionModule,
    StatementModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
