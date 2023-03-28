import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
@Entity({
  name: 'products',
})
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  amount_available: number;

  @Column()
  cost: number;

  @Column()
  product_name: string;

  @Column({ name: 'seller_id', type: 'uuid' })
  @ManyToOne(() => User)
  @JoinColumn({
    referencedColumnName: 'id',
    name: 'seller_id',
  })
  seller: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
