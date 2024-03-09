import { Tag } from 'interfaces/tag.interface';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { PostEntity } from './post.entity';

@Entity('tag')
export class TagEntity extends BaseEntity implements Tag {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @Unique(['tag'])
  tag!: string;

  @ManyToMany(() => PostEntity)
  @JoinTable({ name: 'post_tags' })
  posts!: PostEntity[];
}
