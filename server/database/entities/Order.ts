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
import { Length, IsDateString } from 'class-validator';
import { User } from './User';
import { OrderDetail } from './OrderDetail';

@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  @Length(1, 30, {
    message: 'Please add a paymentMethod!',
  })
  paymentMethod!: string;

  @Column()
  @Length(1, 30, {
    message: 'Please enter a country!',
  })
  country!: string;

  @Column()
  @Length(1, 30, {
    message: 'Please enter a city!',
  })
  city!: string;

  @Column()
  @Length(1, 30, {
    message: 'Please enter a zipCode!',
  })
  zipCode!: string;

  @Column()
  @Length(1, 500, {
    message: 'Please add a shippingAddress!',
  })
  shippingAddress!: string;

  @Column({ type: 'decimal', default: 0.0 })
  totalPrice!: number;

  @Column({ default: false })
  isPaid: boolean;

  @Column()
  @IsDateString()
  paidAt: Date;

  @Column()
  userId: string;

  @ManyToOne(() => User, (user) => user.orders, { onDelete: 'CASCADE' })
  user: User;

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.order, { cascade: true })
  orders: OrderDetail[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
