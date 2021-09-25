import { VideoDTO } from "../shared/upload/asset.dto";

export interface ContributionExplanationDto {
  explanation: string | null;
  codeExplanation: string | null;
  video: VideoDTO | null;
  manifestUrl: string | null;
}
