import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

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


  constructor() { }

  ngOnInit(): void {
  }
  selectFiles(event:any){}
  uploadFiles(){}
}
