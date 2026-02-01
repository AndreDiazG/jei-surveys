//Tipos de preguntas permitidos
export type QuestionType =
  | 'single-choice'
  | 'multiple-choice'
  | 'rating'
  | 'text'
  | 'boolean';

//Opciones para Selección Única (Radio Buttons / Dropdown)
export interface SingleChoiceOptions {
  choices: string[]; // Ej: ["Rojo", "Verde", "Azul"]
  allowOther?: boolean; // Opción "Otro" (campo de texto libre)
}

//Opciones para Selección Múltiple (Checkboxes)
export interface MultipleChoiceOptions {
  choices: string[];
  allowOther?: boolean;
  minSelection?: number; // Ej: "Elige al menos 2"
  maxSelection?: number; // Ej: "Elige máximo 3"
}

//Opciones para Escala/Calificación (Estrellas / NPS)
export interface RatingOptions {
  min: number;
  max: number;
  step: number; //saltos
  minLabel?: string; //"Nada satisfecho"
  maxLabel?: string; //"Muy satisfecho"
  icon?: 'star' | 'number' | 'emoji';
}

//Opciones para Texto Abierto
export interface TextOptions {
  placeholder?: string;
  maxLength?: number;
  longText?: boolean; // true = textarea, false = input normal
}

//Opciones para Booleano (Sí/No)
export interface BooleanOptions {
  positiveLabel?: string; // Defecto: "Sí"
  negativeLabel?: string; // Defecto: "No"
}

export type QuestionOptions =
  | SingleChoiceOptions
  | MultipleChoiceOptions
  | RatingOptions
  | TextOptions
  | BooleanOptions
  | Record<string, never>; // Objeto vacío por defecto
