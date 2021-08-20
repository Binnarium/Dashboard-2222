import { ImageDTO } from "src/app/shared/upload/asset.dto";

export interface CityMonsterDto {
  questions: Array<string | null>;
  illustration: ImageDTO;
}
