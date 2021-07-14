import firebase from 'firebase/app';
import { ImageDTO } from "src/app/shared/upload/asset.dto";
interface BaseReadingDto {
  name: string | null;
  cover: ImageDTO | null;
  about: string | null;
  author: string | null;
  publishedDate: string | firebase.firestore.Timestamp | null;
}
export interface ReadingDto extends BaseReadingDto {
  publishedDate: string | null;
}

export interface FirebaseReadingDto extends BaseReadingDto {
  publishedDate: firebase.firestore.Timestamp | null;
}

export interface ExternalLinkDto {
  title: string | null;
  description: string | null;
  kind: string | null
  link: string | null;
}

interface BaseCityResourcesDto {
  readings: Array<ReadingDto> | Array<FirebaseReadingDto> | null;
  externalLinks: Array<ExternalLinkDto> | null
}

export interface CityResourcesDto extends BaseCityResourcesDto {
  readings: Array<ReadingDto> | null;
}

export interface FirebaseCityResourcesDto extends BaseCityResourcesDto {
  readings: Array<FirebaseReadingDto> | null;
}
