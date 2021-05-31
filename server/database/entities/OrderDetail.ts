import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  ManyToOne,
} from 'typeorm';

import { Order } from './Order';
import { Product } from './Product';

@Entity()
export class OrderDetail extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  orderDetailName!: string;

  @Column()
  orderDetailQuantity!: number;

  @Column({ type: 'decimal' })
  orderDetailPrice!: number;

  @Column()
  orderId: string;

  @Column()
  productId: string;

  @ManyToOne(() => Order, (order) => order.orders, { onDelete: 'CASCADE' })
  order: Order;

  @ManyToOne(() => Product, (product) => product.orderProducts, { onDelete: 'CASCADE' })
  product: Product;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
