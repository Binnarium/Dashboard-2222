import { Observable } from "rxjs";

export interface ISignIn {
  sign$(): Observable<boolean>;
}
