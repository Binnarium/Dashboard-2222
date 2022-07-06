import firebase from 'firebase/compat/app';

interface BaseAppConfigurationDto {
  courseFinalizationDate: null | Date | firebase.firestore.Timestamp;
}

export interface AppConfigurationDto extends BaseAppConfigurationDto {
  courseFinalizationDate: null | Date;
}

export interface AppConfigurationFirebaseDto extends BaseAppConfigurationDto {
  courseFinalizationDate: null | firebase.firestore.Timestamp;
}
