import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../Services/document.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-all-document',
  templateUrl: './all-document.component.html',
  styleUrls: ['./all-document.component.scss']
})
export class AllDocumentComponent implements OnInit {

  constructor(private documentSevice:DocumentService
    ,private activerout:ActivatedRoute) { }
    userId:any
  documents:any[]=[]
  ngOnInit(): void {
    this.activerout.paramMap.subscribe((parm: ParamMap) => {
      this.userId = parm.get("id")
      console.log(this.userId);
    });
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
        var row = document.getElementById(id)
        console.log(row)
        row?.parentElement?.classList.add("d-none");
        
    },
      error: err => console.log(err),

    })
  }
  edit(id:any){

  }

  download(file:any){
    this.documentSevice.downloadDocument(file).subscribe(
     
        (data: Blob) => {
          this.downloadFileBlob(data, file);
        },
        error => {
          console.error('Error downloading file:', error);
        }
    )
  }

  private downloadFileBlob(data: Blob, fileName: string): void {
    const blob = new Blob([data], { type: 'application/octet-stream' });

    // Create a link element and trigger a download
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;
    link.click();

    // Clean up
    window.URL.revokeObjectURL(link.href);
  }

}
