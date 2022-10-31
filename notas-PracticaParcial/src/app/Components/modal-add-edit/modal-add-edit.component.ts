import { Component, OnInit, Input} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EmptyNote, Note } from 'src/app/Interfaces/Note';
import { CITYS } from 'src/app/Mocks/mock-ciudades';

import { NoteServiceService } from 'src/app/Services/note-service.service';

@Component({
  selector: 'app-modal-add-edit',
  templateUrl: './modal-add-edit.component.html',
  styleUrls: ['./modal-add-edit.component.scss']
})
export class ModalAddEditComponent implements OnInit {

  @Input() notaEntrada?: Note;

  nota: EmptyNote = new EmptyNote();
  titulo: string = 'Agregar Nota';
  textoBoton: string = 'Agregar';

  // Datos mockeados
  ciudades: string[] = [];
  //nota!: { id: string; title: string; cityid: string; description: string; date: string; temperature: string; };

  constructor(public modalActivo: NgbActiveModal, private noteService: NoteServiceService) { }

  ngOnInit(): void {
    for(const city in CITYS){
      this.ciudades.push(city)
    }
    if (this.notaEntrada) {
      this.titulo = 'Editar Nota';
      this.textoBoton = 'Editar';
      this.nota = { ...this.notaEntrada };
      this.nota.date = this.notaEntrada.date;
    }
  }

  guardarNota() {
    if (!this.nota.id) {
      if(this.nota.cityid == "") {
        alert("Seleccione una ciudad")
        return;
      }
      console.log(this.nota);
      this.noteService.crearNota(this.nota);
    } else {
      console.log("edit " + this.nota);
      this.noteService.editNote(this.nota);
    }
    this.modalActivo.close();
  }

}
