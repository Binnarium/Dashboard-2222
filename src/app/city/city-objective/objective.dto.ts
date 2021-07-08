export interface ObjectiveDto {
  mainObjective: string | null;
  content: Array<string | null>;
  competencias: Map<string, boolean>;
  ideas: Array<string | null>;
}
