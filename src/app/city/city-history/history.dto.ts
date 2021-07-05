import { ImageDTO } from "src/app/shared/upload/asset.dto";

type ContentHistoryKind = 'HISTORY#IMAGE' | 'HISTORY#TEXT' | 'HISTORY#TITLE'

interface ContentHistoryDto {
  kind: ContentHistoryKind
}

export interface ImageContentHistoryDto extends ContentHistoryDto, ImageDTO {
  kind: 'HISTORY#IMAGE';
}

export interface TextContentHistoryDto extends ContentHistoryDto {
  kind: 'HISTORY#TEXT';
  text: string;
}

export interface TitleContentHistoryDto extends ContentHistoryDto {
  kind: 'HISTORY#TITLE';
  title: string;
}

export interface HistoryDto {
  content: Array<ImageContentHistoryDto | TextContentHistoryDto | TitleContentHistoryDto>,
}
