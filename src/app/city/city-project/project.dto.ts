import { AudioContentDto } from "../city-content/city-content.dto";

export interface ProjectDto {
  activity: string;
  explanation: string;
  audio: AudioContentDto;
  allow: 'ALLOW#FILE' | 'ALLOW#AUDIO' | 'ALLOW#NONE';
}
