import { Component, OnInit, Input } from '@angular/core';
import { Note } from 'src/app/Interfaces/Note';
import { Router } from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ModalAddEditComponent } from '../modal-add-edit/modal-add-edit.component';
import { ModalDeleteComponent } from '../modal-delete/modal-delete.component';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {

  @Input() note?: Note;
  constructor(public modalService: NgbModal) { }

  ngOnInit(): void {
  }

  abrirModalEditar() {
    const modal = this.modalService.open(ModalAddEditComponent);
    (modal.componentInstance as ModalAddEditComponent).notaEntrada = this.note;
  }

  openModalDelete() {
    const modal = this.modalService.open(ModalDeleteComponent);
    (modal.componentInstance as ModalDeleteComponent).noteId = this.note!.id;
  }
}
