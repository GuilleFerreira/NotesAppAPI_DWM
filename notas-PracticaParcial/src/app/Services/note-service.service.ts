import { Injectable } from '@angular/core';
import { Note } from '../Interfaces/Note';
import { CITYS } from '../Mocks/mock-ciudades';
import { TemperaturaService } from './temperatura.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteServiceService {

  notas?: Map<string, Note>;
  invisibleNotes?: Map<string, Note>;

  private notesUrl = 'http://localhost:3001';

  constructor(private servicioTemperatura: TemperaturaService, private http: HttpClient) {
    this.notas = new Map<string, Note>();
    this.invisibleNotes = new Map<string, Note>();
    this.getNotes().subscribe(x => {
      for(let note of x){
        this.notas?.set(note.id,note);
      }
    });
  }

  getNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(this.notesUrl+"/notes");
  }

  getNote(id : String): Observable<Note[]> {
    return this.http.get<Note[]>(this.notesUrl+"/note/"+id);
  }

  addNote(note: Note){
    const headers = { 'content-type': 'application/json'};
    const body = JSON.stringify(note);
    console.log(body);
    return this.http.post(this.notesUrl+"/note", body,{'headers':headers});
  }

  editNote(note: Note){
    const body = JSON.stringify(note);
    console.log(body);
    this.http.put(this.notesUrl+"/notes/"+note.id, body);
  }

  deleteNote(id : string){
    this.http.delete(this.notesUrl+"/notes/"+id).subscribe(x => {
      this.notas?.delete(id);
    });
  }

  formatearFecha(fecha: Date){
    const minutos = fecha.getMinutes() < 10 ? `0${fecha.getMinutes()}` : fecha.getMinutes();
    const tiempo = `${ fecha.getHours() }:${ minutos }`;
    return`${new Intl.DateTimeFormat('es-ES').format(fecha)}`;
  }

  crearNota(nota: Note) {
    if (this.notas) {
      nota.id = `${Math.floor(Math.random() * 1000000)}`;
      this.notas.set(nota.id, nota);
      let fecha = nota.date == "" ? new Date(Date.now()) : new Date(nota.date);
      nota.date = this.formatearFecha(fecha);
      let ciudad = {
        nombre: nota.cityid,
        lat: CITYS[nota.cityid].lat,
        long: CITYS[nota.cityid].long
      }
      this.addNote(nota);
      try {
        this.servicioTemperatura.getWeather(fecha, ciudad)
        .subscribe(x => {
          let hour = fecha.getHours();
          let temperature = x.hourly.temperature_2m[hour];
          nota.temperature = temperature ? `${temperature} °C` : "";
        });
    } catch (x){
      console.log("ERROR AL OBTENER LA FECHA");
    }
  }
  }

  editarNota(nota: Note) {
     if (this.notas) {
     nota.date = this.formatearFecha(new Date(nota.date));
     this.notas.set(nota.id, nota);
      this.editNote(nota);
     }
 }
}
