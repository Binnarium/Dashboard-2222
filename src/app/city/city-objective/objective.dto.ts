import firebase from "firebase/app";

export interface ObjectiveDto {
  mainObjective: string | null;
  content: Array<string> | null;
  competences: { [key: string]: boolean };
  ideas: Array<string> | null;
}

export interface ObjectiveFirebaseDto {
  mainObjective: string | null;
  content: Array<string> | null;
  competences: Array<firebase.firestore.DocumentReference>;
  ideas: Array<string> | null;
}
