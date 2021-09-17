import { VideoDTO } from "../shared/upload/asset.dto";

export interface ContributionExplanationDto {
  explanation: string | null;
  video: VideoDTO | null;
  manifestUrl: string | null;
}
