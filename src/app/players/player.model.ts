export interface AwardModel {
  cityId: string;
  count: number;
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
  proactivity?: number;
  pubUserId?: string;
  projectAwards?: Array<AwardModel>;
  contributionsAwards?: Array<AwardModel>;
  clubhouseAwards?: Array<AwardModel>;
  marathonAwards?: Array<AwardModel>;
  workshopAwards?: Array<AwardModel>;
  allowWebAccess?: boolean;
}
