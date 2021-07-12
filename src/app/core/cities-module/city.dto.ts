export interface CityDto {
  stage: number;
  iconUrl: string;
  id: string;
  name: string;
  configuration: {
    colorHex: number,
  };
}
