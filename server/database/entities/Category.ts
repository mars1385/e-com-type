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
import { Length } from 'class-validator';
import { User } from './User';
import { Product } from './Product';

@Entity()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  @Length(1, 30, {
    message: 'Category need a title!',
  })
  title!: string;

  @Column({ default: 'no-image.jpg' })
  image!: string;

  @Column()
  creatorId: string;

  @ManyToOne(() => User, (user) => user.categories, { onDelete: 'CASCADE' })
  creator: User;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
