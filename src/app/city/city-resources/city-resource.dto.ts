import { ImageDTO } from "src/app/shared/upload/asset.dto";

export interface ReadingDto {
  name: string;
  id: string
  cover: ImageDTO;
  about: string;
  author: string;
  publishedDate: Date;
}
export interface CityResourceDto {
  readings: Array<ReadingDto>
}
