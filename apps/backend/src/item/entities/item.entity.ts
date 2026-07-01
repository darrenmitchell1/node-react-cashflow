import { ItemType } from "src/item-type/entities/item-type.entity";
import { Column, CreateDateColumn, Entity, Generated, Index, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Flow } from "../enums/flow/flow";
import { Frequency } from "../enums/frequency/frequency";
import { ItemTransaction } from "src/item-transaction/entities/item-transaction.entity";

@Entity()
export class Item {
    @PrimaryGeneratedColumn()
    id: number;

    @Index({ unique: true })
    @Column()
    @Generated("uuid")
    uuid: string;

    @ManyToOne(() => ItemType, (ItemType) => ItemType.id)
    item_type_id: number;

    @Column({ type: 'enum', enum: Flow })
    flow: Flow

    @Column({ type: 'enum', enum: Frequency })
    frequency: Frequency

    @Column()
    startDate: Date

    @Column({ type: "smallint", unsigned: true })
    numberOfTransactions: number

    @Column({ type: "mediumtext" })
    description: string

    @Column({ type: "tinytext" })
    companyName: string

    @Column({ type: "float", precision: 2 })
    amount: number;

    @Column({ type: "tinytext", nullable: true })
    reference: string;

    @Column({ nullable: true })
    deletedAt: Date

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => ItemTransaction, (ItemTransaction) => ItemTransaction.item_id)
    itemTransactions: ItemTransaction[]
}
