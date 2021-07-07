import { AudioDto, VideoDTO } from "src/app/shared/upload/asset.dto";

type CityContentKind = 'CONTENT#VIDEO' | 'CONTENT#PODCAST';

interface BaseContentDto {
  kind: CityContentKind;
  author: string | null;
  title: string | null;
  description: string | null;
}

export interface VideoContentDto extends BaseContentDto, VideoDTO {
  kind: 'CONTENT#VIDEO';
}

export interface PodcastContentDto extends BaseContentDto, AudioDto {
  kind: 'CONTENT#PODCAST';
}

export interface ContentDto {
  content: Array<VideoContentDto | PodcastContentDto>,
}
