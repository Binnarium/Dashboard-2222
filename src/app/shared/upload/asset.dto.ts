interface AssetDto {
  url: null | string;
  path: null | string;
  name: null | string;
}

export interface ImageDTO extends AssetDto {
  width: null | number;
  height: null | number;
}

export interface VideoDTO extends AssetDto {
  duration: null | number;
  format: null | string;
}

export interface AudioDto extends AssetDto {
  duration: null | number;
  format: null | string;
}

export interface DocumentDTO extends AssetDto {
}
