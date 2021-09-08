import { VideoDTO } from "../shared/upload/asset.dto";

export interface CollaborationExplanationDto {
  explanation: string | null;
  video: VideoDTO | null;
  manifestUrl: string | null;
}
