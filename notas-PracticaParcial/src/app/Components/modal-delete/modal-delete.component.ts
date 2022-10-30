import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NoteServiceService } from 'src/app/Services/note-service.service';

@Component({
  selector: 'app-modal-delete',
  templateUrl: './modal-delete.component.html',
  styleUrls: ['./modal-delete.component.scss']
})
export class ModalDeleteComponent implements OnInit {

  @Input() noteId!: string;

  constructor(public modalActivo: NgbActiveModal, private noteService: NoteServiceService,  private route: Router) { }

  ngOnInit(): void {
  }

  delete() {
    this.noteService.deleteNote(this.noteId);
    console.log(this.noteId);
    this.modalActivo.close();
    window.location.reload();
  }

  cancel() {
    this.modalActivo.close();
  }

}