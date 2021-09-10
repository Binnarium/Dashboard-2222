import { ImageDTO } from "src/app/shared/upload/asset.dto";

export interface CityEnabledPagesDto {
  // pages
  introductoryVideo: boolean | null;
  argumentation: boolean | null;
  resources: boolean | null;
  projectVideo: boolean | null;
  manualVideo: boolean | null;
  activities: boolean | null;
  content: boolean | null;
  microMesoMacro: boolean | null;
  finalVideo: boolean | null;
  hackatonMedals: boolean | null;

  // activities
  contributionExplanation: boolean | null;
  contribution: boolean | null;
  clubhouseExplanation: boolean | null;
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


