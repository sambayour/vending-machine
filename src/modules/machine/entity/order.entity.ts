import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Product } from '../../products/entity/product.entity';
@Entity({
  name: 'orders',
})
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ name: 'product_id', type: 'uuid' })
  @ManyToOne(() => Product, {
    cascade: ['insert'],
  })
  @JoinColumn({
    referencedColumnName: 'id',
    name: 'product_id',
  })
  product: string;

  @Column({ name: 'quantity', type: 'bigint' })
  quantity: number;

  @Column({ name: 'user_id', type: 'uuid' })
  @ManyToOne(() => User, {
    cascade: ['insert'],
  })
  @JoinColumn({
    referencedColumnName: 'id',
    name: 'user_id',
  })
  user: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
