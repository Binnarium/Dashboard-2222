import { VideoDTO } from "../shared/upload/asset.dto";

export interface ClubhouseExplanationDto {
  explanation: string | null;
  video: VideoDTO | null;
  clubUrl: string | null;
}
