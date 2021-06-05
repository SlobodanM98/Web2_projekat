import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-work-plan-multimedia',
  templateUrl: './work-plan-multimedia.component.html',
  styleUrls: ['./work-plan-multimedia.component.css']
})
export class WorkPlanMultimediaComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  submitImageForm: FormGroup;

  imageSrc:string = '../assets/profil.png';

  ngOnInit(): void {
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
    }
  }

  submitImage(){
    alert("Submited.");
  }
}
