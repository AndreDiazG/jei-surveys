import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { ResponseOrmEntity } from './response.orm-entity';
import { QuestionOrmEntity } from './question.orm-entity';

@Entity('answers')
export class AnswerOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ResponseOrmEntity, (response) => response.answers, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'response_id' })
  response: ResponseOrmEntity;

  @ManyToOne(() => QuestionOrmEntity)
  @JoinColumn({ name: 'question_id' })
  question: QuestionOrmEntity;

  @Column({ type: 'jsonb' })
  value: any;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
