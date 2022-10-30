import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalAddEditComponent } from '../modal-add-edit/modal-add-edit.component';

@Component({
  selector: 'app-add-button',
  templateUrl: './add-button.component.html',
  styleUrls: ['./add-button.component.scss']
})
export class AddButtonComponent implements OnInit {


  constructor(private modalService: NgbModal) { }
  
  agregarNota() {
    this.modalService.open(ModalAddEditComponent);
  }

  ngOnInit(): void {
  }

}
