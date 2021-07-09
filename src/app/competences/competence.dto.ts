import { ImageDTO } from "../shared/upload/asset.dto";

export type CompetenceKind = 'COMPETENCE#HARD' | 'COMPETENCE#SOFT'

export interface CompetenceDto {
  name: string | null;
  id: string;
  image: ImageDTO,
  kind: CompetenceKind,
}
