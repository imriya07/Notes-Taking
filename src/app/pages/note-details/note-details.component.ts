import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Note } from 'src/app/shared/note.model';
import { NotesService } from 'src/app/shared/notes.service';

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.css']
})
export class NoteDetailsComponent implements OnInit {
  note: Note = {
    title:'',
    body:''
  };
  noteId!: number;
  new!: boolean;

  constructor(private notesService:NotesService, private router:Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log(this.route.snapshot.queryParams)
    if(Object.keys(this.route.snapshot.queryParams).length){
      this.note = {
        title:this.route.snapshot.queryParams['title'],
        body:this.route.snapshot.queryParams['body']
      }
    }
    this.route.params.subscribe((params: Params) =>{
      if(params){
        this.noteId = params['id'];
        this.new = true;
      }else{
        this.new = false;
      }
    })
  }
  onSubmit(form:NgForm){
    this.router.navigateByUrl('/'); 
    if(this.new){
      this.notesService.add(form.value);
    } else{
      this.notesService.update(this.noteId, this.note.title, this.note.body);
    }
  }
  cancel(){
    this.router.navigateByUrl('/');
  }

}
