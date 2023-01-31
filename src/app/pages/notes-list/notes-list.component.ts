import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { TmplAstBoundAttribute } from '@angular/compiler';
import { not } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Note } from 'src/app/shared/note.model';
import { NotesService } from 'src/app/shared/notes.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.css'],
  animations: [
    trigger('itemAnim',[
      transition('void => *',[
        style({
          height:0,
          opacity:0,
          transform:'(0.85)',
          'margin-bottom':0,

          paddingTop:0,
          paddingBottom:0,
          paddingRight:0,
          paddingLeft:0,
        }),
        animate("50ms", style({
          height: "*",
          'margin-bottom':"*",
          paddingTop: "*",
          paddingBottom: "*",
          paddingRight: "*",
          paddingLeft: "*",
        })),
        animate(68)
      ]),
      transition("* => void",[
        animate(50,style({
          transform:'scale(1.05)'
        })),
        animate(50,style({
          transform:'scale(1)',
          opacity:0.75
        })),
        animate('120ms ease-out', style({
          transform:'scale(0.68)',
          opacity:0,
        })),
        animate('150ms ease-out', style({
          opacity:0,
          height:0,
          paddingTop:0,
          paddingBottom:0,
          paddingRight:0,
          paddingLeft:0,
          'margin-bottom':0,
        }))
      ])
    ]),
    trigger('listAnim',[
      transition('* =>*',[
        query(':enter',[
          style({
            opacity:0,
            height:0,
          }),
          stagger(100,[
            animate('0.2s ease')
          ])
        ],{
          optional:true
        })
      ])
    ])
  ]
})
export class NotesListComponent implements OnInit {

  notes:Note[] = new Array<Note>();
  filteredNotes: Note[] = [];
  constructor(private notesService : NotesService,private router:Router, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.notes = this.notesService.getAll();
    this.filteredNotes = this.notes;
  }
  deleteNote(id:number){
    this.notesService.delete(id);
  }
  filter(query:any){
    this.filteredNotes = this.filteredNotes.filter(val=>{
      return val.title.includes(query.target.value)
    })
  }
  removeDuplicates(arr: Array<any>){
    let uniqueResults:Set<any> = new Set<any>();
    arr.forEach(e => uniqueResults.add(e));
    return Array.from(uniqueResults);
  }
  relevantNotes(query:string):Array<Note>{
    query = query.toLowerCase().trim();
    let relevantNotes = this.notes.filter(note =>{
      if(note.title && note.title.toLowerCase().includes(query)){
        return true;
      }
      if(note.body && note.body.toLowerCase().includes(query)){
        return true;
      }
      return false;
    })
    return relevantNotes;
  }
  moveTo(idx:any){
    console.log(idx)
    this.router.navigate(["/new"],{queryParams:this.filteredNotes[idx]})
  }

}
