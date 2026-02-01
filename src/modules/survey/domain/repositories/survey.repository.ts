import { Survey } from '../entities/survey.entity';

export interface SurveyRepository {
  /**
   * Guarda una encuesta (ya sea nueva o una actualización).
   * @param survey La entidad de dominio a guardar.
   * @returns La entidad guardada (con ID asignado si era nueva).
   */
  save(survey: Survey): Promise<Survey>;

  /**
   * Busca una encuesta por su ID.
   * @param id El ID de la encuesta.
   */
  findById(id: number): Promise<Survey | null>;

  /**
   * Lista todas las encuestas.
   */
  findAll(): Promise<Survey[]>;
}
