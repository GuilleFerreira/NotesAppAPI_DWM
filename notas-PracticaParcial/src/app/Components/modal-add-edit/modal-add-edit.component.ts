import { Component, OnInit, Input} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Note } from 'src/app/Interfaces/Note';
import { CITYS } from 'src/app/Mocks/mock-ciudades';
import { COLOURS } from 'src/app/Mocks/mock-colores';
import { Color } from 'src/app/Interfaces/Color';

import { NoteServiceService } from 'src/app/Services/note-service.service';

@Component({
  selector: 'app-modal-add-edit',
  templateUrl: './modal-add-edit.component.html',
  styleUrls: ['./modal-add-edit.component.scss']
})
export class ModalAddEditComponent implements OnInit {

  @Input() notaEntrada?: Note;

  titulo: string = 'Agregar Nota';
  textoBoton: string = 'Agregar';

  // Datos mockeados
  ciudades: string[] = [];
  
  colores: Color[] = COLOURS;
  nota!: { id: string; title: string; cityid: string; description: string; date: string; temperature: string; };

  constructor(public modalActivo: NgbActiveModal, private servicioNotas: NoteServiceService) { }

  ngOnInit(): void {
    if (this.notaEntrada) {
      this.titulo = 'Editar Nota';
      this.textoBoton = 'Editar';
      this.nota = { ...this.notaEntrada };
      this.nota.date = this.formatearFecha(this.notaEntrada.date);
    }
    for(const city in CITYS){
      this.ciudades.push(city)
    }
  }

  formatearFecha(input: string): string {
    const fechaAPoner = input.split(" ");
    let dias = fechaAPoner[0].split("/");
    dias[1] = dias[1].length < 2? `0${dias[1]}` : dias[1];
    dias[0] = dias[0].length < 2? `0${dias[0]}` : dias[0];
    return `${dias[2]}-${dias[1]}-${dias[0]}T${fechaAPoner[1]}`;
  }

  guardarNota() {
    if (!this.nota.id) {
      if(this.nota.cityid == "") {
        alert("Seleccione una ciudad")
        return;
      }
      this.servicioNotas.crearNota(this.nota);
    } else {
      this.servicioNotas.editarNota(this.nota);
    }
    this.modalActivo.close();
  }

}
