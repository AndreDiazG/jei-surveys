import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { SurveyOrmEntity } from './survey.orm-entity';

@Entity('questions')
export class QuestionOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => SurveyOrmEntity, (survey) => survey.questions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'survey_id' })
  survey: SurveyOrmEntity;

  @Column()
  text: string;

  @Column()
  type: string; // text | single | multiple | rating

  @Column({ type: 'jsonb', nullable: true })
  options: any;

  @Column({ default: false })
  required: boolean;

  @Column({ nullable: true })
  position: number;
}
