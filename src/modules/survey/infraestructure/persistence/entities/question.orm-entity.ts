import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { SurveyOrmEntity } from './survey.orm-entity';
import type {
  QuestionType,
  QuestionOptions,
} from '../../../domain/types/question-options.types';

@Entity('questions')
export class QuestionOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column()
  type: QuestionType; // text | single | multiple | rating

  @Column({ type: 'jsonb', default: {} })
  options: QuestionOptions;

  @Column({ default: false })
  required: boolean;

  @Column({ nullable: true })
  position: number;

  @ManyToOne(() => SurveyOrmEntity, (survey) => survey.questions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'survey_id' })
  survey: SurveyOrmEntity;
}
