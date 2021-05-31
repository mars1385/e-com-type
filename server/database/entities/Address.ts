import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  ManyToOne,
} from 'typeorm';
import { Length } from 'class-validator';
import { User } from './User';

@Entity()
export class Address extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

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
  @Length(1, 30, {
    message: 'Please enter a phoneNumber!',
  })
  phoneNumber!: string;

  @Column()
  @Length(1, 500, {
    message: 'Please enter a complete Address!',
  })
  completeAddress!: string;

  @Column()
  userId: string;

  @ManyToOne(() => User, (user) => user.address, { onDelete: 'CASCADE' })
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
