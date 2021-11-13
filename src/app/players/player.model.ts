export interface AwardModel {
  cityId: string;
  obtained: boolean;
}
export interface PlayerModel {
  displayName: string;
  email: string;
  uid: string;
  courseStatus?: string;
  playerType?: string;
  groupId?: string;
  pubCode?: string;
  pubUserId?: string;
  projectAwards?: Array<AwardModel>;
  contributionAwards?: Array<AwardModel>;
  clubhouseAwards?: Array<AwardModel>;
  allowWebAccess?: boolean;
}
