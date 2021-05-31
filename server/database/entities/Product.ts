import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { IsEmpty } from 'class-validator';
import { Category } from './Category';
import { OrderDetail } from './OrderDetail';

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  @IsEmpty({ message: 'Category Product need a title' })
  title!: string;

  @Column()
  @IsEmpty({ message: 'Category Product need a genre' })
  genre!: string;

  @Column({ type: 'decimal' })
  @IsEmpty({ message: 'Category Product need a price' })
  price!: number;

  @Column()
  @IsEmpty({ message: 'Category Product need a slug' })
  slug!: string;

  @Column({ default: 'no-image.jpg' })
  image!: string;

  @Column()
  categoryId: string;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.product, { cascade: true })
  orderProducts: OrderDetail[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
