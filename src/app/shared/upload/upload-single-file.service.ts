import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { IUpload, UploadFileProgressDto, UploadState } from './i-upload';

@Injectable({
  providedIn: 'root'
})
export class UploadSingleFileService extends IUpload {

  upload$(folder: string, file: File): Observable<UploadFileProgressDto> {
    const fileName = file.name;
    const now = Date.now();
    const path = `${folder}/${now}-${fileName}`;

    return this.afStorage.upload(path, file).snapshotChanges().pipe(
      mergeMap(async d => {
        const state: UploadState = d?.state === 'success' ? 'FINISH' : 'UPLOADING';
        const percentage = state === 'FINISH' ? 100 : this.map(d?.bytesTransferred ?? 0, 0, d?.totalBytes ?? file.size, 0, 100);

        const data: UploadFileProgressDto = {
          state,
          percentage,
          path,
          name: file.name,
          url: state === 'FINISH' ? await d?.ref.getDownloadURL() : null,
        };

        return data;
      }),
    );
  }
}
