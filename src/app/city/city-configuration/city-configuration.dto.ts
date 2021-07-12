import { CityDto } from "src/app/core/cities-module/city.dto";

export interface CityConfigurationPagesDto {
  // pages
  activities: boolean | null;
  // activities
  questionary: boolean | null;
  clubhouse: boolean | null;
  readings: boolean | null;
  project: boolean | null;
}

export interface CityConfigurationDto extends CityDto {
  enabledPages: null | CityConfigurationPagesDto;
}
