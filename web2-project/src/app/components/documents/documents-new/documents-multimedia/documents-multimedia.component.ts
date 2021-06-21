import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { SafetyDocument } from 'src/app/model/safety-document';
import { DocumentService } from 'src/app/services/document.service';

@Component({
  selector: 'app-documents-multimedia',
  templateUrl: './documents-multimedia.component.html',
  styleUrls: ['./documents-multimedia.component.css']
})
export class DocumentsMultimediaComponent implements OnInit {

  constructor(private fb:FormBuilder, private documentService:DocumentService) { }
  submitImageForm: FormGroup;
  workingDocument:any;
  selectedImage: File;

  notification: Notification;

  imageSrc:string = '../assets/profil.png';

  allImages: Array<string>;
  allDocuments:Array<SafetyDocument>;

  ngOnInit(): void {
    this.allImages = new Array<string>();
    this.allDocuments = new Array<SafetyDocument>();
    this.documentService.getDocuments().subscribe(data => {
      this.allDocuments = data;
      this.workingDocument = this.allDocuments.pop();
      
      this.documentService.getDocumentImage(Number(this.workingDocument.id)).subscribe(data=>{
        this.allImages = new Array<string>();
        this.allImages = data;
      });

    });

    

    this.submitImageForm = this.fb.group({
      image: ['', [
        Validators.required
      ]]
    })
  }
  onChange(e:any) {
    const reader = new FileReader();
    
    if(e.target.files && e.target.files.length) {
      const [file] = e.target.files;
      reader.readAsDataURL(file);
    
      reader.onload = () => {
        this.imageSrc = reader.result as string;
      };

      this.selectedImage = <File>e.target.files[0];
    }
  }
  submitImage(){
    const helper = new JwtHelperService();
    var token : any = localStorage.getItem('token');
    const DecodedToken = helper.decodeToken(token);

    this.documentService.postDocumentImage(this.selectedImage, Number(this.workingDocument.id)).subscribe(data=>{   
      //this.notification = new Notification(DecodedToken.id, "Work plan image added successfully!", NotificationType.Success, false, false, new Date());
      //this.notificationService.postNotification(this.notification).subscribe();
      //this.toastr.success(this.notification.description, this.notification.date.toLocaleString()).onTap.pipe().subscribe(() => this.onNotificationClick());
    
      this.documentService.getDocumentImage(Number(this.workingDocument.id)).subscribe(data=>{
        this.allImages = new Array<string>();
        this.allImages = data;
      });
    }, error => {    
      /*     
      this.notification = new Notification(DecodedToken.id, "Work plan image added unsuccessfully!", NotificationType.Error, false, false, new Date());
      this.notificationService.postNotification(this.notification).subscribe();
      this.toastr.error(this.notification.description, this.notification.date.toLocaleString()).onTap.pipe().subscribe(() => this.onNotificationClick());
    */
    });

    this.imageSrc = '../assets/profil.png';
    this.submitImageForm.controls['image'].reset;
  }

}
