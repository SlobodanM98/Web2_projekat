import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-all-profiles',
  templateUrl: './view-all-profiles.component.html',
  styleUrls: ['./view-all-profiles.component.css']
})
export class ViewAllProfilesComponent implements OnInit {

  closeResult = '';
  username='';
  tip='';
  aktivan='';

  listaProfila: { username: string, tip: string, aktivan: string }[] = [
      { "username": "pera", "tip": "Potrosac", "aktivan": "prihvacen" },
      { "username": 'luka', "tip": "Dispecer", "aktivan": "odbijen" },
      { "username": 'goran', "tip": "Clan ekipe", "aktivan": "procesira" }
  ];

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  open(content:any, index:number) {
    this.username=this.listaProfila[index].username;
    this.tip=this.listaProfila[index].tip;
    this.aktivan=this.listaProfila[index].aktivan;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
