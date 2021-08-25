import { ImageDTO } from "src/app/shared/upload/asset.dto";

export interface CityEnabledPagesDto {
  // pages
  introductoryVideo: boolean | null;
  argumentation: boolean | null;
  resources: boolean | null;
  projectVideo: boolean | null;
  manualVideo: boolean | null;
  activities: boolean | null;

  // activities
  contribution: boolean | null;
  clubhouse: boolean | null;
  project: boolean | null;
}

export interface CityDto {
  id: string;
  name: string;

  stage: number;

  icon: ImageDTO;
  iconMap: ImageDTO;

  configuration: {
    colorHex: number,
  };

  enabledPages: null | CityEnabledPagesDto;
}


