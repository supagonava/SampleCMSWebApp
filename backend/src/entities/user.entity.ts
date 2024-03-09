import { User } from '../interfaces/user.interface';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';

@Entity('user')
export class UserEntity extends BaseEntity implements User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @Unique(['username'])
  username!: string;

  @Column()
  password!: string;

  @Column()
  @CreateDateColumn()
  created_at!: Date;

  @Column()
  @UpdateDateColumn()
  updated_at!: Date;
}
