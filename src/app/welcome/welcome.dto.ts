import { VideoDTO } from "../shared/upload/asset.dto";

export interface WelcomeDto {
  pageTitle: string | null;
  profundityText: string | null;
  teamText: string | null;
  workloadText: string | null;
  welcomeVideo: VideoDTO;
}
