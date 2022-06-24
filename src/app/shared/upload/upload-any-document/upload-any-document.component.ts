import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { DocumentDTO } from '../asset.dto';
import { IUpload, UploadFileProgressDto } from '../i-upload';
import { UploadSingleFileService } from '../upload-single-file.service';

@Component({
  selector: 'dashboard-upload-any-document',
  templateUrl: './upload-any-document.component.html',
  providers: [
    { provide: IUpload, useClass: UploadSingleFileService }
  ]
})
export class UploadAnyDocumentComponent implements OnDestroy {

  constructor(
    private readonly uploadService: IUpload,
  ) { }

  public document: DocumentDTO | null = null;

  @Input('document')
  public set _document(file: DocumentDTO | null) {
    this.document = file;
  }

  @Output()
  public completed: EventEmitter<DocumentDTO> = new EventEmitter();

  public progress: UploadFileProgressDto | null = null;

  private uploadDocumentSubscription: Subscription | null = null;

  upload(event: any): void {
    const file = event.target.files.item(0);

    if (!file || !!this.progress || !!this.uploadDocumentSubscription)
      return;

    this.uploadDocumentSubscription = this.uploadService.upload$('uploads/document', file).pipe(
      finalize(() => {
        if (this.progress?.url) {
          const document: DocumentDTO = {
            name: this.progress.name,
            path: this.progress.path,
            url: this.progress.url,
          };
          this.completed.emit(document);
        }

        this.uploadDocumentSubscription?.unsubscribe();
        this.uploadDocumentSubscription = null;
        this.progress = null;
      })
    ).subscribe(d => {
      this.progress = d;
    });
  }

  ngOnDestroy(): void {
    this.uploadDocumentSubscription?.unsubscribe();
  }

}
