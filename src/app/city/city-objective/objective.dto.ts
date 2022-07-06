import firebase from "firebase/compat/app";

interface BaseObjectiveDto {
  mainObjective: string | null;
  competences: { [key: string]: boolean } | Array<firebase.firestore.DocumentReference> | null;
  ideas: Array<string> | null;
}
export interface ObjectiveDto extends BaseObjectiveDto {
  mainObjective: string | null;
  competences: { [key: string]: boolean } | null;
  ideas: Array<string> | null;
}

export interface ObjectiveFirebaseDto extends BaseObjectiveDto {
  mainObjective: string | null;
  competences: Array<firebase.firestore.DocumentReference> | null;
  ideas: Array<string> | null;
}
