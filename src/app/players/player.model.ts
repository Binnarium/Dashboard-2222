export interface AwardModel {
  cityId: string;
  obtained: boolean;
}
export interface PlayerModel {
  displayName: string;
  email: string;
  uid: string;
  projectAwards?: Array<AwardModel>;
  contributionAwards?: Array<AwardModel>;
  clubhouseAwards?: Array<AwardModel>;
}
