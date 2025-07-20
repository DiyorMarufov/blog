import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('blog')
export class BlogEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', name: 'title' })
  title: string;

  @Column({ type: 'varchar', name: 'description' })
  description: string;
}
