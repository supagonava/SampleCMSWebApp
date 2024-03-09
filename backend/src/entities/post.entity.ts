import { Post } from 'interfaces/post.interface';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { TagEntity } from './tag.entity';

@Entity('post')
export class PostEntity extends BaseEntity implements Post {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  content!: string;

  @ManyToMany(() => TagEntity)
  @JoinTable({ name: 'post_tags' })
  tags!: TagEntity[];

  @Column()
  @CreateDateColumn()
  postedAt!: Date;

  @Column()
  postedBy!: string;
}
