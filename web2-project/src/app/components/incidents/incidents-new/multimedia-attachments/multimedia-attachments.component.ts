import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IncidentService } from 'src/app/services/incident.service';

@Component({
  selector: 'app-multimedia-attachments',
  templateUrl: './multimedia-attachments.component.html',
  styleUrls: ['./multimedia-attachments.component.css']
})
export class MultimediaAttachmentsComponent implements OnInit {
  selectedFiles?: FileList;
  progressInfos:any[] = [];
  message = '';
  fileInfos: Observable<any>;


  constructor(private uploadService:IncidentService) { }

  ngOnInit(): void {
    //this.fileInfos = this.uploadService.getFiles();
  }
  selectFiles(event:any) {
    this.progressInfos = [];
  
    const files = event.target.files;
    let isImage = true;
  
    for (let i = 0; i < files.length; i++) {
      if (files.item(i).type.match('image.*')) {
        continue;
      } else {
        isImage = false;
        alert('invalid format!');
        break;
      }
    }
  
    if (isImage) {
      this.selectedFiles = event.target.files;
    } else {
      this.selectedFiles = undefined;
      event.srcElement.percentage = null;
    }
  }
  uploadFiles() {
    /*
    this.message = '';
  
    for (let i = 0; i < this.selectedFiles!.length; i++) {
      this.upload(i, this.selectedFiles![i]);
    }*/
  }

  upload(idx:any, file:any) {/*
    this.progressInfos[idx] = { value: 0, fileName: file.name };
  
    this.uploadService.upload(file).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progressInfos[idx].percentage = Math.round(100 * event.loaded / event.total!);
        } else if (event instanceof HttpResponse) {
          this.fileInfos = this.uploadService.getFiles();
        }
      },
      err => {
        this.progressInfos[idx].percentage = 0;
        this.message = 'Could not upload the file:' + file.name;
      });*/
  }
}
