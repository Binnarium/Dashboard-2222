import { VideoDTO } from "../shared/upload/asset.dto";

export interface WelcomeDto {
  pageTitle: string | null;
  profundityText: string | null;
  teamText: string | null;
  welcomeVideo: VideoDTO;
}
