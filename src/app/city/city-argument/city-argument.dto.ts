import { ImageDTO } from "src/app/shared/upload/asset.dto";

export interface CityArgumentDto {
  questions: Array<string | null>;
  illustration: ImageDTO;
}
