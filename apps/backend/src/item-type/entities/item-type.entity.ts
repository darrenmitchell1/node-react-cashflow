import { Column, CreateDateColumn, Generated, Index, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Category } from "../enums/category/category";
import { Item } from "src/item/entities/item.entity";

export class ItemType {
    @PrimaryGeneratedColumn()
    id!: number;

    @Index({ unique: true })
    @Generated("uuid")
    @Column()
    uuid!: string;

    @Column({ type: 'enum', enum: Category })
    flow!: Category

    @Column({ type: "tinytext", unique: true })
    code!: string

    @Column({ type: "tinytext", unique: true })
    name!: string

    @Column({ type: "mediumtext" })
    description!: string

    @Column({ nullable: true })
    deletedAt!: Date

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @OneToMany(() => Item, (Item) => Item.item_type_id)
    items!: Item[]
}
