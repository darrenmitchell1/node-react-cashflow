import { Item } from "src/item/entities/item.entity";
import { Column, CreateDateColumn, Generated, Index, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export class ItemTransaction {
    @PrimaryGeneratedColumn()
    id!: number;

    @Index({ unique: true })
    @Column()
    @Generated("uuid")
    uuid!: string;

    @ManyToOne(() => Item, (Item) => Item.id)
    item_id!: number;

    @Index()
    @Column()
    transactionDate!: Date;

    @Column({ type: "float", precision: 2 })
    amount!: number;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}
