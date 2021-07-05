interface AssetDto {
  url: string;
  path: string;
  name: string;
}

export interface ImageDTO extends AssetDto {
  width: number;
  height: number;
}

export interface VideoDTO extends AssetDto {
  duration?: number;
  format?: string;
}

export interface DocumentDTO extends AssetDto {
}
