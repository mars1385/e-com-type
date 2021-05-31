import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { IsEmail, Length } from 'class-validator';
import { Category } from './Category';
import { Address } from './Address';
import { Order } from './Order';

enum userRole {
  user = 1,
  admin = 2,
}

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  @Length(1, 15, {
    message: 'Please enter a Name!',
  })
  firstName!: string;

  @Column()
  @Length(1, 20, {
    message: 'Please enter a lastName!',
  })
  lastName!: string;

  @Column({ unique: true })
  @IsEmail(
    {},
    {
      message: 'Email must be an valid email!',
    }
  )
  email!: string;

  @Column()
  @Length(6, 30, {
    message: 'Password must be between 6 to 30 character',
  })
  password!: string;

  @Column({ default: 'no-image.jpg' })
  image!: string;

  @Column({ type: 'enum', enum: userRole, default: userRole.user })
  role!: userRole;

  @OneToMany(() => Category, (category) => category.creator, { cascade: true })
  categories: Category[];

  @OneToMany(() => Address, (address) => address.user, { cascade: true })
  address: Address[];

  @OneToMany(() => Order, (order) => order.user, { cascade: true })
  orders: Order[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
