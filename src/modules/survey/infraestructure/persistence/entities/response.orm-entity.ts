import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { SurveyOrmEntity } from './survey.orm-entity';
import { AnswerOrmEntity } from './answer.orm-entity';

@Entity('responses')
export class ResponseOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => SurveyOrmEntity, (survey) => survey.responses, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'survey_id' })
  survey: SurveyOrmEntity;

  @CreateDateColumn({ name: 'submitted_at' })
  submittedAt: Date;

  @OneToMany(() => AnswerOrmEntity, (answer) => answer.response, {
    cascade: true,
  })
  answers: AnswerOrmEntity[];
}
