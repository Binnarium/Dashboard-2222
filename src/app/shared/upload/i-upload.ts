import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';

export type UploadState = 'UPLOADING' | 'FINISH';

export interface UploadFileProgressDto {
  url: string | null;
  path: string;
  name: string;
  percentage: number;
  state?: UploadState;
}

@Injectable({ providedIn: 'root' })
export abstract class IUpload<T = File> {

  constructor(
    protected readonly afStorage: AngularFireStorage,
  ) { }

  abstract upload$(folder: string, file: T): Observable<UploadFileProgressDto>;

  /**
   * Map value within a specific bound
   */
  protected map(value: number, start1: number, stop1: number, start2: number, stop2: number): number {
    const newVal = (value - start1) / (stop1 - start1) * (stop2 - start2) + start2;

    if (start2 < stop2) {
      return this.constrain(newVal, start2, stop2);
    } else {
      return this.constrain(newVal, stop2, start2);
    }
  }

  /**
   * wrapper to obtain a value in a specific constraint
   */
  private constrain(n: number, low: number, high: number): number {
    return Math.round(Math.max(Math.min(n, high), low));
  }
}
