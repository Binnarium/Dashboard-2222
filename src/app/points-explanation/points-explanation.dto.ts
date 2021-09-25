import { AudioDto } from "../shared/upload/asset.dto";

export interface PointsExplanationDto {
  explanation: string | null;
  audio: AudioDto;
}
