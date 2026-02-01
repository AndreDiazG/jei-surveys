import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { UserOrmEntity } from '../../../../auth/infraestructure/persistence/entities/user.orm-entity';
import { QuestionOrmEntity } from './question.orm-entity';
import { ResponseOrmEntity } from './response.orm-entity';

@Entity('surveys')
export class SurveyOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @ManyToOne(() => UserOrmEntity, (user) => user.surveys)
  @JoinColumn({ name: 'created_by' })
  createdBy: UserOrmEntity;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @OneToMany(() => QuestionOrmEntity, (question) => question.survey)
  questions: QuestionOrmEntity[];

  @OneToMany(() => ResponseOrmEntity, (response) => response.survey)
  responses: ResponseOrmEntity[];
}
