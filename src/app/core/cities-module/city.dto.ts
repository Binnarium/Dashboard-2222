import { ImageDTO } from "src/app/shared/upload/asset.dto";

export interface CityEnabledPagesDto {
  // pages
  activities: boolean | null;
  // activities
  questionary: boolean | null;
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


