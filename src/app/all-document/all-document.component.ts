import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../Services/document.service';

@Component({
  selector: 'app-all-document',
  templateUrl: './all-document.component.html',
  styleUrls: ['./all-document.component.scss']
})
export class AllDocumentComponent implements OnInit {

  constructor(private documentSevice:DocumentService) { }
  documents:any[]=[]
  ngOnInit(): void {
    this.documentSevice.GetAllDocuments().subscribe({
      next: data => {
        console.log(data)
        console.log(data.result)
       this.documents = data.result.data;
        
        console.log(this.documents);
        
    },
      error: err => console.log(err),

    })
  }

  delete(id:any){
    this.documentSevice.RemoveDocument(id).subscribe({
      next: data => {
        console.log(data)
      
        
    },
      error: err => console.log(err),

    })
  }
  edit(id:any){

  }

  download(file:any){
    this.documentSevice.downloadDocument(file).subscribe({
      next: data => {
        console.log(data)
      
        
    },
      error: err => console.log(err),

    })
  }

}
