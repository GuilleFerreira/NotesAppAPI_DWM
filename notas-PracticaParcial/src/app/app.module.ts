import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './Components/nav-bar/nav-bar.component';
import { GridComponent } from './Components/grid/grid.component';
import { AddButtonComponent } from './Components/add-button/add-button.component';
import { FooteComponent } from './Components/foote/foote.component';
import { ModalAddEditComponent } from './Components/modal-add-edit/modal-add-edit.component';
import { ModalDeleteComponent } from './Components/modal-delete/modal-delete.component';
import { NoteComponent } from './Components/note/note.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    GridComponent,
    AddButtonComponent,
    FooteComponent,
    ModalAddEditComponent,
    ModalDeleteComponent,
    NoteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
