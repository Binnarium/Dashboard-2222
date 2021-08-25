import { CityEnabledPagesDto } from "src/app/core/cities-module/city.dto";

export type CityActivityDto = Record<keyof Pick<CityEnabledPagesDto, 'contribution' | 'project' | 'clubhouse'>, string | null>;
